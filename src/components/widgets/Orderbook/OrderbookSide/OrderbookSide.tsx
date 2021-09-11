import React from "react"
import type { OrderbookLevel } from "@/types/OrderbookLevel"
import {
  Grid,
  HeaderPrice,
  HeaderSize,
  HeaderTotal,
  RowDepth,
  RowPrice,
  RowSize,
  RowTotal,
} from "./OrderbookSide.styles"

interface OrderbookSideProps {
  type: "asks" | "bids"
  sortedOrders: OrderbookLevel[]
  maxTotal: number
}

const OrderbookSide = ({
  type,
  sortedOrders,
  maxTotal,
}: OrderbookSideProps) => {
  return (
    <Grid className={type}>
      <HeaderPrice>Price</HeaderPrice>
      <HeaderSize>Size</HeaderSize>
      <HeaderTotal>Total</HeaderTotal>
      {sortedOrders.map((order, index) => {
        const rowNumber = index + 2
        return (
          <React.Fragment key={order.price}>
            <RowDepth row={rowNumber} width={order.total / maxTotal} />
            <RowPrice row={rowNumber}>
              {order.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </RowPrice>
            <RowSize row={rowNumber}>{order.size.toLocaleString()}</RowSize>
            <RowTotal row={rowNumber}>{order.total.toLocaleString()}</RowTotal>
          </React.Fragment>
        )
      })}
    </Grid>
  )
}

export default OrderbookSide
