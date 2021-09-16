import { CfWsMessage } from "./CfWsMessage"
import { SubscribeMessage } from "./SubscribeMessage"

export type Subscription = {
  message: SubscribeMessage
  status?: string
  callback: SubscriptionCallback
}

export type SubscriptionCallback = (message: CfWsMessage) => void
