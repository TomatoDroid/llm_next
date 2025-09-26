import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import Loading from "."

describe("Loading Component", () => {
  test("renders correctly with default props", () => {
    const { container } = render(<Loading />)
    expect(container.firstChild).toHaveClass("flex w-full justify-center items-center")
    expect(container.firstChild).not.toHaveClass("h-full")
  })

  test("renders correctly with area type", () => {
    const { container } = render(<Loading type="area" />)
    expect(container.firstChild).not.toHaveClass("h-full")
  })

  test("renders correctly with app type", () => {
    const { container } = render(<Loading type="app" />)
    expect(container.firstChild).toHaveClass("flex w-full justify-center items-center")
    expect(container.firstChild).toHaveClass("h-full")
  })

  test("contains SVG with spin-animation class", () => {
    const { container } = render(<Loading />)
    const svgElement = container.querySelector("svg")
    expect(svgElement).toHaveClass("spin-animation")
  })
})