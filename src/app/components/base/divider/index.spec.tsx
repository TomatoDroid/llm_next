import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import Divider from "."

describe("divider component", () => {
  test("render with default props", () => {
    const { container } = render(<Divider />)
    const divider = container.firstChild as HTMLElement
    expect(divider).toHaveClass("w-full h-[0.5px] my-2")
    expect(divider).toHaveClass("bg-divider-regular")
  })

  test("render horizontal solid divider correctly", () => {
    const { container } = render(<Divider type={"horizontal"} bgStyle={"solid"} />)
    const divider = container.firstChild as HTMLElement
    expect(divider).toHaveClass("w-full h-[0.5px] my-2")
    expect(divider).toHaveClass("bg-divider-regular")
  })

  test("render vertical solid divider correctly", () => {
    const { container } = render(<Divider type={"vertical"} bgStyle={"solid"} />)
    const divider = container.firstChild as HTMLElement
    expect(divider).toHaveClass("w-[1px] h-full mx-2")
    expect(divider).toHaveClass("bg-divider-regular")
  })

  test("render horizontal gradient divider correctly", () => {
    const { container } = render(<Divider type={"horizontal"} bgStyle={"gradient"} />)
    const divider = container.firstChild as HTMLElement
    expect(divider).toHaveClass("w-full h-[0.5px] my-2")
    expect(divider).toHaveClass("bg-gradient-to-r from-divider-regular to-background-gradient-mask-transparent")
  })

  test("render vertical gradient divider correctly", () => {
    const { container } = render(<Divider type={"vertical"} bgStyle={"gradient"} />)
    const divider = container.firstChild as HTMLElement
    expect(divider).toHaveClass("w-[1px] h-full mx-2")
    expect(divider).toHaveClass("bg-gradient-to-r from-divider-regular to-background-gradient-mask-transparent")
  })

  test("applies custom classname correctly", () => {
    const customClass = 'test-custom-class'
    const { container } = render(<Divider className={customClass} />)
    const divider = container.firstChild as HTMLElement
    expect(divider).toHaveClass(customClass)
    expect(divider).toHaveClass("w-full h-[0.5px] my-2")
  })

  test("applies custom styles correctly", () => {
    const customStyle = { margin: "10px" }
    const { container } = render(<Divider styleCss={customStyle} />)
    const divider = container.firstChild as HTMLElement
    expect(divider).toHaveStyle("margin: 10px")
  })
})