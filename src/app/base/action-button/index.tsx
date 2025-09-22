import classNames from "@/utils/classNames";
import { cva, VariantProps } from "class-variance-authority";
import { CSSProperties, Ref } from "react";


const actionButtonVariants = cva(
  'action-btn',
  {
    variants: {
      size: {
        xs: 'action-btn-xs',
        m: 'action-btn-m',
        l: 'action-btn-l',
        xl: 'action-btn-xl'
      },
      state: {
        destructive: 'action-btn-destructive',
        active: 'action-btn-active',
        disabled: 'action-btn-disabled',
        hover: 'action-btn-hover',
        default: '',
      }
    },
    defaultVariants: {
      size: 'm',
      state: 'default'
    }
  })

export type ActionButtonProps = {
  styleCss?: CSSProperties
  ref?: Ref<HTMLButtonElement>
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof actionButtonVariants>;
const ActionButton = ({ className, size, state, styleCss, ref, children, ...props }: ActionButtonProps) => {
  return <button type="button"
    className={
      classNames(
        actionButtonVariants({ size, className, state }),
      )}
    ref={ref} style={styleCss} {...props}>
    {children}
  </button>
}

ActionButton.displayName = "ActionButton";

export default ActionButton;
export { ActionButton, actionButtonVariants };
