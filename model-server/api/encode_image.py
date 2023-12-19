import glob
import os
from typing import Any

import bchlib
import numpy as np
import torch
from PIL import Image, ImageOps
from torchvision import transforms

from libs.image_encoder import ImageEncoder
from libs.utils import get_model

encoder = get_model("encoder")


# NOTE: 반드시 7자리보다 짧은 스트링만 encoding 가능
def encode_image(binary_image, message: str, embed_into_full_image: bool) -> Image:
    byteString = bytearray(message, "utf-8")
    image_encoder = ImageEncoder(encoder, embed_into_full_image)
    return Image.fromarray(image_encoder(byteString, binary_image))
