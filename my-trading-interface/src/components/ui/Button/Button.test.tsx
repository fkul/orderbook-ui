import { render, fireEvent, screen } from "@testing-library/react"
import Button from "./Button"

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Button test</Button>)
    const element = screen.getByText(/button test/i)
    expect(element).toBeInTheDocument()
  })

  it("executes onClick callback", () => {
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Button click test</Button>)
    fireEvent.click(screen.getByText(/button click test/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
