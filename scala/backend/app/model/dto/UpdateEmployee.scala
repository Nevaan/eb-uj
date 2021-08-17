package model.dto

import play.api.libs.json.Json

case class UpdateEmployee(name: String, surname: String)

object UpdateEmployee {
  implicit val updateEmployeeFormat = Json.format[UpdateEmployee]
}
