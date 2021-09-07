package model.story

import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class StoryRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class StoryTable(tag: Tag) extends Table[Story](tag, "Story") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def description = column[String]("description")
    def stageId = column[Long]("stageId")
    def assigneeId = column[Option[Long]]("assigneeId")

    def * = (id, name, description, stageId, assigneeId) <> ((Story.apply _).tupled, Story.unapply)
  }

  val story = TableQuery[StoryTable]

  def create(name: String, description: String, stageId: Long): Future[Story] = db.run {
    (story.map(s => (s.name, s.description, s.stageId, s.assigneeId))
      returning story.map(_.id)
      into { case ((name, description, stageId, assigneeId), id) => Story(id, name, description, stageId, assigneeId) }
      ) += (name, description, stageId, None)
  }

  def getByStageId(stageId: Long): Future[Seq[Story]] = db.run {
    story.filter(_.stageId === stageId).result
  }

}
