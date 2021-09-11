package model.dto

import play.api.libs.json.Json

case class GetStoryList(id: Long, name: String, description: String, assignee: Option[String])

object GetStoryList {
  implicit val format = Json.format[GetStoryList]
}