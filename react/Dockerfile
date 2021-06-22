FROM ubuntu:18.04

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
SHELL ["/bin/bash", "-c"]

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y curl sudo

RUN useradd -ms /bin/bash ebuserfe
RUN adduser ebuserfe sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER ebuserfe
WORKDIR /home/ebuserfe

RUN curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash - && sudo apt-get install -y nodejs
EXPOSE 3000