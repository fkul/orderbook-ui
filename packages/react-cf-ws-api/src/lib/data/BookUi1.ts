import { BookUi1Data } from "../types/data/BookUi1Data"
import { FeedData } from "../types/FeedData"

export class BookUi1 implements FeedData {
  private _data: BookUi1Data

  constructor(snapshotData: BookUi1Data) {
    this._data = snapshotData
    this._data.feed = "book_ui_1"
    this._data.productId = snapshotData["product_id"]
  }

  private _insertLevel(type: string, idx: number, price: number, size: number) {
    if (size > 0) {
      this._data[type].splice(idx, 0, [price, size])
    }
  }

  private _updateOrRemoveLevel(
    type: string,
    idx: number,
    price: number,
    size: number
  ) {
    if (size > 0) {
      this._data[type][idx] = [price, size]
    } else {
      this._data[type].splice(idx, 1)
    }
  }

  private _updateSide(type: string, levels: number[][], i: number = 0) {
    let currentLevel: number[] | undefined

    while (levels.length > 0 || currentLevel !== undefined) {
      const nextI = type === "asks" ? i + 1 : i - 1

      if (
        this._data[type][i] &&
        this._data[type][nextI] &&
        this._data[type][i][0] >= this._data[type][nextI][0]
      ) {
        this._data.asks = this._data.bids = []
        throw new Error("Orderbook is corrupt")
      }

      if (!currentLevel) {
        currentLevel = levels.shift() || []
      } else {
        i = nextI
      }

      const [price, size] = currentLevel

      if (!this._data[type][i] || this._data[type][i][0] > price) {
        const idx = type === "asks" ? i : i + 1
        this._insertLevel(type, idx, price, size)
        currentLevel = undefined
      } else if (this._data[type][i][0] === price) {
        this._updateOrRemoveLevel(type, i, price, size)
        currentLevel = undefined
        if (size !== 0 || type !== "asks") {
          i = nextI
        }
      }
    }
  }

  update(updateData: BookUi1Data): void {
    if (
      !this._data.asks ||
      !this._data.asks.length ||
      !this._data.bids ||
      !this._data.bids.length
    ) {
      return
    }
    try {
      if (updateData.asks && updateData.asks.length > 0) {
        this._updateSide("asks", updateData.asks)
      }
      if (updateData.bids && updateData.bids.length > 0) {
        this._updateSide("bids", updateData.bids, this._data.bids.length - 1)
      }
    } catch (e) {
      throw e
    }
  }

  get = (): BookUi1Data => {
    return this._data
  }
}
