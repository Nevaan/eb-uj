package model.dto

import play.api.libs.json.Json

case class GetTaskList(id: Long, description: String, assignee: Option[String])

object GetTaskList {
  implicit val format = Json.format[GetTaskList]
}