package model.dto

import play.api.libs.json.Json

case class TimeEntryTimeCount(totalCount: Long)

object TimeEntryTimeCount {
  implicit val format = Json.format[TimeEntryTimeCount]
}