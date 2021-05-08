FROM ubuntu:18.04

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
SHELL ["/bin/bash", "-c"]

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y zip unzip curl sudo

RUN useradd -ms /bin/bash ebuser
RUN adduser ebuser sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

RUN mkdir -pv /mounted
VOLUME /mounted
RUN chown ebuser /mounted

USER ebuser
WORKDIR /home/ebuser

RUN curl -s "https://get.sdkman.io" | bash

RUN source "$HOME/.sdkman/bin/sdkman-init.sh" && sdk install java 8.0.275.open-adpt && sdk install scala 2.12.13 && sdk install sbt 1.5.1 && sbt -V

RUN curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash - && sudo apt-get install -y nodejs

EXPOSE 3000
EXPOSE 9000
