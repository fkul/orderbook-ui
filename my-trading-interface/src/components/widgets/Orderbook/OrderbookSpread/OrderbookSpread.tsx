import { OrderbookLevel } from "@/types/OrderbookLevel"
import { Spread } from "./OrderbookSpread.styles"

interface OrderbookSpreadProps {
  asks: OrderbookLevel[]
  bids: OrderbookLevel[]
}

const OrderbookSpread = ({ asks, bids }: OrderbookSpreadProps) => {
  const calcSpread = (
    lowestAsk: OrderbookLevel,
    highestBid: OrderbookLevel
  ): number | null =>
    lowestAsk && highestBid ? lowestAsk.price - highestBid.price : null

  const calcSpreadPercentage = (
    spread: number,
    lowestAsk: OrderbookLevel
  ): number | null => (lowestAsk ? (spread / lowestAsk.price) * 100 : null)

  const spread = calcSpread(asks[0], bids[0]) || 0
  const spreadPercentage = calcSpreadPercentage(spread, asks[0]) || 0

  const spreadStr = spread.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
  const spreadPercentageStr = spreadPercentage.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  })
  return (
    <Spread>
      Spread: {spreadStr} ({spreadPercentageStr}%)
    </Spread>
  )
}

export default OrderbookSpread
