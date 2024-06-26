FROM tiangolo/uvicorn-gunicorn:python3.11

RUN apt-get update -y
RUN apt-get -y install libgl1-mesa-glx

RUN mkdir /fastapi
WORKDIR /fastapi
COPY requirements.txt .

# to use pip3
RUN pip install --upgrade pip
RUN pip3 install --requirement requirements.txt

# download predefined models
RUN gdown https://drive.google.com/uc?id=1IDihrN8OwRp7YV-pHDOz82oA7b3tpMKj
RUN gdown https://drive.google.com/uc?id=1gKIYa9Xj-N-fbINHdUXe0tEof7fwe2x8
RUN mkdir predefined_models
RUN mv encoder.pth decoder.pth ./predefined_models

COPY . .
RUN ls -laf

EXPOSE 8000

# default port
# uvicorn 8000
# hypercorn 8000
# gunicorn 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
# CMD ["hypercorn main:app --bind 0.0.0.0:8000"]
# CMD ["gunicorn", "app.main:app", "--workers", "3", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000", "--timeout", "600"]
