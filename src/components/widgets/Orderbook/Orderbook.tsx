import Panel from "@/components/ui/Panel"
import { OrderbookLevel } from "@/types/OrderbookLevel"
import OrderbookSideSide from "./OrderbookSide"
import OrderbookSpread from "./OrderbookSpread"
import { OrderbookWrapper, HeaderSpreadWrapper } from "./Orderbook.styles"

interface OrderbookProps {
  maxOrderCount?: number
}

const Orderbook = ({ maxOrderCount = 16 }: OrderbookProps) => {
  const book = {
    numLevels: 25,
    feed: "book_ui_2_snapshot",
    bids: [
      [45196.0, 120.0],
      [45195.5123, 8568.0],
      [45192.0, 5766.0],
      [45190.0, 2204.0],
      [45185.0, 5000.0],
      [45183.0, 42816.0],
      [45181.0, 96814.0],
      [45179.0, 4317.0],
      [45177.0, 184785.0],
      [45174.0, 10024.0],
      [45172.0, 11890.0],
      [45171.0, 58472.0],
      [45170.0, 20000.0],
      [45166.0, 6909.0],
      [45161.0, 7500.0],
      [45159.0, 3129.0],
      [45157.0, 1931.0],
      [45153.0, 2500.0],
      [45150.0, 30000.0],
      [45145.0, 170005.0],
      [45144.0, 20000.0],
      [45143.0, 36022.0],
      [45138.0, 6042.0],
      [45137.0, 315941.0],
      [45136.0, 270000.0],
    ],
    asks: [
      [45205.0, 110.0],
      [45206.0, 1981.0],
      [45208.0, 3166.0],
      [45210.0, 3633.0],
      [45213.0, 8424.0],
      [45214.0, 285.0],
      [45217.0, 2500.0],
      [45219.0, 21085.0],
      [45221.0, 1120.0],
      [45222.0, 6725.0],
      [45226.0, 115794.0],
      [45228.0, 4236.0],
      [45229.0, 5250.0],
      [45231.0, 6055.0],
      [45234.0, 5000.0],
      [45235.0, 28000.0],
      [45236.0, 10038.0],
      [45237.0, 285528.0],
      [45239.0, 20000.0],
      [45240.0, 5000.0],
      [45241.0, 20000.0],
      [45242.0, 1086.0],
      [45243.0, 6042.0],
      [45244.0, 2627.0],
      [45245.0, 2500.0],
    ],
    product_id: "PI_XBTUSD",
  }

  const analyzeOrders = (rawOrders: number[][], maxOrderCount: number) => {
    const orders: OrderbookLevel[] = []
    let totalSize = 0

    for (let i = 0; i < rawOrders.length && i < maxOrderCount; i++) {
      totalSize += rawOrders[i][1]
      orders.push({
        price: rawOrders[i][0],
        size: rawOrders[i][1],
        total: totalSize,
      })
    }

    return orders
  }

  const bids = analyzeOrders(book.bids, maxOrderCount)
  const asks = analyzeOrders(book.asks, maxOrderCount)
  const maxTotal = Math.max(
    bids[bids.length - 1]?.total || 0,
    asks[asks.length - 1]?.total || 0
  )
  const spread = asks[0].price - bids[0].price
  const spreadPercentage = (spread / asks[0].price) * 100

  return (
    <Panel>
      <Panel.Header title="Orderbook">
        <HeaderSpreadWrapper>
          <OrderbookSpread
            spread={spread}
            spreadPercentage={spreadPercentage}
          />
        </HeaderSpreadWrapper>
      </Panel.Header>
      <Panel.Body>
        <OrderbookWrapper>
          <OrderbookSideSide
            type="bids"
            sortedOrders={bids}
            maxTotal={maxTotal}
          />
          <OrderbookSideSide
            type="asks"
            sortedOrders={asks}
            maxTotal={maxTotal}
          />
        </OrderbookWrapper>
      </Panel.Body>
    </Panel>
  )
}

export default Orderbook
