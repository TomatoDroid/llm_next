"use client";
import Button from "@/app/components/base/button";
import Input from "@/app/components/base/input";
import Toast from "@/app/components/base/toast";
import { login } from "@/service/common";
import { noop } from "lodash-es";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MailAndPasswordAuth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleEmailPAsswordLogin = async () => {
    try {
      setIsLoading(true)
      const loginData: Record<string, unknown> = {
        email,
        password,
        language: '',
        remember_me: true
      }
      const res = await login({
        url: '/login',
        body: loginData,
      })
      if (res.result === "success") {
        Toast.notify({
          type: "success",
          message: "登录成功",
        })
        localStorage.setItem("console_token", res.data.access_token)
        localStorage.setItem("refresh_token", res.data.refresh_token)
        router.replace("/apps")
      } else {
        Toast.notify({
          type: "error",
          message: res.data,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={noop}>
      <div className="mb-3">
        <label htmlFor="email" className="system-md-semibold my-2 text-text-secondary">
          邮件
        </label>
        <div className="mt-1">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            autoComplete="email"
            placeholder="请输入邮件地址"
            tabIndex={1}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="my-2 flex items-center justify-between">
          <span className="system-md-semibold text-text-secondary">密码</span>
          <Link
            href={"/forget"}
            className="system-xs-regular text-components-button-secondary-accent-text"
          >忘记密码</Link>
        </label>
        <div className="relative mt-1">
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEmailPAsswordLogin()
              }
            }}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="请输入密码"
            tabIndex={2}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button type="button" variant={"ghost"} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '👀' : '😝'}
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <Button
          tabIndex={2}
          variant={"primary"}
          onClick={handleEmailPAsswordLogin}
          className="w-full"
          disabled={isLoading || !email || !password}
        >
          登录
        </Button>
      </div>
    </form>
  )
}
