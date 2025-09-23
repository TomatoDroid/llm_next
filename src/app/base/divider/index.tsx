import classNames from "@/utils/classNames"
import { cva, VariantProps } from "class-variance-authority"
import { CSSProperties } from "react"

const dividerVariants = cva('', {
  variants: {
    type: {
      horizontal: "w-full h-[0.5px] my-2",
      vertical: "w-[1px] h-full mx-2"
    },
    bgStyle: {
      gradient: "bg-gradient-to-r from-divider-regular to-background-gradient-mask-transparent",
      solid: "bg-divider-regular"
    }
  },
  defaultVariants: {
    type: "horizontal",
    bgStyle: "solid"
  },
})

export type DividerProps = {
  className?: string
  styleCss?: CSSProperties
} & VariantProps<typeof dividerVariants>
const Divider = ({ type, bgStyle, className, styleCss }: DividerProps) => {
  return <div className={classNames(dividerVariants({ type, bgStyle }), className)} style={styleCss}></div>
}

export default Divider