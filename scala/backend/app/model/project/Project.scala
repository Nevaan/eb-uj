package model.project

import play.api.libs.json.Json

case class Project(id: Long, name: String, description: String, teamId: Long, sprintId: Option[Long], backlogId: Option[Long])

object Project {
  implicit val format = Json.format[Project]
}
