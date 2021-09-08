package model.task

import play.api.libs.json.Json

case class Task(id: Long, description: String, storyId: Long, parentId: Option[Long], employeeId: Option[Long])

object Task {
  implicit val format = Json.format[Task]
}