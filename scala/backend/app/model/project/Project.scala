package model.project

import play.api.libs.json.Json

case class Project(id: Long, name: String, description: String)

object Project {
  implicit val format = Json.format[Project]
}
