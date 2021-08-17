package model.dto

import play.api.libs.json.Json

case class AddProject(name: String, description: String)

object AddProject {
  implicit val addProjectFormat = Json.format[AddProject]
}