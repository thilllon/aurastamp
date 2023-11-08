import base64
import io
import os
import sys

from fastapi import FastAPI, File, Form, Response, UploadFile


sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

import api

##################################################
# set up a local development environment in VSCode
##################################################
# 1. open main.py file and run this file in debug mode by press F5 and select "Python File(Debug the currently active Python File)"
# 2. command which looks similar as following will be executed automatically in terminal
# ```sh
# cd ${path_to_main_entry_file_is};
# /usr/bin/env ${path_to_python_file_in_venv_is} /Users/john/.vscode/extensions/ms-python.python-2023.14.0/pythonFiles/lib/python/debugpy/launcher 49154(this is a process number, so it will be changed) -- -m uvicorn app.main:app --reload
# ```


# docker run --port 8000:8000


app = FastAPI(
    title="Aurastamp API",
    description="""Visit this URL at port $PORT for the streamlit interface.""",
    version="0.0.0",
)


@app.get("/")
async def index():
    print("Aurastamp")
    return "Aurastamp API"


@app.post("/encode")
def get_encoded_image(
    message: str = Form(...),
    file: UploadFile = File(...),
    return_type: str = Form("base64"),
):
    encoded_image = api.encode_image(
        binary_image=file,
        len_7_string=message,
        embed_into_full_img=True,
    )
    bytes_io = io.BytesIO()
    encoded_image.save(bytes_io, format="PNG")
    bytes = bytes_io.getvalue()

    # if return_type == "base64":
    #     bytes = base64.b64encode(bytes)

    return Response(bytes, media_type="image/png")


@app.post("/decode")
def decode_image_and_return_message(
    file: UploadFile = File(...),
):
    message = api.decode_image(
        binary_image=file,
        embed_into_full_img=True,
    )
    return message


if __name__ == "__main__":
    import uvicorn
    import os

    port = 8000
    # port = os.getenv("PORT")

    uvicorn.run(app, host="0.0.0.0", port=port)
