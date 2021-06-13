[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=eb-uj&metric=ncloc)](https://sonarcloud.io/dashboard?id=eb-uj)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=eb-uj&metric=bugs)](https://sonarcloud.io/dashboard?id=eb-uj)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=eb-uj&metric=code_smells)](https://sonarcloud.io/dashboard?id=eb-uj)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=eb-uj&metric=sqale_index)](https://sonarcloud.io/dashboard?id=eb-uj)

[Link do dockerhuba](https://hub.docker.com/repository/docker/devnevaan/eb-uj "Dockerhub")

* **1/** - przykladowy, prosty dockerfile. Docker tag example-container

```bash
docker run -it devnevaan/eb-uj:example-container /bin/bash
```

* **simple-java-scala/** - kontener z zainstalowana Java 1.8, Scala 2.12.13, sbt 1.4.7, node 15. Wystawione porty 3000(react) i 9000 (scala - play). Dodany volume /mounted.  Docker tag scala-node
```bash
docker run -it devnevaan/eb-uj:scala-node /bin/bash
```
