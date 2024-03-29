package model.story

import model.dto.GetStoryList
import model.employee.EmployeeRepository
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class StoryRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, employeeRepository: EmployeeRepository)(implicit ec: ExecutionContext) {
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

  def getByStageId(stageId: Long): Future[Seq[GetStoryList]] = db.run {
    story.filter(_.stageId === stageId)
      .joinLeft(employeeRepository.employee)
      .on(_.assigneeId === _.id)
      .result
      .map(
        result => {
          result.map(xx => {
            val (story, maybeEmployee) = xx
            maybeEmployee match {
              case Some(employee) => GetStoryList(story.id, story.name, story.description, Some(s"${employee.name}  ${employee.surname}"))
              case None => GetStoryList(story.id, story.name, story.description, None)
            }
          })
        })
  }


  def get(id: Long): Future[Option[Story]] = db.run {
    story.filter(_.id === id).take(1).result.headOption
  }

  def update(id: Long, name: String, description: String, assigneeId: Option[Long]): Future[Int] = db.run {
    val toUpdate = for {s <- story if s.id === id} yield (s.name, s.description, s.assigneeId)
    toUpdate.update((name, description, assigneeId))
  }

}
