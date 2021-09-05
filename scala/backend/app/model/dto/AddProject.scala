package model.dto

import play.api.libs.json.Json

case class AddProject(name: String, description: String, teamId: Long)

object AddProject {
  implicit val addProjectFormat = Json.format[AddProject]
}