package model.dto

import play.api.libs.json.Json

case class AddSubtask(description: String, taskId: Long, assigneeId: Option[Long], storyId: Long)

object AddSubtask {
  implicit val addSubtaskFormat = Json.format[AddSubtask]
}
