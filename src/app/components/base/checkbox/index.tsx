import classNames from "@/utils/classNames"
import { RiCheckLine } from "@remixicon/react"
import React from "react"
import IndeterminateIcon from "./assets/indeterminate-icon"

type CheckboxProps = {
  id?: string
  checked?: boolean
  onChange?: (event: React.MouseEvent<HTMLDivElement>) => void
  className?: string
  disabled?: boolean
  indeterminate?: boolean
}
const CheckBox = ({
  id,
  checked,
  onChange,
  className,
  disabled,
  indeterminate
}: CheckboxProps) => {
  const checkClassName = (checked || indeterminate)
    ? "bg-components-checkbox-bg text-components-checkbox-icon hover:bg-components-checkbox-bg-hover"
    : "border border-components-checkbox-border bg-components-checkbox-bg-unchecked hover:bg-components-checkbox-bg-unchecked-hover hover:border-components-checkbox-border-hover"

  const disabledClassName = (checked || indeterminate)
    ? "cursor-not-allowed bg-components-checkbox-bg-disabled-checked text-components-checkbox-icon-disabled hover:bg-components-checkbox-bg-disabled-checked"
    : "cursor-not-allowed border-components-checkbox-border-disabled bg-components-checkbox-bg-disabled hover:border-components-checkbox-border-disabled hover:bg-components-checkbox-bg-disabled"

  return (
    <div
      id={id}
      className={classNames(
        "flex size-4 cursor-pointer items-center justify-center rounded-[4px] shadow-xs shadow-shadow-shadow-3",
        checkClassName,
        disabled && disabledClassName,
        className
      )}
      onClick={(event) => {
        if (!disabled) {
          onChange?.(event)
        }
      }}
      data-testid={`checkbox-${id}`}
    >
      {!checked && indeterminate && <IndeterminateIcon />}
      {checked && <RiCheckLine className="size-3" data-testid={`check-icon-${id}`} />}
    </div>
  )
}

export default CheckBox