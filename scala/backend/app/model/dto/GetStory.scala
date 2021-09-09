package model.dto

import play.api.libs.json.Json

case class GetStory(id: Long, name: String, description: String, assigneeId: Option[Long], teamId: Long)

object GetStory {
  implicit val getStoryFormat = Json.format[GetStory]
}