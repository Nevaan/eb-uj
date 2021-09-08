package model.dto

import play.api.libs.json.Json

case class UpdateSubtask(description: String)

object UpdateSubtask {
  implicit val updateSubtaskFormat = Json.format[UpdateSubtask]
}
