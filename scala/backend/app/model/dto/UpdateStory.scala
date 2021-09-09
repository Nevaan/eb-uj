package model.dto

import play.api.libs.json.Json

case class UpdateStory(name: String, description: String, assigneeId: Option[Long])

object UpdateStory {
  implicit val updateStoryFormat = Json.format[UpdateStory]
}