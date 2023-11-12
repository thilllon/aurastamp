# Aurastamp

## Environment Variables

Check [notion page](https://notion.com)

## Model Serving

Simple example of usage of streamlit and FastAPI for ML model serving described on [this blogpost](https://davidefiocco.github.io/streamlit-fastapi-ml-serving) and [PyConES 2020 video](https://www.youtube.com/watch?v=IvHCxycjeR0).

When developing simple APIs that serves machine learning models, it can be useful to have _both_ a backend (with API documentation) for other applications to call and a frontend for users to experiment with the functionality.

In this example, we serve an [image semantic segmentation model](https://pytorch.org/hub/pytorch_vision_deeplabv3_resnet101/) using `FastAPI` for the backend service and `streamlit` for the frontend service. `docker-compose` orchestrates the two services and allows communication between them.

To run the example in a machine running Docker and docker-compose, run:

```sh
docker-compose up --build
```

To visit the FastAPI documentation of the resulting service, visit `http://localhost:8000` with a web browser.
To visit the streamlit UI, visit `http://localhost:8501`.

Logs can be inspected via:

```sh
docker-compose logs
```

### Model Download

During docker build process, the [encoder](https://drive.google.com/uc?id=1GlKpari3euPiwLuvk9sx1X3YU0Q13R0w) and [decoder](https://drive.google.com/uc?id=1U0MOf77Ku_LhkjKIy3FAviWbkNhJfJ6p) will be downloaded at `./saved_models/`

### Debugging

To modify and debug the app, [development in containers](https://davidefiocco.github.io/debugging-containers-with-vs-code) can be useful (and kind of fun!).

### Environment Setup

- AWS Lightsail(Ubuntu 20.04)

```sh
sudo apt update
sudo apt -y install python3-pip apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt -y install docker-ce
sudo usermod -aG docker $USER
newgrp docker
echo "$(sudo systemctl status docker)"
docker -v

sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose version

# https://github.com/cli/cli/blob/trunk/docs/install_linux.md
type -p curl >/dev/null || sudo apt install curl -y
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

# 아래에서 해시값은 바꿔서 사용할것(에러로그에 나온값으로)
# sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 23F3D4EA75716059
sudo apt update
sudo apt -y install gh
gh auth login


cd ~
mkdir apps
git clone git@github.com:stegato/stamp_streamlit_fastapi.git
cd stamp_streamlit_fastapi
touch .env
# vi .env

docker-compose up -d --build


## SSL

# 이방법이 가장 깔끔한것 같음
sudo apt install certbot python-certbot-nginx
sudo certbot --nginx -d api.aurastamp.com


# https://velog.io/@pinot/Ubuntu-Nginx-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-CertBot%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-https-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

## 설치 스크립트 다운받기
# curl -L https://raw.githubusercontent.com/wmnnd/nginx-certbot/master/init-letsencrypt.sh > init-letsencrypt.sh

# https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04
sudo apt update
sudo apt install nginx
sudo ufw enable
sudo ufw app list
sudo ufw allow 'Nginx Full'
sudo ufw status
sudo systemctl status nginx
sudo systemctl start nginx
sudo systemctl restart nginx

sudo snap install --classic certbot
sudo certbot --nginx
sudo certbot renew

## reverse proxy
# TODO:
```

- at lightsail,
  - Open 443(https) port up at Lightsail instance
  - Fix static IP => Register the IP to DNS
