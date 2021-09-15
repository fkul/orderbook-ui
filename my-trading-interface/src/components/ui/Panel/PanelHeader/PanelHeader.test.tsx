import { render, screen } from "@testing-library/react"
import PanelHeader from "./PanelHeader"

describe("PanelHeader", () => {
  it("renders correctly", () => {
    render(<PanelHeader title="Panel header test" />)
    const element = screen.getByText(/panel header test/i)
    expect(element).toBeInTheDocument()
  })
})
