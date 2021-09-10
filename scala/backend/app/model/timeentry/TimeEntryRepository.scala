package model.timeentry

import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class TimeEntryRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext){
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class TimeEntryTable(tag: Tag) extends Table[TimeEntry](tag, "TimeEntry") {
      def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
      def manHours = column[Long]("manHours")
      def assigneeId = column[Long]("assigneeId")

    def * = (id, manHours, assigneeId) <> ((TimeEntry.apply _).tupled, TimeEntry.unapply)
  }

  val timeEntry = TableQuery[TimeEntryTable]

  def create(manHours: Long, assigneeId: Long): Future[TimeEntry] = db.run {
    (timeEntry.map(te => (te.manHours, te.assigneeId))
      returning timeEntry.map(_.id)
      into { case ((manHours, assigneeId), id) => TimeEntry(id, manHours, assigneeId)}
      ) += (manHours, assigneeId)
  }




}
