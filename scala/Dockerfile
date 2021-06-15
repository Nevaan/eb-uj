FROM ubuntu:18.04

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
SHELL ["/bin/bash", "-c"]

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y curl sudo zip unzip

RUN useradd -ms /bin/bash ebuserbe
RUN adduser ebuserbe sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

COPY ./backend /home/ebuserbe/src
RUN chown -R ebuserbe /home/ebuserbe/*

USER ebuserbe
WORKDIR /home/ebuserbe

RUN curl -s "https://get.sdkman.io" | bash
RUN source "$HOME/.sdkman/bin/sdkman-init.sh" && sdk install java 8.0.272.hs-adpt && sdk install scala 2.12.13 && sdk install sbt 1.5.1

WORKDIR /home/ebuserbe/src
EXPOSE 9000

ENV SDK_HOME="/home/ebuserbe/.sdkman/candidates"
ENV SCALA_HOME="$SDK_HOME/scala/current/bin"
ENV SBT_HOME="$SDK_HOME/sbt/current/bin"
ENV JAVA_HOME="$SDK_HOME/java/current/bin"
ENV PATH="$PATH:$SDK_HOME:$SCALA_HOME:$SBT_HOME:$JAVA_HOME"

CMD sbt run