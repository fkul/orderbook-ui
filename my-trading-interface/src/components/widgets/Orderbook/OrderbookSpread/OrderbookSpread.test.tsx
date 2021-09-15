import { render, screen } from "@testing-library/react"
import OrderbookSpread from "./OrderbookSpread"

describe("OrderbookSpread", () => {
  it("renders correctly", () => {
    render(<OrderbookSpread spread={1.5} spreadPercentage={100} />)
    const element = screen.getByText(/spread: 1.5 \(100.00%\)/i)
    expect(element).toBeInTheDocument()
  })
})
