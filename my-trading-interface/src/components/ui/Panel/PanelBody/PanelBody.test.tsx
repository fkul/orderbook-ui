import { render, screen } from "@testing-library/react"
import PanelBody from "./PanelBody"

describe("PanelBody", () => {
  it("renders correctly", () => {
    render(<PanelBody>Panel body test</PanelBody>)
    const element = screen.getByText(/panel body test/i)
    expect(element).toBeInTheDocument()
  })
})
