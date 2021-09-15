import type { NextPage } from "next"
import { usePageVisibility } from "react-page-visibility"
import Orderbook from "@/components/widgets/Orderbook"

const Home: NextPage = () => {
  const isPageVisible = usePageVisibility()

  return (
    <div>
      <Orderbook isVisible={isPageVisible} />
    </div>
  )
}

export default Home
