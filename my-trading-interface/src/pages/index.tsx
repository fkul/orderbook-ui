import { useState } from "react"
import type { NextPage } from "next"
import { css } from "linaria"
import { usePageVisibility } from "react-page-visibility"
import Button from "@/components/ui/Button"
import Orderbook from "@/components/widgets/Orderbook"
import { ProductId } from "@/types/ProductId"

const Home: NextPage = () => {
  const [productId, setProductId] = useState<ProductId>(ProductId.PI_XBTUSD)
  const isPageVisible = usePageVisibility()

  const toggler = css`
    margin: 20px;
    text-align: center;
  `

  const toggleOrderBookFeed = () => {
    setProductId(
      productId === ProductId.PI_XBTUSD
        ? ProductId.PI_ETHUSD
        : ProductId.PI_XBTUSD
    )
  }

  return (
    <div>
      <Orderbook productId={productId} isVisible={isPageVisible} />
      <div className={toggler}>
        <Button onClick={toggleOrderBookFeed}>Toggle Feed</Button>
      </div>
    </div>
  )
}

export default Home
