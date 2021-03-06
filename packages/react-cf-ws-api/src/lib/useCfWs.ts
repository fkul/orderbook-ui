import useWebSocket from "react-use-websocket"
import { Subscription, SubscriptionCallback } from "./types/Subscription"
import { SubscribeMessage } from "./types/SubscribeMessage"
import { parseMessage } from "./parseMessage"
import {
  addSubscription,
  getSubscription,
  getSubscriptions,
  hasSubscription,
  removeSubscription,
} from "./subscriptions"

type CfWs = {
  subscribePub(
    feed: string,
    products: string[],
    callback: SubscriptionCallback
  ): void
  unsubscribePub(feed: string, products: string[]): void
  updateSubscription(feed: string, callback: SubscriptionCallback): void
  getSubscriptionStatus(feed: string): string | undefined
}

const CF_URL = "wss://www.cryptofacilities.com/ws/v1"

export const useCfWs = (): CfWs => {
  const ws = useWebSocket(CF_URL, {
    share: true,
    retryOnError: true,
    shouldReconnect: e => {
      return true
    },
    onOpen: () => {
      console.log(`Connected to ${CF_URL}`)
      for (const [feed, subscription] of Object.entries(getSubscriptions())) {
        ws.sendJsonMessage(subscription.message)
      }
      _broadcastToSubscribers() // no data, but readyState will be updated
    },
    onClose: () => {
      console.log("Connection closed")
      _broadcastToSubscribers() // no data, but readyState will be updated
    },
    onError: () => {
      console.error("Connection error occurred")
      _broadcastToSubscribers() // no data, but readyState will be updated
    },
    filter: message => {
      let jsonMsg: any
      try {
        jsonMsg = parseMessage(message.data)
      } catch (e) {
        console.error(e.message)
        if (hasSubscription(e.name)) {
          getSubscription(e.name).status = "subscribed_failed"
          _sendToSubscriber(e.name)
        }
        return false
      }

      if (!jsonMsg.feed || !hasSubscription(jsonMsg.feed)) {
        return false
      }

      if (jsonMsg.event) {
        getSubscription(jsonMsg.feed).status = jsonMsg.event
        _sendToSubscriber(jsonMsg.feed)
      } else {
        _sendToSubscriber(jsonMsg.feed, jsonMsg)
      }
      return false // always return false to avoid rerendering
    },
  })

  const _sendToSubscriber = (feed: string, data?: any): void => {
    if (!hasSubscription(feed)) return
    const subscription = getSubscription(feed)
    subscription.callback({
      readyState: ws.readyState,
      subscriptionStatus: subscription.status,
      data: data,
    })
  }

  const _broadcastToSubscribers = (data?: any): void => {
    for (const [feed, subscription] of Object.entries(getSubscriptions())) {
      _sendToSubscriber(feed, data)
    }
  }

  const subscribePub = (
    feed: string,
    products: string[],
    callback: SubscriptionCallback
  ): void => {
    const subscription: Subscription = {
      message: {
        event: "subscribe",
        feed,
        product_ids: products,
      },
      callback,
    }

    addSubscription(feed, subscription)
    ws.sendJsonMessage(subscription.message)
  }

  const unsubscribePub = (feed: string, products: string[]): void => {
    const message: SubscribeMessage = {
      event: "unsubscribe",
      feed,
      product_ids: products,
    }

    removeSubscription(feed)
    ws.sendJsonMessage(message)
  }

  const updateSubscription = (
    feed: string,
    callback: SubscriptionCallback
  ): void => {
    if (!hasSubscription(feed)) return
    getSubscription(feed).callback = callback
  }

  const getSubscriptionStatus = (feed: string): string | undefined => {
    return getSubscription(feed).status || undefined
  }

  return {
    subscribePub,
    unsubscribePub,
    updateSubscription,
    getSubscriptionStatus,
  }
}
