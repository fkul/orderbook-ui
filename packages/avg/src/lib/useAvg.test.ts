import { useAvg } from "./useAvg"

const avg = useAvg()

beforeEach(() => {
  useAvg().reset()
})

test("get returns 0 with no number added", () => {
  expect(avg.get()).toEqual(0)
})

test("get gets a number", () => {
  avg.add(2)
  expect(avg.get()).toEqual(2)
})

test("add adds a number", () => {
  avg.add(10)
  avg.add(30)
  expect(avg.get()).toEqual(20)
})

test("getCount gets the count of numbers added", () => {
  avg.add(1)
  avg.add(1)
  avg.add(1)
  expect(avg.getCount()).toEqual(3)
})

test("setMaxCount sets the max count", () => {
  avg.setMaxCount(2)
  avg.add(1)
  avg.add(2)
  avg.add(10)
  avg.add(30)
  expect(avg.get()).toEqual(20)
})

test("reset resets the average", () => {
  avg.setMaxCount(2)
  avg.add(1)
  avg.add(2)
  avg.add(3)
  avg.reset()
  expect(avg.get()).toEqual(0)
})
