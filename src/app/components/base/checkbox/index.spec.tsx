import { fireEvent, render, screen } from "@testing-library/react"
import CheckBox from "."

describe("CheckBox Component", () => {
  const mockProps = {
    id: 'test'
  }

  it("renders unchecked checkbox by default", () => {
    render(<CheckBox  {...mockProps} />)
    const checkbox = screen.getByTestId("checkbox-test")
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toHaveClass("bg-components-checkbox-bg")
  })

  it("renders checked checkbox when checked prop is true", () => {
    render(<CheckBox checked {...mockProps} />)
    const checkbox = screen.getByTestId("checkbox-test")
    expect(checkbox).toHaveClass("bg-components-checkbox-bg")
    expect(checkbox).toBeInTheDocument()
  })

  it("renders indeterminate checkbox when indeterminate prop is true", () => {
    render(<CheckBox indeterminate {...mockProps} />)
    const checkbox = screen.getByTestId("checkbox-test")
    expect(screen.getByTestId('indeterminate-icon')).toBeInTheDocument()
  })

  it("handles click event when not disabled", () => {
    const onCheck = jest.fn()
    render(<CheckBox {...mockProps} onChange={onCheck} />)
    fireEvent.click(screen.getByTestId("checkbox-test"))
    expect(onCheck).toHaveBeenCalledTimes(1)
  })

  it("does not handle click event when disabled", () => {
    const onCheck = jest.fn()
    render(<CheckBox {...mockProps} disabled onChange={onCheck} />)
    fireEvent.click(screen.getByTestId("checkbox-test"))
    expect(onCheck).not.toHaveBeenCalled()
    expect(screen.getByTestId("checkbox-test")).toHaveClass("cursor-not-allowed")
  })

  it("applies custom className when provided", () => {
    const customClass = "custom-class"
    render(<CheckBox {...mockProps} className={customClass} />)
    expect(screen.getByTestId("checkbox-test")).toHaveClass(customClass)
  })

  it("applies correct styles for disabled checked state", () => {
    render(<CheckBox {...mockProps} checked disabled />)
    expect(screen.getByTestId("checkbox-test")).toHaveClass(
      "bg-components-checkbox-bg-disabled-checked"
    )
    expect(screen.getByTestId("checkbox-test")).toHaveClass(
      "cursor-not-allowed"
    )
  })

  it("applies correct styles for disabled unchecked state", () => {
    render(<CheckBox {...mockProps} disabled />)
    expect(screen.getByTestId("checkbox-test")).toHaveClass(
      "bg-components-checkbox-bg-disabled"
    )
    expect(screen.getByTestId("checkbox-test")).toHaveClass(
      "cursor-not-allowed"
    )
  })
})