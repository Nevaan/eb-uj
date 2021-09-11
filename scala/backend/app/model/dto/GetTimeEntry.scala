package model.dto

import play.api.libs.json.Json

case class GetTimeEntry(id: Long, manHours: Long, employee: String)

object GetTimeEntry {
  implicit val format = Json.format[GetTimeEntry]
}