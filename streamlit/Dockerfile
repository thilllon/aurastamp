FROM python:3.7-slim

WORKDIR /streamlit
COPY . /streamlit

RUN apt-get update
RUN apt-get -y install gcc mono-mcs
RUN rm -rf /var/lib/apt/lists/*
RUN pip install streamlit requests requests-toolbelt --upgrade

EXPOSE 8501

CMD ["streamlit", "run", "ui.py"]
