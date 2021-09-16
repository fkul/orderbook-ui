import { ReadyState } from "react-use-websocket"

export type CfWsMessage = {
  readyState: ReadyState
  subscriptionStatus?: string
  data?: any
}
