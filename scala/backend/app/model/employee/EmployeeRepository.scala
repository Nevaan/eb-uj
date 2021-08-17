package model.employee

import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

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

  def create(name: String, surname: String): Future[Employee] = db.run {
    (employee.map(t => (t.name, t.surname))
      returning employee.map(_.id)
      into { case ((name, surname), id) => Employee(id, name, surname)}
      ) += (name, surname)
  }

  def list(): Future[Seq[Employee]] = db.run {
    employee.result
  }

  def getById(id: Long): Future[Option[Employee]] = db.run {
    employee.filter(_.id === id)
      .take(1)
      .result
      .headOption
  }

  def update(id: Long, name: String, surname: String): Future[Employee] = db.run {
    val toUpdate = for { e <- employee if e.id === id } yield (e.name, e.surname)
    val q = toUpdate.update((name, surname))
    q.map(_ => Employee(id, name ,surname))
  }

}
