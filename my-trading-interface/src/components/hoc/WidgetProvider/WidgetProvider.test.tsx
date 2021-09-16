import { Widget } from "@/types/Widget"
import { render, screen } from "@testing-library/react"
import { withWidgetProvider } from "./WidgetProvider"

const TestComponent = ({ isVisible, isMobile }: Widget) => (
  <div>
    TEST {typeof isVisible} {typeof isMobile}
  </div>
)
const WrappedTestComponent = withWidgetProvider(TestComponent)

describe("WidgetProvider", () => {
  it("renders children", () => {
    render(<WrappedTestComponent />)
    const element = screen.getByText(/test/i)
    expect(element).toBeInTheDocument()
  })

  it("injects isVisible and isMobile", () => {
    render(<WrappedTestComponent />)
    const element = screen.getByText(/test boolean boolean/i)
    expect(element).toBeInTheDocument()
  })
})
