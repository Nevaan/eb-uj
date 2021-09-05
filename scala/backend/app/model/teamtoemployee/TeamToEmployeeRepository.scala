package model.teamtoemployee

import model.employee.{Employee, EmployeeRepository}
import model.team.TeamRepository
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class TeamToEmployeeRepository @Inject()(dbConfigProvider: DatabaseConfigProvider,
                                         val teamRepository: TeamRepository,
                                         val employeeRepository: EmployeeRepository)(implicit ec: ExecutionContext){
   val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class TeamToEmployeeTable(tag: Tag) extends Table[TeamToEmployee](tag, "_TeamEmployee") {

    def teamId = column[Long]("team")
    def employeeId = column[Long]("employee")

    def team = foreignKey("Team", teamId, teamRepository.team)(_.id)
    def employee = foreignKey("Employee", employeeId, employeeRepository.employee)(_.id)

    def * = (teamId, employeeId) <> ((TeamToEmployee.apply _).tupled, TeamToEmployee.unapply)
  }

  val teamToEmployee = TableQuery[TeamToEmployeeTable]

  def getEmployees(id: Long): Future[Seq[Employee]] = db.run {
    teamToEmployee.filter(_.teamId === id)
      .join(employeeRepository.employee)
      .on(_.employeeId === _.id)
      .map(_._2)
      .result
  }

  def removeByTeamId(teamId: Long): Future[Int] = db.run {
    val toRemove = teamToEmployee.filter(_.teamId === teamId)
    toRemove.delete
  }

  def getEmployeesNotInTeam(teamId: Long): Future[Seq[Employee]] = db.run {
    val subQuery = teamToEmployee.filter( t2e => t2e.teamId === teamId).map( t2e => t2e.employeeId)

    val query = employeeRepository.employee.filterNot(_.id in subQuery)

    query.distinct.result
  }

  def addEmployeeToTeam(teamId: Long, employeeId: Long): Future[Int] = db.run {
    teamToEmployee += TeamToEmployee(teamId, employeeId)
  }

}
