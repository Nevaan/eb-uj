package model.task

import model.dto.GetTaskList
import model.employee.EmployeeRepository
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class TaskRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, employeeRepository: EmployeeRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class TaskTable(tag: Tag) extends Table[Task](tag, "Task") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def description = column[String]("description")
    def storyId = column[Long]("storyId")
    def parentId = column[Option[Long]]("parentId")
    def assigneeId = column[Option[Long]]("assigneeId")

    def * = (id, description, storyId, parentId, assigneeId) <> ((Task.apply _).tupled, Task.unapply)
  }

  val task = TableQuery[TaskTable]

  def create(description: String, storyId: Long, parentId: Option[Long], assigneeId: Option[Long]): Future[Task] = db.run {
    (task.map(t => (t.description, t.storyId, t.parentId, t.assigneeId))
      returning task.map(_.id)
      into { case((description, storyId, parentId, assigneeId), id) => Task(id, description, storyId, parentId, assigneeId) }
      ) += (description, storyId, parentId, assigneeId)
  }

  def getTasksForStory(storyId: Long): Future[Seq[GetTaskList]] = db.run {
    task.filter(_.storyId === storyId).filter(_.parentId.isEmpty)
      .joinLeft(employeeRepository.employee)
      .on(_.assigneeId === _.id)
      .result
      .map( list => {
        list.map(singleTask => {
          val (task, maybeEmployee) = singleTask
          maybeEmployee match {
            case Some(employee) => GetTaskList(task.id, task.description, Some(s"${employee.name} ${employee.surname}"))
            case None => GetTaskList(task.id, task.description, None)
          }
        })
      })
  }

  def getSubtasks(taskId: Long): Future[Seq[GetTaskList]] = db.run {
    task.filter(_.parentId === taskId)
      .joinLeft(employeeRepository.employee)
      .on(_.assigneeId === _.id)
      .result
      .map( list => {
        list.map(singleTask => {
          val (task, maybeEmployee) = singleTask
          maybeEmployee match {
            case Some(employee) => GetTaskList(task.id, task.description, Some(s"${employee.name} ${employee.surname}"))
            case None => GetTaskList(task.id, task.description, None)
          }
        })
      })
  }

  def getSubtasksForTaskIdList(taskIds: Seq[Long]): Future[Seq[Task]] = db.run {
    task.filter(_.parentId inSet taskIds).result
  }

  def getTaskById(taskId: Long): Future[Option[Task]] = db.run {
    task.filter(_.id === taskId).filter(_.parentId.isEmpty).take(1).result.headOption
  }

  def getSubtaskById(taskId: Long): Future[Option[Task]] = db.run {
    task.filter(_.id === taskId).filter(_.parentId.isDefined).take(1).result.headOption
  }

  def update(id: Long, description: String): Future[Int] = db.run {
    val toUpdate = for { t <- task if t.id === id } yield (t.description)
    toUpdate.update(description)
  }

  def assignEmployee(id: Long, employeeId: Option[Long]): Future[Int] = db.run {
    val toUpdate = for { t <- task if t.id === id } yield (t.assigneeId)
    toUpdate.update(employeeId)
  }

}
