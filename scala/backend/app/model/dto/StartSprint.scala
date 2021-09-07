package model.dto

import play.api.libs.json.Json

case class StartSprint(projectId: Long, backlogId: Long)

object StartSprint {
  implicit val startSprintFormat = Json.format[StartSprint]
}

