"use client"
import dynamic from "next/dynamic";
import Divider from "../base/divider";
import LocaleSigninSelect from "../base/select/local-signin";

const DifyLogo = dynamic(() => import("@/app/base/logo/dify-logo"), {
  ssr: false,
  loading: () => <div className="w-16 h-7 bg-transparent"></div>
})

const ThemeSelector = dynamic(() => import('@/app/base/theme-selector'), {
  ssr: false,
  loading: () => <div className='size-8 bg-transparent' />,
})

export default function Header() {
  const local = [{ value: "zh-CN", name: "简体中文" }, { value: "en-US", name: "English" }, { value: "ja-JP", name: "日本語" }];
  return (
    <div className="flex w-full items-center justify-between p-5">
      <DifyLogo size="large" />
      <div className="flex items-center gap-1">
        <LocaleSigninSelect items={local} value="zh-CN" onChange={(val) => { console.log(val) }} />
        <Divider type='vertical' className='mx-0 ml-2 h-4' />
        <ThemeSelector />
      </div>
    </div>
  )
}