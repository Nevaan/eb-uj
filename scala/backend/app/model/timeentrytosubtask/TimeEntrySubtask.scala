package model.timeentrytosubtask

import play.api.libs.json.Json

case class TimeEntrySubtask(subtask: Long, timeEntry: Long)

object TimeEntrySubtask {
  implicit val format = Json.format[TimeEntrySubtask]
}