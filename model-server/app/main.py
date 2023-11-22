import base64
import io
import os
import sys

from fastapi import FastAPI, File, Form, HTTPException, Response, UploadFile
from starlette.middleware.cors import CORSMiddleware

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

import api

app = FastAPI(
    title="Aurastamp API",
    description="""Visit this URL at port $PORT for the streamlit interface.""",
    version="0.0.0",
)


origins = ["*"]

origins_specific = [
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    if len(message) > 7:
        raise HTTPException(
            status_code=422, detail="should have less than or equal to 7 characters"
        )

    encoded_image = api.encode_image(
        binary_image=file,
        len_7_string=message,
        embed_into_full_img=True,
    )
    bytes_io = io.BytesIO()
    encoded_image.save(bytes_io, format="PNG")
    bytes = bytes_io.getvalue()

    if return_type == "base64":
        return Response(base64.b64encode(bytes), media_type="image/png")

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
    import os

    import uvicorn

    port = 8000
    # port = os.getenv("PORT")

    uvicorn.run(app, host="0.0.0.0", port=port)
