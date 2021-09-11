import { Spread } from "./OrderbookSpread.styles"

interface OrderbookSpreadProps {
  spread: number
  spreadPercentage: number
}

const OrderbookSpread = ({
  spread,
  spreadPercentage,
}: OrderbookSpreadProps) => {
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
