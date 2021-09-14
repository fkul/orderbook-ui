import { SubscribeMessage } from "./SubscribeMessage";

export type Subscription = {
  message: SubscribeMessage;
  callback: (data: any) => void;
};
