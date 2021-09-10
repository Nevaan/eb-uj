package model.commenttask

import model.comment.CommentRepository
import model.task.TaskRepository
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class CommentTaskRepository @Inject()(dbConfigProvider: DatabaseConfigProvider,
                                      val commentRepository: CommentRepository,
                                      val taskRepository: TaskRepository)(implicit ec: ExecutionContext){

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class CommentTaskTable(tag: Tag) extends Table[CommentTask](tag, "_CommentTask") {
    def comment = column[Long]("comment")
    def task = column[Long]("task")

    def * = (comment, task) <> ((CommentTask.apply _).tupled, CommentTask.unapply)
  }

  val commentTask = TableQuery[CommentTaskTable]

  def create(commentId: Long, taskId: Long): Future[Int] = db.run {
    commentTask += CommentTask(commentId, taskId)
  }

  def getCommentIdForTask(taskId: Long): Future[Seq[Long]] = db.run {
    commentTask.filter(_.task === taskId).map(_.comment).result
  }

}
