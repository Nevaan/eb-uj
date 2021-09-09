package model.dto

import play.api.libs.json.Json

case class GetSubtask(id: Long, description: String, storyId: Long, parentId: Option[Long], employeeId: Option[Long], teamId: Long)

object GetSubtask {
  implicit val format = Json.format[GetSubtask]
}