package security.persistence

import org.scalatest.FunSuite
import org.scalatest.Matchers.{be, convertToAnyShouldWrapper}
import org.scalatest.MustMatchers.convertToAnyMustWrapper
import play.api.libs.json.{JsValue, Json}

class SqliteAuthInfoRepositoryTest extends FunSuite {

  test("maps json string to scala map") {
    val json: JsValue = Json.parse(
      """
  {
    "a": "1",
    "b": "2",
    "c": "3"
  }
""")
    val res = SqliteAuthInfoRepository.mapReads.reads(json)
    res.get should be (Map[String, String]("a" -> "1", "b" -> "2", "c" -> "3"))
  }

  test("maps json empty object to empty scala map") {
    val json: JsValue = Json.parse("{}")
    val res = SqliteAuthInfoRepository.mapReads.reads(json)
    res.get should be (Map[String, String]())
  }

  test("maps scala map to json string") {
    val string = SqliteAuthInfoRepository.mapWrites.writes(Map[String, String]("1" -> "2", "a" -> "b"))
    string.toString() mustBe "{\"1\":\"2\",\"a\":\"b\"}"
  }

  test("maps empty scala map to json properly") {
    val string = SqliteAuthInfoRepository.mapWrites.writes(Map[String, String]())
    string.toString() mustBe "{}"
  }

}