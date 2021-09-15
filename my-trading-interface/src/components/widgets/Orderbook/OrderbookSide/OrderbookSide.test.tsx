import { render, screen } from "@testing-library/react"
import OrderbookSide from "./OrderbookSide"

describe("OrderbookSide", () => {
  it("renders correctly", () => {
    const testLevel = {
      price: 111,
      size: 222,
      total: 222,
    }
    render(
      <OrderbookSide
        type="asks"
        sortedOrders={[testLevel]}
        maxTotal={testLevel.total}
      />
    )
    const element = screen.getByText(/111.00/i)
    expect(element).toBeInTheDocument()
  })
})
