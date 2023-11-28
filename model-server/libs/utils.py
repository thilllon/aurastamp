import os
import sys
from typing import Any

import torch

from .model import StegaStampDecoder, StegaStampEncoder

# TODO: what is this line for?
sys.path.append("/predefined_models")


def get_model(mode: str):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    model = None
    if mode == "encoder":
        model = StegaStampEncoder()
        model.load_state_dict(
            torch.load(
                dir_path + "/../predefined_models/encoder.pth", map_location="cpu"
            )
        )
        model.eval()

    elif mode == "decoder":
        model = StegaStampDecoder()
        model.load_state_dict(
            torch.load(
                dir_path + "/../predefined_models/decoder.pth", map_location="cpu"
            )
        )
        model.eval()
    else:
        raise NotImplementedError

    return model
