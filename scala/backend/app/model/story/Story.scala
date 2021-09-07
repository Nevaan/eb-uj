package model.story

import play.api.libs.json.Json

case class Story(id: Long, name: String, description: String, stageId: Long, assigneeId: Option[Long])

object Story {
  implicit val format = Json.format[Story]
}