package model.user.repo

import model.user.User

import java.util.UUID
import scala.concurrent.Future

trait UserRepository {
  def list(): Future[Seq[User]]
  def find(id: String): Future[Option[User]]
  def save(newUser: User): Future[User]
  def update(updateUser: User): Future[User]
}
