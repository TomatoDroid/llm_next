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
      const { getByText } = render(
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

  describe("Configuration options", () => {
    test("should accept placement prop", () => {
      // 创建一个 mock 函数来监视 useFloating 的调用
      const useFloatingMock = jest.spyOn(require("@floating-ui/react"), "useFloating")

      // 渲染组件，传入 placement="top-start" 属性
      render(
        <PortalToFollowElem placement="top-start">
          <PortalToFollowElemTrigger>Trigger</PortalToFollowElemTrigger>
        </PortalToFollowElem>
      )

      // 验证 useFloating 函数是否被调用，并且接收了正确的 placement 参数
      expect(useFloatingMock).toHaveBeenCalledWith(
        expect.objectContaining({
          placement: "top-start"
        })
      )

      // 清理 mock，恢复原始函数
      useFloatingMock.mockRestore()
    })
  })
})