package model.dto

import play.api.libs.json.Json

case class AddEmployee(name: String, surname: String)

object AddEmployee {
  implicit val addEmployeeFormat = Json.format[AddEmployee]
}
