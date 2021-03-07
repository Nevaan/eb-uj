FROM ubuntu:18.04

ENV TZ=Europe/Warsaw

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y vim git wget unzip sudo

RUN useradd -ms /bin/bash devnev
RUN adduser devnev sudo

EXPOSE 8888

USER devnev
WORKDIR /home/devnev
RUN mkdir /home/devnev/projekt

VOLUME /home/devnev/projekt

CMD /bin/bash
