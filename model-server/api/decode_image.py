import glob
import io

import bchlib
import numpy as np
import torch
from fastapi import UploadFile
from PIL import Image, ImageOps
from torchvision import transforms

from libs.utils import get_model

decoder = get_model("decoder")


def decode_image(
    binary_image: UploadFile,
    embed_into_full_img: bool,
):
    BCH_POLYNOMIAL = 137
    BCH_BITS = 5
    WIDTH = 400
    HEIGHT = 400

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


def test_decode_image():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("model", type=str)
    parser.add_argument("--image", type=str, default=None)
    parser.add_argument("--images_dir", type=str, default=None)
    parser.add_argument("--secret_size", type=int, default=100)
    parser.add_argument("--cuda", type=bool, default=True)
    args = parser.parse_args()

    if args.image is not None:
        files_list = [args.image]
    elif args.images_dir is not None:
        files_list = glob.glob(args.images_dir + "/*")
    else:
        print("Missing input image")
        return

    decoder = torch.load(args.model)
    decoder.eval()
    if args.cuda:
        decoder = decoder.cuda()

    BCH_POLYNOMIAL = 137
    BCH_BITS = 5
    width = 400
    height = 400

    size = (width, height)
    to_tensor = transforms.ToTensor()
    bch = bchlib.BCH(BCH_POLYNOMIAL, BCH_BITS)

    with torch.no_grad():
        for filename in files_list:
            image = Image.open(filename).convert("RGB")
            image = ImageOps.fit(image, size)
            image = to_tensor(image).unsqueeze(0)
            if args.cuda:
                image = image.cuda()

            secret = decoder(image)
            if args.cuda:
                secret = secret.cpu()
            secret = np.array(secret[0])
            secret = np.round(secret)

            packet_binary = "".join([str(int(bit)) for bit in secret[:96]])
            packet = bytes(
                int(packet_binary[i : i + 8], 2)
                for i in range(0, len(packet_binary), 8)
            )
            packet = bytearray(packet)

            data, ecc = packet[: -bch.ecc_bytes], packet[-bch.ecc_bytes :]

            bitflips = bch.decode_inplace(data, ecc)

            if bitflips != -1:
                try:
                    code = data.decode("utf-8")
                    print(filename, code)
                    continue
                except:
                    continue
            print(filename, "Failed to decode")


if __name__ == "__main__":
    test_decode_image()
