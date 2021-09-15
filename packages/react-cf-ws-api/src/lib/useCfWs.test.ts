import { removeSubscription } from "./subscriptions"
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

beforeEach(() => {
  removeSubscription(FEED)
})

afterEach(() => {
  jest.clearAllMocks()
})

test("subscribePub adds subscription", () => {
  const ws = useCfWs()
  ws.subscribePub(FEED, [], () => {})
  expect(ws.getSubscriptionStatus(FEED)).toEqual("")
})

test("unsubscribePub removes subscription", () => {
  const ws = useCfWs()
  ws.subscribePub(FEED, [], () => {})
  ws.unsubscribePub(FEED, [])
  expect(ws.getSubscriptionStatus(FEED)).toEqual(null)
})

test("getSubscriptionStatus returns empty status when not subscribed", () => {
  expect(useCfWs().getSubscriptionStatus(FEED)).toEqual(null)
})
