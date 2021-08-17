package model.dto

import play.api.libs.json.Json

case class UpdateProject(name: String, description: String)

object UpdateProject {
  implicit val updateProjectFormat = Json.format[UpdateProject]
}