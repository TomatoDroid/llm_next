import classNames from "@/utils/classNames";
import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformation2Fill,
} from "@remixicon/react";
import { ReactNode, useEffect, useState } from "react";
import { createContext, useContext } from "use-context-selector";

export type IToastProps = {
  type?: "success" | "error" | "warning" | "info";
  size?: "md" | "sm";
  duration?: number;
  message: string;
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
  customComponents?: ReactNode;
};
type IToastContext = {
  notify: (props: IToastProps) => void;
  close: VoidFunction;
};

export type ToastHandle = {
  clear?: VoidFunction;
};

export const ToastContext = createContext<IToastContext>({} as IToastContext);
export const useToastContext = () => useContext(ToastContext);

const Toast = ({
  type = "info",
  size = "md",
  message,
  children,
  className,
  customComponents,
}: IToastProps) => {
  const { close } = useToastContext();
  if (typeof message !== "string") return null;

  return (
    <div
      className={classNames(
        className,
        "fixed z-[9999] mx-8 my-4 w-[360px] grow overflow-hidden rounded-xl",
        size === "md" ? "p-3" : "p-2",
        "border border-components-panel-border-subtle bg-components-panel-bg-blur shadow-sm",
        "top-0",
        "right-0"
      )}
    >
      <div
        className={`${classNames(
          "absolute inset-0 -z-10 opacity-40",
          type === "success" && "bg-toast-warning-bg",
          type === "error" && "bg-toast-error-bg",
          type === "warning" && "bg-toast-warning-bg",
          type === "info" && "bg-toast-info-bg"
        )}`}
      />
      <div className={`flex ${size === "md" ? "gap-1" : "gap-0.5"}`}>
        <div
          className={`flex items-center justify-center ${
            size === "md" ? "p-0.5" : "p-1"
          }`}
        >
          {type === "success" && (
            <RiCheckboxCircleFill
              className={`${
                size === "md" ? "size-5" : "size-4"
              } text-text-success`}
              aria-hidden="true"
            />
          )}
          {type === "error" && (
            <RiErrorWarningFill
              className={`${
                size === "md" ? "size-5" : "size-4"
              } text-text-destructive`}
              aria-hidden="true"
            />
          )}
          {type === "warning" && (
            <RiAlertFill
              className={`${
                size === "md" ? "size-5" : "size-4"
              } text-text-warning-secondary`}
              aria-hidden="true"
            />
          )}
          {type === "info" && (
            <RiInformation2Fill
              className={`${
                size === "md" ? "size-5" : "size-4"
              } text-text-accent`}
              aria-hidden="true"
            />
          )}
        </div>
        <div
          className={`flex py-1 ${
            size === "md" ? "px-1" : "px-0.5"
          } grow flex-col items-start gap-1`}
        >
          <div>
            <div>{message}</div>
            {customComponents}
          </div>
          {children && <div>{children}</div>}
        </div>
        {(<RiCloseLine className="size-4" />)}
      </div>
    </div>
  );
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const placeholder: IToastProps = {
    type: "info",
    message: "Toast message",
    duration: 6000,
  };
  const [params, setParams] = useState<IToastProps>(placeholder);
  const defaultDuration =
    params.type === "success" || params.type === "info" ? 3000 : 6000;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      setTimeout(() => {
        setMounted(false);
      }, params.duration || defaultDuration);
    }
  }, [defaultDuration, mounted, params.duration]);

  return (
    <ToastContext.Provider
      value={{
        notify: (props) => {
          setMounted(true);
          setParams(props);
        },
        close: () => {
          setMounted(false);
        },
      }}
    >
      {mounted && <Toast {...params} />}
      {children}
    </ToastContext.Provider>
  );
};

export default Toast;
