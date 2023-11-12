import io
import base64
import requests
from PIL import Image
from requests_toolbelt.multipart.encoder import MultipartEncoder

import streamlit as st

# interact with FastAPI endpoint
backend_encode = "http://fastapi:8000/encode_stamp"
backend_decode = "http://fastapi:8000/decode_stamp"
backend_encode_high = " http://fastapi:8000/encode_stamp_high"
backend_decode_high = " http://fastapi:8000/decode_stamp_high"


def decoding_process(image, server_url: str):

    m = MultipartEncoder(fields={"file": ("filename", image, "image/jpeg")})

    r = requests.post(server_url, data=m, headers={"Content-Type": m.content_type}, timeout=8000)

    return r


def encoding_process(image, text, server_url: str):

    m = MultipartEncoder(fields={"file": ("filename", image, "image/jpeg")})

    r = requests.post(
        server_url + f"/{text}", data=m, headers={"Content-Type": m.content_type}, timeout=8000
    )

    return r


# construct UI layout
st.title("Aura Stamp API")

st.write(
    """Insert target image and text to stamp KwangKwang!
    Visit this URL at `:8000/docs` for FastAPI documentation.
    """
)  # description and instructions

# Create a page dropdown
page = st.selectbox("Choose your page", ["Encode", "Decode", "Detector"])
if page == "Encode":
    # Display details of page 1
    reso_type = st.radio("Resolution", ("Default", "High"))
    input_image = st.file_uploader("insert image")  # image upload widget

    context_text = st.text_input("Stamp (less than 8 words)", "Picasso")
    st.write("The current stamp is", context_text)

    if st.button("Stamp KwangKwang"):

        col1, col2 = st.columns(2)

        if input_image:
            stamped = encoding_process(
                input_image,
                context_text,
                backend_encode if reso_type == "Default" else backend_encode_high,
            )
            original_image = Image.open(input_image).convert("RGB")

            _stamped = base64.b64decode(stamped.content)
            stamped_image = Image.open(io.BytesIO(_stamped)).convert("RGB")
            col1.header("Original")
            col1.image(original_image, use_column_width=True)
            col2.header("Aura-Stamped")
            col2.image(stamped_image, use_column_width=True)

            btn = st.download_button(
                label="Download image",
                data=io.BytesIO(stamped.content),
                file_name="stamped.png",
                mime="image/png",
            )

        else:
            # handle case with no image
            st.write("Insert an image!")

elif page == "Decode":
    # Display details of page 2

    reso_type = st.radio("Resolution", ("Default", "High"))
    input_image = st.file_uploader("insert image")  # image upload widget

    if st.button("Read stamp"):
        st.write(
            decoding_process(
                input_image, backend_decode if reso_type == "Default" else backend_decode_high
            ).json()
        )
    else:
        st.write("Insert a stamped image!")
