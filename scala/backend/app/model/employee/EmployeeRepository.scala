package model.employee

import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext

@Singleton
class EmployeeRepository  @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext){
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class EmployeeTable(tag: Tag) extends Table[Employee](tag, "Employee") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def surname = column[String]("surname")

    def * = (id, name, surname) <> ((Employee.apply _).tupled, Employee.unapply)
  }

  val employee = TableQuery[EmployeeTable]
}
