import { BookUi1, BookUi1Data } from "./BookUi1"

let testData: BookUi1Data

beforeEach(() => {
  testData = {
    feed: "TEST",
    productId: "TEST",
    asks: [
      [4, 1],
      [5, 1],
    ],
    bids: [
      [2, 1],
      [1, 1],
    ],
    numLevels: 0,
  }
})

test("get returns the data", () => {
  const book = new BookUi1(testData)
  expect(book.get()).toEqual(testData)
})

test("update inserts asks", () => {
  const book = new BookUi1(testData)
  const updateData = {
    ...testData,
    asks: [[6, 1]],
    bids: [[]],
  }
  book.update(updateData)
  expect(book.get().asks).toEqual([
    [4, 1],
    [5, 1],
    [6, 1],
  ])
})

test("update updates asks", () => {
  const book = new BookUi1(testData)
  const updateData = {
    ...testData,
    asks: [[4, 2]],
    bids: [[]],
  }
  book.update(updateData)
  expect(book.get().asks).toEqual([
    [4, 2],
    [5, 1],
  ])
})

test("update removes asks", () => {
  const book = new BookUi1(testData)
  const updateData = {
    ...testData,
    asks: [[4, 0]],
    bids: [[]],
  }
  book.update(updateData)
  expect(book.get().asks).toEqual([[5, 1]])
})

test("update inserts bids", () => {
  const book = new BookUi1(testData)
  const updateData = {
    ...testData,
    asks: [[]],
    bids: [[3, 1]],
  }
  book.update(updateData)
  expect(book.get().bids).toEqual([
    [3, 1],
    [2, 1],
    [1, 1],
  ])
})

test("update updates bids", () => {
  const book = new BookUi1(testData)
  const updateData = {
    ...testData,
    asks: [[]],
    bids: [[1, 2]],
  }
  book.update(updateData)
  expect(book.get().bids).toEqual([
    [2, 1],
    [1, 2],
  ])
})

test("update removes bids", () => {
  const book = new BookUi1(testData)
  const updateData = {
    ...testData,
    asks: [[]],
    bids: [[1, 0]],
  }
  book.update(updateData)
  expect(book.get().bids).toEqual([[2, 1]])
})
