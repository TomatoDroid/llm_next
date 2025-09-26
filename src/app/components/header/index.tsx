"use client"
import Link from "next/link";
import DifyLogo from "../base/logo/dify-logo";

export default function Header() {
  return (
    <div className="flex h-[56px] items-center">
      <div className="flex min-w-0 flex-[1] items-center pl-3 pr-2 min-[1280px]:pr-3">
        <Link href={"/apps"} className="flex h-8 shrink-0 items-center justify-center px-0.5">
          <DifyLogo />
        </Link>
        <div className="mx-1.5 shrink-0 font-light text-divider-deep">/</div>
      </div>
    </div>
  )
}