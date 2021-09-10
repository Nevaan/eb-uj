package model.timeentry

import play.api.libs.json.Json

case class TimeEntry(id: Long, manHours: Long, assigneeId: Long)

object TimeEntry {
  implicit val format = Json.format[TimeEntry]
}