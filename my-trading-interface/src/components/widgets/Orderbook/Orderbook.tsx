import React, { Profiler, useState, useEffect, useMemo, useRef } from "react"
import throttle from "lodash/throttle"
import { useAvg } from "@fkul/avg"
import { useCfWs, BookUi1Data } from "@fkul/react-cf-ws-api"
import { withWidgetProvider } from "@/components/hoc/WidgetProvider"
import Button from "@/components/ui/Button"
import Loader from "@/components/ui/Loader"
import Panel from "@/components/ui/Panel"
import { OrderbookLevel } from "@/types/OrderbookLevel"
import { ProductId } from "@/types/ProductId"
import { Widget } from "@/types/Widget"
import OrderbookSideSide from "./OrderbookSide"
import OrderbookSpread from "./OrderbookSpread"
import {
  OrderbookWrapper,
  SpreadWrapperDesktop,
  SpreadWrapperMobile,
} from "./Orderbook.styles"

interface OrderbookProps extends Widget {
  productId: ProductId
  maxLevelCountDesktop?: number
  maxLevelCountMobile?: number
}

const FEED = "book_ui_1"

const Orderbook = ({
  productId,
  isVisible = true,
  isMobile = false,
  maxLevelCountDesktop = 16,
  maxLevelCountMobile = 12,
}: OrderbookProps) => {
  const [book, setBook] = useState<BookUi1Data | null>(null)
  const [shouldReconnect, setShouldReconnect] = useState<boolean>(false)
  const [throttleWaitMs, setThrottleWaitMs] = useState<number>(100)
  const maxLevelCount = useRef<number>(maxLevelCountDesktop)
  const avg = useAvg()
  const ws = useCfWs()

  useEffect(() => {
    if (isVisible && !shouldReconnect) {
      if (book && book.productId !== productId) {
        unsubscribe(book.productId as ProductId)
      }
      subscribe(productId)
    } else if (book) {
      setShouldReconnect(true)
      unsubscribe(productId)
    }
  }, [isVisible, productId])

  useEffect(() => {
    maxLevelCount.current = isMobile
      ? maxLevelCountMobile
      : maxLevelCountDesktop
  }, [isMobile])

  useEffect(() => {
    return () => {
      unsubscribe(productId)
      onOrderbookUpdateThrottled.cancel()
    }
  }, [])

  const subscribe = (productId: ProductId) => {
    console.log(`Subscribing to ${FEED}: ${productId}`)
    ws.subscribePub(FEED, [productId], onOrderbookUpdateThrottled)
  }

  const unsubscribe = (productId: ProductId) => {
    console.log(`Unsubscribing from ${FEED}: ${productId}`)
    ws.unsubscribePub(FEED, [productId])
    setBook(null)
  }

  const onOrderbookUpdate = (data: BookUi1Data) => {
    setBook({
      asks: data.asks.slice(0, maxLevelCount.current),
      bids: data.bids.slice(0, maxLevelCount.current),
      feed: data.feed,
      productId: data.productId,
      numLevels: data.numLevels,
    })
  }

  const onOrderbookUpdateThrottled = useMemo(
    () => throttle(onOrderbookUpdate, throttleWaitMs),
    [throttleWaitMs]
  )

  const onProfilerRender = (
    id: string,
    phase: "mount" | "update",
    actualDuration: number
  ) => {
    avg.add(actualDuration)
    const newThrottleWaitMs = Math.max(100, Math.floor(avg.get() / 10) * 100)

    if (
      avg.getCount() >= 100 &&
      Math.abs(newThrottleWaitMs - throttleWaitMs) >= 100
    ) {
      console.log(`Changing throttle wait to ${newThrottleWaitMs}ms`)
      setThrottleWaitMs(newThrottleWaitMs)
      ws.updateSubscription(FEED, onOrderbookUpdateThrottled)
    }
  }

  const onReconnectClick = () => {
    setShouldReconnect(false)
    subscribe(productId)
  }

  const analyzeOrders = (rawOrders: number[][]) => {
    const orders: OrderbookLevel[] = []
    let totalSize = 0

    for (let i = 0; i < rawOrders.length; i++) {
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

  const bids = book ? analyzeOrders(book.bids) : []
  const asks = book ? analyzeOrders(book.asks) : []
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
          {!book ? (
            shouldReconnect ? (
              <Button onClick={onReconnectClick}>Reconnect</Button>
            ) : (
              <Loader />
            )
          ) : (
            <Profiler id="Orderbook" onRender={onProfilerRender}>
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
            </Profiler>
          )}
        </OrderbookWrapper>
      </Panel.Body>
    </Panel>
  )
}

export default withWidgetProvider(Orderbook)
