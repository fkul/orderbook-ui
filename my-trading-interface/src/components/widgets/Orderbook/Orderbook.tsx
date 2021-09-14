import React, { useState, useEffect, useMemo } from "react"
import throttle from "lodash/throttle"
import { useMediaQuery } from "react-responsive"
import { useCfWs, BookUi1Data } from "@fkul/react-cf-ws-api"
import Panel from "@/components/ui/Panel"
import { OrderbookLevel } from "@/types/OrderbookLevel"
import OrderbookSideSide from "./OrderbookSide"
import OrderbookSpread from "./OrderbookSpread"
import {
  OrderbookWrapper,
  SpreadWrapperDesktop,
  SpreadWrapperMobile,
} from "./Orderbook.styles"

interface OrderbookProps {
  maxLevelCountDesktop?: number
  maxLevelCountMobile?: number
  throttleWaitMs?: number
}

const Orderbook = ({
  maxLevelCountDesktop = 16,
  maxLevelCountMobile = 12,
  throttleWaitMs = 200,
}: OrderbookProps) => {
  const [book, setBook] = useState<BookUi1Data | null>(null)

  const ws = useCfWs()
  useEffect(() => {
    ws.subscribePub("book_ui_1", ["PI_XBTUSD"], onOrderbookUpdateThrottled)
  }, [])

  const onOrderbookUpdate = (data: BookUi1Data) => {
    setBook({
      asks: data.asks,
      bids: data.bids,
      feed: data.feed,
      productId: data.productId,
      numLevels: data.numLevels,
    })
  }

  const onOrderbookUpdateThrottled = useMemo(
    () => throttle(onOrderbookUpdate, throttleWaitMs),
    [throttleWaitMs]
  )

  const analyzeOrders = (rawOrders: number[][], maxLevelCount: number) => {
    const orders: OrderbookLevel[] = []
    let totalSize = 0

    for (let i = 0; i < rawOrders.length && i < maxLevelCount; i++) {
      totalSize += rawOrders[i][1]
      orders.push({
        price: rawOrders[i][0],
        size: rawOrders[i][1],
        total: totalSize,
      })
    }

    return orders
  }

  const calcSpread = (
    lowestAsk: OrderbookLevel,
    highestBid: OrderbookLevel
  ): number | null =>
    lowestAsk && highestBid ? lowestAsk.price - highestBid.price : null

  const calcSpreadPercentage = (
    spread: number,
    lowestAsk: OrderbookLevel
  ): number | null => (lowestAsk ? (spread / lowestAsk.price) * 100 : null)

  const isMobile = useMediaQuery({ query: "(max-width: 480px)" })
  const maxLevelCount = isMobile ? maxLevelCountMobile : maxLevelCountDesktop
  const bids = book ? analyzeOrders(book.bids, maxLevelCount) : []
  const asks = book ? analyzeOrders(book.asks, maxLevelCount) : []
  const maxTotal = Math.max(
    bids[bids.length - 1]?.total || 0,
    asks[asks.length - 1]?.total || 0
  )
  const spread = calcSpread(asks[0], bids[0])
  const spreadPercentage = calcSpreadPercentage(spread || 0, asks[0])

  return (
    <Panel>
      <Panel.Header title="Orderbook">
        {spread && spreadPercentage && (
          <SpreadWrapperDesktop>
            <OrderbookSpread
              spread={spread}
              spreadPercentage={spreadPercentage}
            />
          </SpreadWrapperDesktop>
        )}
      </Panel.Header>
      <Panel.Body>
        <OrderbookWrapper>
          <OrderbookSideSide
            type="bids"
            sortedOrders={bids}
            maxTotal={maxTotal}
          />
          {spread && spreadPercentage && (
            <SpreadWrapperMobile>
              <OrderbookSpread
                spread={spread}
                spreadPercentage={spreadPercentage}
              />
            </SpreadWrapperMobile>
          )}
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
