package model.comment

import model.dto.GetComment
import model.user.repo.UserRepositoryImpl
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class CommentRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, userRepository: UserRepositoryImpl)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class CommentTable(tag: Tag) extends Table[Comment](tag, "Comment") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def content = column[String]("content")
    def authorId = column[String]("authorId")

    def * = (id, content, authorId) <> ((Comment.apply _).tupled, Comment.unapply)
  }

  val comment = TableQuery[CommentTable]

  def create(content: String, authorId: String): Future[Comment] = db.run {
    (comment.map(c => (c.content, c.authorId))
      returning comment.map(_.id)
      into { case ((content, authorId), id) => Comment(id, content, authorId) }
      ) += (content, authorId)
  }

  def getByIdList(ids: Seq[Long]): Future[Seq[GetComment]] = db.run {
    comment.filter(_.id inSet ids)
      .join(userRepository.user)
      .on(_.authorId === _.id)
      .result
      .map(commentList => {
        commentList.map(commentListElement => {
          val (comment, user) = commentListElement
          user.fullName match {
            case Some(fullName) => GetComment(comment.id, comment.content, fullName)
            case None => GetComment(comment.id, comment.content, "unknown")
          }

        })
      })
  }

}
