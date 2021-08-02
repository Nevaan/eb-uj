[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=eb-uj&metric=ncloc)](https://sonarcloud.io/dashboard?id=eb-uj)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=eb-uj&metric=bugs)](https://sonarcloud.io/dashboard?id=eb-uj)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=eb-uj&metric=code_smells)](https://sonarcloud.io/dashboard?id=eb-uj)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=eb-uj&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=eb-uj)
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

* **react/** - kod frontendu
* **scala/** - kod backendu

Aplikacja zdeployowana na Azure - https://20.76.227.85/

Frontend oraz backend postawione są na osobnych App Service. Ze względu na różne subdomeny (A.azurewebsites.net oraz B.azurewebsites.net) oraz fakt, iż przeglądarki nie zezwalają na ustawianie cookie bezposrednio dla domeny azurewebsites.net - aplikacja uzywa ciastka autentykacyjnego - w Azure dodałem usługę Application Gateway. Dzięki temu obie aplikacje dostępne są przez publiczny adres IP wymieniony powyżej, i nie ustawiam cookie z redirect w subdomenie backendowej (B.azurewebsites.net) dla subdomeny frontendu (A.azurewebsites.net).

Minusem takiego rozwiązania, ze względu na to iż używam HTTPS, jest ostrzeżenie o niezaufanym certyfikacie (self-signed certificate). W Chrome po wejściu na ww. adres IP można obejść to wpisując "thisisunsafe".
