package model.dto

import play.api.libs.json.Json

case class UpdateTask(description: String)

object UpdateTask {
  implicit val updateTaskFormat = Json.format[UpdateTask]
}
