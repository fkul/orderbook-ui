import { FeedData } from "./types/FeedData"
import { dataFactory, FeedDataName } from "./dataFactory"

type Data = {
  [feedId: string]: FeedData
}

const data: Data = {}

const getFeedId = (productId: string, feed: FeedDataName): string =>
  `${productId}-${feed}`

export const onSnapshot = (
  productId: string,
  feed: FeedDataName,
  snapshotData: any
): any => {
  const feedId = getFeedId(productId, feed)
  data[feedId] = dataFactory().create(feed, snapshotData)

  return data[feedId].get()
}

export const onUpdate = (
  productId: string,
  feed: FeedDataName,
  updateData: any
): any => {
  const feedId = getFeedId(productId, feed)
  if (!data[feedId]) {
    return null
  }
  data[feedId].update(updateData)

  return data[feedId].get()
}
