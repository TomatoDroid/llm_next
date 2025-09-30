"use client"
import useTheme from "@/app/hooks/use-theme";
import classNames from "@/utils/classNames";
import { cva, VariantProps } from "class-variance-authority";

export type LogoSize = "small" | "medium" | "large";
export type LogoStyle = "default" | "monochromeWhite"

export const logoPathMap: Record<LogoStyle, string> = {
  default: '/logo/logo.svg',
  monochromeWhite: '/logo/logo-monochrome-white.svg',
}

const logoVariants = cva("", {
  variants: {
    size: {
      large: "w-16 h-7",
      medium: "w-12 h-[22px]",
      small: "w-9 h-4"
    },
  },
  defaultVariants: {
    size: "medium"
  }
})

type DifyLogoProps = {
  style?: LogoStyle
  size?: LogoSize
  className?: string
}

export default function DifyLogo({
  style = "default",
  size = "medium",
  className
}: DifyLogoProps & VariantProps<typeof logoVariants>) {
  const { theme } = useTheme()
  const themeStyle = (theme === "dark" && style === "default") ? "monochromeWhite" : style
  return (
    <img
      src={`${logoPathMap[themeStyle]}`}
      className={classNames("block object-contain", logoVariants({ size }), className)}
      alt="Dify Logo"
    />
  )
}