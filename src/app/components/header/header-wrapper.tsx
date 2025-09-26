"use client"

import classNames from "@/utils/classNames";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderWrapper({ children }: React.PropsWithChildren) {
  const pathname = usePathname()
  const isBordered = ['/apps', "datasets/create", "/tool"].includes(pathname)
  return (
    <div className={classNames(
      "sticky left-0 right-0 z-[15] flex min-h-[56px] shrink-0 grow-0 basis-auto flex-col",
      isBordered ? "border-b border-divider-regular" : ''
    )}>
      {children}
    </div>
  )
}