import { BookUi1 } from "./data/BookUi1"
import { dataFactory, FeedDataName } from "./dataFactory"

test("create throws an exception if a feed doesn't exist", () => {
  try {
    dataFactory().create(FeedDataName["TEST"])
  } catch (e) {
    expect(e.message).toEqual("Feed does not exist")
  }
})

test("create returns valid instance", () => {
  expect(dataFactory().create(FeedDataName.BookUi1, {})).toBeInstanceOf(BookUi1)
})
