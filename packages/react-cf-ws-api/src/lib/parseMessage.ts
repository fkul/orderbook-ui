import { FeedDataName } from "./dataFactory"
import { onUpdate, onSnapshot } from "./data"

export const parseMessage = (message: any): any => {
  const jsonMsg = (() => {
    try {
      return JSON.parse(message)
    } catch (e) {
      return {}
    }
  })()

  if (!jsonMsg.feed || !jsonMsg.product_id) {
    return jsonMsg
  }

  try {
    switch (jsonMsg.feed) {
      case "book_ui_1":
        return onUpdate(jsonMsg.product_id, FeedDataName.BookUi1, jsonMsg)
      case "book_ui_1_snapshot":
        return onSnapshot(jsonMsg.product_id, FeedDataName.BookUi1, jsonMsg)
      default:
        return jsonMsg
    }
  } catch (e) {
    e.name = jsonMsg.feed
    throw e
  }
}
