import { parseMessage } from "./parseMessage"

const validObject = { key: "value" }
const validJson = JSON.stringify(validObject)
const invalidJson = "TEST"

test("parseMessage returns empty object for an invalid JSON string", () => {
  expect(parseMessage(invalidJson)).toEqual({})
})

test("parseMessage returns object for a valid JSON string", () => {
  expect(parseMessage(validJson)).toEqual(validObject)
})
