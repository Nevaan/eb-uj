package model.dto

import play.api.libs.json.Json

case class UpdateSprint(description: String)

object UpdateSprint {
  implicit val updateSprintFormat = Json.format[UpdateSprint]
}
