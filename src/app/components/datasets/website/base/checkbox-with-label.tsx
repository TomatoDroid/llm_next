import CheckBox from "@/app/components/base/checkbox"
import Tooltip from "@/app/components/base/tooltip"
import classNames from "@/utils/classNames"

type Props = {
  className?: string
  isChecked: boolean
  onChange: (isChecked: boolean) => void
  label: string
  labelClassName?: string
  tooltip?: string
}
const CheckboxWithLabel = ({
  className,
  isChecked,
  onChange,
  label,
  labelClassName,
  tooltip
}: Props) => {
  return (
    <label className={classNames("flex items-center h-7 gap-2", className)}>
      <CheckBox checked={isChecked} onChange={() => onChange(!isChecked)} />
      <div className={classNames("text-sm font-normal text-text-secondary", labelClassName)}>{label}</div>
      {
        tooltip && <Tooltip />
      }
    </label>
  )
}

export default CheckboxWithLabel