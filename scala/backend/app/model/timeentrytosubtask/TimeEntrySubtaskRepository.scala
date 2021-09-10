package model.timeentrytosubtask

import model.task.TaskRepository
import model.timeentry.{TimeEntry, TimeEntryRepository}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class TimeEntrySubtaskRepository @Inject()(dbConfigProvider: DatabaseConfigProvider,
                                           val timeEntryRepository: TimeEntryRepository,
                                           val taskRepository: TaskRepository)(implicit ec: ExecutionContext){

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class TimeEntrySubtaskTable(tag: Tag) extends Table[TimeEntrySubtask](tag, "_TimeEntrySubtask") {

    def subtaskId = column[Long]("subtask")
    def timeEntryId = column[Long]("timeEntry")

    def timeEntry = foreignKey("TimeEntry", timeEntryId, timeEntryRepository.timeEntry)(_.id)
    def subtask = foreignKey("Task", subtaskId, taskRepository.task)(_.id)

    def * = (subtaskId, timeEntryId) <> ((TimeEntrySubtask.apply _).tupled, TimeEntrySubtask.unapply)
  }

  val timeEntrySubtask = TableQuery[TimeEntrySubtaskTable]

  def addTimeEntryToSubtask(subtaskId: Long, timeEntryId: Long): Future[Int] = db.run {
    timeEntrySubtask += TimeEntrySubtask(subtaskId, timeEntryId)
  }

  def getEntriesForSubtask(id: Long): Future[Seq[TimeEntry]] = db.run {
    timeEntrySubtask.filter(_.subtaskId === id)
      .join(timeEntryRepository.timeEntry)
      .on(_.timeEntryId === _.id)
      .map(_._2)
      .result
  }

  def getEntriesForSubtasks(ids: Seq[Long]): Future[Seq[TimeEntry]] = db.run {
    timeEntrySubtask.filter(_.subtaskId inSet ids)
      .join(timeEntryRepository.timeEntry)
      .on(_.timeEntryId === _.id)
      .map(_._2)
      .result
  }

}
