import useWebSocket, { ReadyState } from "react-use-websocket"
import { Subscription } from "./types/Subscription"
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
    callback: (data?: any) => void
  ): void
  unsubscribePub(feed: string, products: string[]): void
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
    },
    onClose: () => {
      console.log("Connection closed")
    },
    onError: () => {
      console.log("Connection error occurred")
    },
    filter: message => {
      const jsonMsg = parseMessage(message)

      if (!jsonMsg.feed || !hasSubscription(jsonMsg.feed)) {
        return false
      }

      if (jsonMsg.event) {
        getSubscription(jsonMsg.feed).status = jsonMsg.event
      } else {
        getSubscription(jsonMsg.feed).callback(jsonMsg)
      }
      return false
    },
  })

  const subscribePub = (
    feed: string,
    products: string[],
    callback: () => void
  ): void => {
    const subscription: Subscription = {
      message: {
        event: "subscribe",
        feed: feed,
        product_ids: products,
      },
      status: "",
      callback: callback,
    }
    addSubscription(feed, subscription)

    if (ws.readyState === ReadyState.OPEN) {
      ws.sendJsonMessage(subscription.message)
    }
  }

  const unsubscribePub = (feed: string, products: string[]): void => {
    const message: SubscribeMessage = {
      event: "unsubscribe",
      feed: feed,
      product_ids: products,
    }

    removeSubscription(feed)
    ws.sendJsonMessage(message)
  }

  return { subscribePub, unsubscribePub }
}
