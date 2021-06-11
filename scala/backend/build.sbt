name := """backend"""
organization := "pl.edu.ujlosek"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.6"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test

libraryDependencies ++= Seq(
  "com.typesafe.play" %% "play-slick" % "4.0.2",
  "com.typesafe.play" %% "play-slick-evolutions" % "4.0.2",
  "org.xerial"        %  "sqlite-jdbc" % "3.30.1"
)

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "pl.edu.ujlosek.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "pl.edu.ujlosek.binders._"
