import { onSnapshot, onUpdate, removeData } from "./data"
import { BookUi1Data } from "./types/data/BookUi1Data"
import { FeedDataName } from "./dataFactory"

const PRODUCT_ID = "TEST"
const FEED = FeedDataName.BookUi1

const testData: BookUi1Data = {
  feed: "TEST",
  productId: "TEST",
  asks: [[]],
  bids: [[]],
  numLevels: 0,
}

beforeEach(() => {
  removeData(PRODUCT_ID, FEED)
})

test("onSnapshot returns provided data", () => {
  expect(onSnapshot(PRODUCT_ID, FEED, testData)).toEqual(testData)
})

test("onUpdate returns null if a feed doesn't exist", () => {
  expect(onUpdate(PRODUCT_ID, FEED, testData)).toEqual(null)
})

test("onUpdate returns provided data", () => {
  onSnapshot(PRODUCT_ID, FEED, testData)
  expect(onUpdate(PRODUCT_ID, FEED, testData)).toEqual(testData)
})

test("removeData removes a feed data instance", () => {
  onSnapshot(PRODUCT_ID, FEED, testData)
  removeData(PRODUCT_ID, FEED)
  expect(onUpdate(PRODUCT_ID, FEED, testData)).toEqual(null)
})
