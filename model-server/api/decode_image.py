import io

import bchlib
import numpy as np
from fastapi import UploadFile
from PIL import Image, ImageOps
from torchvision import transforms

from libs.utils import get_model

decoder = get_model("decoder")

BCH_POLYNOMIAL = 137
BCH_BITS = 5
WIDTH = 400
HEIGHT = 400


def decode_image(
    binary_image: UploadFile,
    embed_into_full_img: bool,
):
    size = (WIDTH, HEIGHT)
    to_tensor = transforms.ToTensor()

    binary_image = binary_image.file.read()
    raw_image = Image.open(io.BytesIO(binary_image)).convert("RGB")

    if embed_into_full_img:
        image = ImageOps.fit(raw_image, size)
    else:
        (raw_width, raw_height) = raw_image.size
        is_high_reso = raw_width > WIDTH and raw_height > HEIGHT
        if is_high_reso:
            start_h = raw_height // 2 - HEIGHT // 2
            start_w = raw_width // 2 - WIDTH // 2
            raw_image = np.asarray(raw_image)
            image = raw_image[start_h : start_h + HEIGHT, start_w : start_w + WIDTH, :]
        else:
            image = ImageOps.fit(raw_image, size)

    image = to_tensor(image).unsqueeze(0)

    secret = decoder(image).detach()
    secret = np.array(secret[0])
    secret = np.round(secret)

    packet_binary = "".join([str(int(bit)) for bit in secret[:96]])
    packet = bytes(
        int(packet_binary[i : i + 8], 2) for i in range(0, len(packet_binary), 8)
    )
    packet = bytearray(packet)

    bch = bchlib.BCH(BCH_BITS, BCH_POLYNOMIAL)
    data, ecc = packet[: -bch.ecc_bytes], packet[-bch.ecc_bytes :]
    bitflips = bch.decode(data, ecc)
    if bitflips == -1:
        raise Exception("Failed to decode")

    return data.decode("utf-8")
