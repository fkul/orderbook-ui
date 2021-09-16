import { FeedData } from "./types/FeedData"
import { dataFactory, FeedDataName } from "./dataFactory"

type Data = {
  [feedId: string]: FeedData
}

const data: Data = {}

const _getFeedId = (productId: string, feed: FeedDataName): string =>
  `${productId}-${feed}`

export const onSnapshot = (
  productId: string,
  feed: FeedDataName,
  snapshotData: any
): any => {
  const feedId = _getFeedId(productId, feed)

  try {
    data[feedId] = dataFactory().create(feed, snapshotData)
    return data[feedId].get()
  } catch (e) {
    return {}
  }
}

export const onUpdate = (
  productId: string,
  feed: FeedDataName,
  updateData: any
): any => {
  const feedId = _getFeedId(productId, feed)

  if (!data[feedId]) {
    return null
  }
  data[feedId].update(updateData)

  return data[feedId].get()
}

export const removeData = (productId: string, feed: FeedDataName): void => {
  const feedId = _getFeedId(productId, feed)
  delete data[feedId]
}
