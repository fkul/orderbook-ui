import { ProductId } from "@/types/ProductId"
import { render, screen, act } from "@testing-library/react"
import Orderbook from "./Orderbook"

describe("Orderbook", () => {
  it("renders correctly", async () => {
    await act(async () => render(<Orderbook productId={ProductId.PI_XBTUSD} />))
    const element = screen.getByText(/orderbook/i)
    expect(element).toBeInTheDocument()
  })
})
