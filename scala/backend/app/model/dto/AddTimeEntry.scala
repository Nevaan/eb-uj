package model.dto

import play.api.libs.json.Json

case class AddTimeEntry(subtaskId: Long, manHours: Long, assigneeId: Long)

object AddTimeEntry {
  implicit val format = Json.format[AddTimeEntry]
}