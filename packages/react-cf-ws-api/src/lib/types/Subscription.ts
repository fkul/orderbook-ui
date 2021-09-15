import { SubscribeMessage } from "./SubscribeMessage"

export type Subscription = {
  message: SubscribeMessage
  status: string
  callback: (data: any) => void
}
