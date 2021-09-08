package model.dto

import play.api.libs.json.Json

case class AddTask(description: String, assigneeId: Option[Long], storyId: Long)

object AddTask {
  implicit val addTaskFormat = Json.format[AddTask]
}
