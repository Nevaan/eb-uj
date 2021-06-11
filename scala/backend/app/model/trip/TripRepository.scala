package model.trip

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class TripRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class TripTable(tag: Tag) extends Table[Trip](tag, "Trip") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def description = column[String]("description")

    def * = (id, name, description) <> ((Trip.apply _).tupled, Trip.unapply)
  }

  private val trip = TableQuery[TripTable]

  def create(name: String, description: String): Future[Trip] = db.run {
      (trip.map(t => (t.name, t.description))
        returning trip.map(_.id)
        into { case ((name, description), id) =>  Trip(id, name, description)}
    ) += (name, description)
  }

  def list(): Future[Seq[Trip]] = db.run {
    trip.result
  }

}
