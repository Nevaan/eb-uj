package model.employee

import play.api.libs.json.Json

case class Employee(id: Long, name: String, surname: String)

object Employee {
  implicit val format = Json.format[Employee]
}