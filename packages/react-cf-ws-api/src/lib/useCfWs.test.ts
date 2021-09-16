import {
  getSubscription,
  hasSubscription,
  removeSubscription,
} from "./subscriptions"
import { useCfWs } from "./useCfWs"

jest.mock("react-use-websocket", () => {
  const originalModule = jest.requireActual("react-use-websocket")

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => ({
      readyState: "",
      sendJsonMessage: jest.fn(),
    })),
  }
})

const FEED = "TEST"

const ws = useCfWs()

beforeEach(() => {
  removeSubscription(FEED)
})

afterEach(() => {
  jest.clearAllMocks()
})

test("subscribePub adds subscription", () => {
  ws.subscribePub(FEED, [], () => {})
  expect(hasSubscription(FEED)).toEqual(true)
})

test("unsubscribePub removes subscription", () => {
  ws.subscribePub(FEED, [], () => {})
  ws.unsubscribePub(FEED, [])
  expect(hasSubscription(FEED)).toEqual(false)
})

test("updateSubscription updates the callback", () => {
  const callback1 = () => "TEST1"
  const callback2 = () => "TEST2"

  ws.subscribePub(FEED, [], callback1)
  ws.updateSubscription(FEED, callback2)
  expect(getSubscription(FEED).callback).toEqual(callback2)
})

test("getSubscriptionStatus returns undefined when not subscribed", () => {
  expect(useCfWs().getSubscriptionStatus(FEED)).toEqual(undefined)
})
