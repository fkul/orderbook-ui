import { render, screen } from "@testing-library/react"
import Layout from "./Layout"

describe("Layout", () => {
  it("renders correctly", () => {
    render(<Layout>Layout test</Layout>)
    const element = screen.getByText(/layout test/i)
    expect(element).toBeInTheDocument()
  })
})
