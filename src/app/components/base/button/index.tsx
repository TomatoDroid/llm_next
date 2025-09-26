import cn from '@/utils/classNames';
import { cva, type VariantProps } from "class-variance-authority";
import React, { CSSProperties } from "react";
import Spinner from '../spinner';
import './index.css';


const buttonVariants = cva(
  'btn disabled:btn-disabled',
  {
    variants: {
      variant: {
        'primary': 'btn-primary',
        'warning': 'btn-warning',
        'secondary': 'btn-secondary',
        'secondary-accent': 'btn-secondary-accent',
        'ghost': 'btn-ghost',
        'ghost-accent': 'btn-ghost-accent',
        'tertiary': 'btn-tertiary',
      },
      size: {
        small: 'btn-small',
        medium: 'btn-medium',
        large: 'btn-large',
      }
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'medium',
    },
  })

export type ButtonProps = {
  destructive?: boolean;
  loading?: boolean;
  styleCss?: CSSProperties;
  spinnerClassName?: string;
  ref?: React.Ref<HTMLButtonElement>
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

const Button = ({
  destructive,
  loading,
  styleCss,
  spinnerClassName,
  children,
  variant,
  ref,
  size,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        destructive && "btn-destructive",
      )}
      ref={ref}
      style={styleCss}
      {...props}
    >
      {children}
      {loading && <Spinner loading={loading} className={cn('!ml-1 !h-3 !w-3 !border-2 !text-white', spinnerClassName)}></Spinner>}
    </button>)
}

Button.displayName = "Button"

export default Button
export { Button, buttonVariants };
