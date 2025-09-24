import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { PortalToFollowElem, PortalToFollowElemContent, PortalToFollowElemTrigger } from "."

describe("PortalToFollowElem", () => {
  describe("Context and Provider", () => {
    test("should throw error when using context outside of provider", () => {
      const originalError = console.error
      console.error = jest.fn()

      expect(() => {
        render(<PortalToFollowElemTrigger>Trigger</PortalToFollowElemTrigger>)
      }).toThrow("usePortalToFollowElem must be used within a PortalToFollowElemProvider")

      console.error = originalError
    })

    test("should not throw when used within provider", () => {
      expect(() => {
        render(
          <PortalToFollowElem>
            <PortalToFollowElemTrigger>Trigger</PortalToFollowElemTrigger>
          </PortalToFollowElem>
        )
      }).not.toThrow()
    })
  })

  describe("PortalToFollowElemTrigger", () => {
    test("should render children correctly", () => {
      render(
        <PortalToFollowElem>
          <PortalToFollowElemTrigger>Trigger</PortalToFollowElemTrigger>
        </PortalToFollowElem>
      )
      screen.debug()
      expect(screen.queryByText("Trigger")).toBeInTheDocument()
    })

    test("should handle asChild prop correctly", () => {
      const { getByRole } = render(
        <PortalToFollowElem>
          <PortalToFollowElemTrigger asChild>
            <button>Button Trigger</button>
          </PortalToFollowElemTrigger>
        </PortalToFollowElem>
      )
      expect(getByRole("button")).toHaveTextContent("Button Trigger")
    })
  })

  describe("PortalToFollowElemContent", () => {
    test("should not render content when close", () => {
      const { queryByText } = render(
        <PortalToFollowElem>
          <PortalToFollowElemTrigger>Trigger</PortalToFollowElemTrigger>
          <PortalToFollowElemContent>Popup Content</PortalToFollowElemContent>
        </PortalToFollowElem>
      )
      expect(queryByText("Popup Content")).not.toBeInTheDocument()
    })

    test("should render content when open", () => {
      const { queryByText } = render(
        <PortalToFollowElem open>
          <PortalToFollowElemTrigger>Trigger</PortalToFollowElemTrigger>
          <PortalToFollowElemContent>Popup Content</PortalToFollowElemContent>
        </PortalToFollowElem>
      )
      expect(queryByText("Popup Content")).toBeInTheDocument()
    })
  })

  describe("Controlled behavior", () => {
    test("should call onOpenChange when interaction happens", () => {
      const onOpenChange = jest.fn()
      const {getByText} = render(
        <PortalToFollowElem onOpenChange={onOpenChange}>
          <PortalToFollowElemTrigger>Hover Me</PortalToFollowElemTrigger>
          <PortalToFollowElemContent>Popup Content</PortalToFollowElemContent>
        </PortalToFollowElem>
      )
      fireEvent.mouseEnter(getByText("Hover Me"))
      expect(onOpenChange).toHaveBeenCalled()
      fireEvent.mouseLeave(getByText("Hover Me"))
      expect(onOpenChange).toHaveBeenCalled()
    })
  })
})