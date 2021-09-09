package model.dto

import play.api.libs.json.Json

case class GetTask(id: Long, description: String, storyId: Long, parentId: Option[Long], employeeId: Option[Long], teamId: Long)

object GetTask {
  implicit val format = Json.format[GetTask]
}