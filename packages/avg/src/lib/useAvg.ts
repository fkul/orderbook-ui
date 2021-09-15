type Avg = {
  add(number: number): void
  get(): number
  getCount(): number
  setMaxCount(count: number): void
  reset(): void
}

let numbers: number[] = []
let sum: number = 0
let maxCount: number = 100

export const useAvg = (): Avg => {
  const add = (number: number): void => {
    numbers.push(number)
    sum += number

    if (numbers.length > maxCount) {
      sum -= numbers.shift() || 0
    }
  }

  const get = (): number => {
    if (numbers.length === 0) {
      return 0
    }
    return sum / numbers.length
  }

  const getCount = (): number => {
    return numbers.length
  }

  const setMaxCount = (count: number): void => {
    maxCount = count
  }

  const reset = (): void => {
    numbers = []
    sum = 0
    maxCount = 100
  }

  return { add, get, getCount, setMaxCount, reset }
}
