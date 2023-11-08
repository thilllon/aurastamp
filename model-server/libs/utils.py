import os
import sys
from typing import Any

import torch

from .model import StegaStampDecoder, StegaStampEncoder

# TODO: what is this line for?
sys.path.append("/predefined_models")


def get_model(mode="encoder"):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    model = None
    if mode == "encoder":
        model = StegaStampEncoder()
        model.load_state_dict(
            torch.load(dir_path + "/../predefined_models/encoder.pth", map_location="cpu")
        )
        model.eval()

    elif mode == "decoder":
        model = StegaStampDecoder()
        model.load_state_dict(
            torch.load(dir_path + "/../predefined_models/decoder.pth", map_location="cpu")
        )
        model.eval()
    else:
        raise NotImplementedError

    return model


def get_next_hash_array(last_hash_string):
    # 배경: 56비트 -> 7바이트 밖에 못써서 억지로 만든 알고리즘?
    # last_hash_string 이 bit의 조합
    # last_hash_strig 을 ::3으로 split하여, 각각의 연산결과는 하나의 숫자를 표현
    # int() casting으로 int로 변환.
    byte_gap = 3
    hash_array = [
        int(last_hash_string[i : i + byte_gap]) for i in range(0, len(last_hash_string), byte_gap)
    ]

    # calculate a next hash
    # 예 : 0000019("000 000 000 000 000 str(1) str(9)") + 1 -> 0000020 ("000 000 000 000 000 str(2) str(0)")
    l = len(hash_array)
    for idx, num in enumerate(hash_array[::-1]):
        if num < 254:
            hash_array[l - idx - 1] += 1
            break
        elif num >= 254:
            hash_array[l - idx - 1] = 0
            pass
        else:
            print("error")
            break

    return hash_array
