import io

import bchlib
import cv2
import numpy as np
import torch
from PIL import Image, ImageOps
from torchvision import transforms


class ImageEncoder:
    def __init__(self, encoder, embed_into_full_img=True) -> None:
        self.width = 400
        self.height = 400
        self.BCH_POLYNOMIAL = 137
        self.BCH_BITS = 5

        self.encoder = encoder
        self.size = (self.width, self.height)
        self.embed_into_full_img = embed_into_full_img
        self.is_high_reso = None

    def _convert_message_to_tensor(self, data) -> torch.Tensor:
        bch = bchlib.BCH(self.BCH_BITS, self.BCH_POLYNOMIAL)
        ecc = bch.encode(data)
        packet = data + ecc

        packet_binary = "".join(format(x, "08b") for x in packet)
        message = [int(x) for x in packet_binary]
        message.extend([0, 0, 0, 0])
        message = torch.tensor(message, dtype=torch.float).unsqueeze(0)
        return message

    def _convert_image_to_tensor(self, binary_image):
        to_tensor = transforms.ToTensor()

        binary_image = binary_image.file.read()
        raw_image = Image.open(io.BytesIO(binary_image)).convert("RGB")
        raw_image = ImageOps.exif_transpose(raw_image)

        if self.embed_into_full_img:
            image = ImageOps.fit(raw_image, self.size)
            image = to_tensor(image).unsqueeze(0)
            raw_image = np.asarray(raw_image)
            return image, raw_image  # tensor, np.array

        # extract raw_image size info
        raw_image_size = raw_image.size
        raw_width = raw_image_size[0]
        raw_height = raw_image_size[1]
        self.raw_image_size, self.raw_width, self.raw_height = raw_image_size, raw_width, raw_height
        self.is_high_reso = raw_width > 400 and raw_height > 400

        if self.is_high_reso:
            start_h = raw_height // 2 - self.height // 2
            start_w = raw_width // 2 - self.width // 2
            self.start_h, self.start_w = start_h, start_w

            raw_image = np.asarray(raw_image)
            image = raw_image[start_h : start_h + self.height, start_w : start_w + self.width, :]
        else:
            image = ImageOps.fit(raw_image, self.size)
            raw_image = np.asarray(raw_image)

        image = to_tensor(image).unsqueeze(0)
        return image, raw_image  # tensor, np.array

    def _wrap_image(self, raw_image, container):
        if self.embed_into_full_img:
            return container

        start_h, start_w = self.start_h, self.start_w
        raw_width, raw_height = self.raw_width, self.raw_height
        width, height = self.width, self.height

        if self.is_high_reso:
            attach_up = np.concatenate(
                (raw_image[:start_h, start_w : start_w + width, :], container), axis=0
            )
            attach_down = np.concatenate(
                (attach_up, raw_image[start_h + height :, start_w : start_w + width, :]), axis=0
            )
            attach_left = np.concatenate((raw_image[:, :start_w, :], attach_down), axis=1)
            final = np.concatenate((attach_left, raw_image[:, start_w + width :, :]), axis=1)
        else:
            if raw_width > raw_height:
                start = raw_width // 2 - raw_height // 2
                end = raw_width // 2 + raw_height // 2
                container = cv2.resize(
                    container, dsize=(raw_height, raw_height), interpolation=cv2.INTER_CUBIC
                )
                concat = np.concatenate((raw_image[:, :start, :], container), axis=1)
                final = np.concatenate((concat, raw_image[:, end:, :]), axis=1)

            else:
                start = raw_height // 2 - raw_width // 2
                end = raw_height // 2 + raw_width // 2
                container = cv2.resize(
                    container, dsize=(raw_width, raw_width), interpolation=cv2.INTER_CUBIC
                )
                concat = np.concatenate((raw_image[:start, :, :], container), axis=0)
                final = np.concatenate((concat, raw_image[end:, :, :]), axis=0)

        return final

    def __call__(self, message, image) -> np.ndarray:
        message = self._convert_message_to_tensor(message)
        image, raw_image = self._convert_image_to_tensor(image)

        residual = self.encoder((message, image))
        container = image + residual
        container = torch.clamp(container, 0, 1)
        container = container.cpu().detach()
        container = np.array(container.squeeze(0) * 255, dtype=np.uint8).transpose((1, 2, 0))

        embed_image = self._wrap_image(raw_image, container)
        return embed_image
