package model.dto

import play.api.libs.json.Json

case class UpdateBacklog(description: String)

object UpdateBacklog {
  implicit val updateBacklogFormat = Json.format[UpdateBacklog]
}

