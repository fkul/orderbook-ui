import { BookUi1 } from "./data/BookUi1"
import { FeedData } from "./types/FeedData"

export enum FeedDataName {
  BookUi1 = "BookUi1",
}

type DataFactory = {
  create(feed: FeedDataName, data?: any): FeedData
}

export const dataFactory = (): DataFactory => {
  const create = (feed: FeedDataName, data?: any): FeedData => {
    switch (feed) {
      case FeedDataName.BookUi1:
        return new BookUi1(data)
      default:
        throw new Error("Feed does not exist")
    }
  }

  return { create }
}
