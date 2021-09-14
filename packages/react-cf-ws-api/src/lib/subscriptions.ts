import { Subscription } from "./types/Subscription"

type Subscriptions = {
  [feed: string]: Subscription
}

const subscriptions: Subscriptions = {}

export const getSubscription = (feed: string): Subscription => {
  return subscriptions[feed] || {}
}

export const getSubscriptions = (): Subscriptions => {
  return subscriptions
}

export const hasSubscription = (feed: string): boolean => {
  return subscriptions[feed] !== undefined
}

export const addSubscription = (
  feed: string,
  subscription: Subscription
): void => {
  subscriptions[feed] = subscription
}

export const removeSubscription = (feed: string): void => {
  delete subscriptions[feed]
}
