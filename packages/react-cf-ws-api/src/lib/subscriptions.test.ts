import {
  addSubscription,
  getSubscription,
  getSubscriptions,
  hasSubscription,
  removeSubscription,
} from "./subscriptions"
import { Subscription } from "./types/Subscription"

const FEED = "TEST"

const subscription: Subscription = {
  message: {
    event: "TEST",
    feed: FEED,
  },
  status: "",
  callback: () => {},
}

beforeEach(() => {
  if (hasSubscription(FEED)) {
    removeSubscription(FEED)
  }
})

test("getSubscription returns empty object if no subscribers added", () => {
  expect(getSubscription(FEED)).toEqual({})
})

test("getSubscriptions returns empty object if no subscribers added", () => {
  expect(getSubscriptions()).toEqual({})
})

test("addSubscription adds a subscription", () => {
  addSubscription(FEED, subscription)
  expect(getSubscription(FEED)).toEqual(subscription)
})

test("addSubscription avoids duplicates", () => {
  addSubscription(FEED, subscription)
  expect(getSubscriptions()).toEqual({
    [FEED]: subscription,
  })
  addSubscription(FEED, subscription)
  expect(getSubscriptions()).toEqual({
    [FEED]: subscription,
  })
})

test("hasSubscription checks whether a subscription exists", () => {
  expect(hasSubscription(FEED)).toBe(false)
  addSubscription(FEED, subscription)
  expect(hasSubscription(FEED)).toBe(true)
})

test("removeSubscription removes a subscription", () => {
  addSubscription(FEED, subscription)
  expect(getSubscription(FEED)).toEqual(subscription)
  removeSubscription(FEED)
  expect(getSubscription(FEED)).toEqual({})
})
