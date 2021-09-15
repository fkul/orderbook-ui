import { render, screen } from "@testing-library/react"
import Panel from "./Panel"

describe("Panel", () => {
  it("renders correctly", () => {
    render(<Panel>Panel test</Panel>)
    const element = screen.getByText(/panel test/i)
    expect(element).toBeInTheDocument()
  })

  it("renders correctly with header", () => {
    render(
      <Panel>
        <Panel.Header title="Panel with header test" />
      </Panel>
    )
    const element = screen.getByText(/panel with header test/i)
    expect(element).toBeInTheDocument()
  })

  it("renders correctly with body", () => {
    render(
      <Panel>
        <Panel.Body>Panel with body test</Panel.Body>
      </Panel>
    )
    const element = screen.getByText(/panel with body test/i)
    expect(element).toBeInTheDocument()
  })
})
