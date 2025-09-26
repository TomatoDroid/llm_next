import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Toast, { ToastProvider, useToastContext } from ".";
import "@testing-library/jest-dom";
import React, { ReactNode } from "react";
import { noop } from "lodash-es";

// Mock timers for testing timeouts
jest.useFakeTimers();

const TestComponent = () => {
  const { close, notify } = useToastContext();

  return (
    <div>
      <button
        onClick={() =>
          notify({ message: "Notification message", type: "info" })
        }
      >
        Show Toast
      </button>
      <button onClick={close}>Close Toast</button>
    </div>
  );
};

describe("Toast", () => {
  describe("Toast Component", () => {
    test("render toast with correct type and message", () => {
      render(
        <ToastProvider>
          <Toast type="success" message="Success message" />
        </ToastProvider>
      );

      expect(screen.getByText("Success message")).toBeInTheDocument();
    });

    test("render toast with different types", () => {
      const { rerender } = render(
        <ToastProvider>
          <Toast type="success" message="Success message" />
        </ToastProvider>
      );
      expect(document.querySelector(".text-text-success")).toBeInTheDocument();

      rerender(
        <ToastProvider>
          <Toast type="error" message="Error message" />
        </ToastProvider>
      );
      expect(
        document.querySelector(".text-text-destructive")
      ).toBeInTheDocument();

      rerender(
        <ToastProvider>
          <Toast type="info" message="Info message" />
        </ToastProvider>
      );
      expect(document.querySelector(".text-text-accent")).toBeInTheDocument();

      rerender(
        <ToastProvider>
          <Toast type="warning" message="Warning message" />
        </ToastProvider>
      );
      expect(
        document.querySelector(".text-text-warning-secondary")
      ).toBeInTheDocument();
    });

    test("renders with custom component", () => {
      render(
        <ToastProvider>
          <Toast
            message="Message with custom component"
            customComponents={
              <span data-testid="custom-component">Custom</span>
            }
          />
        </ToastProvider>
      );
      expect(screen.getByTestId("custom-component")).toBeInTheDocument();
    });

    test("renders children content", () => {
      render(
        <ToastProvider>
          <Toast message="Message with children">
            <span>Addtional information</span>
          </Toast>
        </ToastProvider>
      );
      expect(screen.getByText("Addtional information")).toBeInTheDocument();
    });

    test("does not render close button when close is undefined", () => {
      const CustomToastContext = React.createContext({
        notify: noop,
        close: undefined,
      });
      const Wrapper = ({ children }: { children: ReactNode }) => (
        <CustomToastContext.Provider value={{ notify: noop, close: undefined }}>
          {children}
        </CustomToastContext.Provider>
      );
      render(
        <Wrapper>
          <Toast message="No close button" type="info" />
        </Wrapper>
      );
      expect(screen.getByText("No close button")).toBeInTheDocument();

      expect(
        document.querySelector(".size-4.shrink-0.text-text-tertiary")
      ).not.toBeInTheDocument();
    });
  });

  describe("ToastProvider and Context", () => {
    test("shows and hides toast using context", async () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );
      expect(
        screen.queryByText("Notification message")
      ).not.toBeInTheDocument();
      fireEvent.click(screen.getByText("Show Toast"));
      const toastElement = await screen.findByText("Notification message");
      expect(toastElement).toBeInTheDocument();
      fireEvent.click(screen.getByText("Close Toast"));
      expect(
        screen.queryByText("Notification message")
      ).not.toBeInTheDocument();
    });

    test("automatically hides toast after duration", async () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByText("Show Toast"));
      expect(screen.getByText("Notification message")).toBeInTheDocument();

      await jest.advanceTimersByTime(3000);

      await waitFor(() => {
        expect(
          screen.queryByText("Notification message")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Toast.notify static method", () => {
    test("creates and removes toast from DOM", async () => {
      Toast.notify({ message: "Static notification", type: "warning" });
      expect(
        await screen.findByText("Static notification")
      ).toBeInTheDocument();
      await jest.advanceTimersByTime(6000);
      await waitFor(() => {
        expect(
          screen.queryByText("Static notification")
        ).not.toBeInTheDocument();
      });
    });

    test("calls onClose callback after duration", async () => {
      const onCloseMock = jest.fn();
      Toast.notify({
        message: "Closing notifacation",
        type: "success",
        onClose: onCloseMock,
      });

      await jest.advanceTimersByTime(3000);

      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
