import React, { useState, useEffect, useMemo, useRef } from "react"
import throttle from "lodash/throttle"
import {
  useCfWs,
  CfWsMessage,
  BookUi1Data,
  ReadyState,
} from "@fkul/react-cf-ws-api"
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
  throttleWaitMs = 100,
  maxLevelCountDesktop = 16,
  maxLevelCountMobile = 12,
}: OrderbookProps) => {
  const [book, setBook] = useState<BookUi1Data | null>(null)
  const [shouldReconnect, setShouldReconnect] = useState<boolean>(false)
  const maxLevelCount = useRef<number>(maxLevelCountDesktop)
  const productIdRef = useRef<ProductId>(productId)
  const ws = useCfWs()

  useEffect(() => {
    if (isVisible && !shouldReconnect) {
      subscribe(productId)
    } else if (book) {
      setShouldReconnect(true)
      unsubscribe(productId)
    }
  }, [isVisible])

  useEffect(() => {
    if (book && book.productId !== productId) {
      unsubscribe(book.productId as ProductId)
      subscribe(productId)
    }
  }, [productId])

  useEffect(() => {
    maxLevelCount.current = isMobile
      ? maxLevelCountMobile
      : maxLevelCountDesktop
  }, [isMobile])

  useEffect(() => {
    if (book) {
      console.log(`Changing throttle wait to ${throttleWaitMs}ms`)
      ws.updateSubscription(FEED, onOrderbookUpdateThrottled)
    }
  }, [throttleWaitMs])

  useEffect(() => {
    return () => {
      unsubscribe(productId)
      onOrderbookUpdateThrottled.cancel()
    }
  }, [])

  const subscribe = (productId: ProductId) => {
    console.log(`Subscribing to ${FEED}: ${productId}`)
    productIdRef.current = productId
    ws.subscribePub(FEED, [productId], onOrderbookUpdateThrottled)
  }

  const unsubscribe = (productId: ProductId) => {
    console.log(`Unsubscribing from ${FEED}: ${productId}`)
    ws.unsubscribePub(FEED, [productId])
    setBook(null)
  }

  const onOrderbookUpdate = (message: CfWsMessage) => {
    const subscriptionStatus = ws.getSubscriptionStatus(FEED)
    if (
      message.readyState !== ReadyState.OPEN ||
      subscriptionStatus !== "subscribed"
    ) {
      setBook(null)
    } else if (message.data) {
      setBook({
        asks: message.data.asks.slice(0, maxLevelCount.current),
        bids: message.data.bids.slice(0, maxLevelCount.current),
        feed: message.data.feed,
        productId: message.data.productId,
        numLevels: message.data.numLevels,
      })
    }

    if (subscriptionStatus === "subscribed_failed") {
      unsubscribe(productIdRef.current)
      setTimeout(() => subscribe(productIdRef.current), 3000)
    }
  }

  const onOrderbookUpdateThrottled = useMemo(
    () => throttle(onOrderbookUpdate, throttleWaitMs),
    [throttleWaitMs]
  )

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

  const bids = book ? analyzeOrders(book.bids) : []
  const asks = book ? analyzeOrders(book.asks) : []
  const maxTotal = Math.max(
    bids[bids.length - 1]?.total || 0,
    asks[asks.length - 1]?.total || 0
  )

  return (
    <Panel>
      <Panel.Header title="Orderbook">
        {!isMobile && (
          <SpreadWrapperDesktop>
            <OrderbookSpread asks={asks} bids={bids} />
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
            <>
              <OrderbookSideSide
                type="bids"
                sortedOrders={bids}
                maxTotal={maxTotal}
              />
              {isMobile && (
                <SpreadWrapperMobile>
                  <OrderbookSpread asks={asks} bids={bids} />
                </SpreadWrapperMobile>
              )}
              <OrderbookSideSide
                type="asks"
                sortedOrders={asks}
                maxTotal={maxTotal}
              />
            </>
          )}
        </OrderbookWrapper>
      </Panel.Body>
    </Panel>
  )
}

export default withWidgetProvider(Orderbook, true)
