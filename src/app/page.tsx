"use client";
import Button from "./base/button";
import Divider from "./base/divider";
import Input from "./base/input";
import Loading from "./base/loading";
import LocaleSigninSelect from "./base/select/local-signin";
import Spinner from "./base/spinner";
import ThemeSelector from "./base/theme-selector";
import Toast, { ToastProvider } from "./base/toast";

export default function Home() {
  const local = [{ value: "zh-CN", name: "简体中文" }, { value: "en-US", name: "English" }, { value: "ja-JP", name: "日本語" }];
  return (
    <div className="font-sans flex flex-col min-h-screen gap-16 px-10 py-3 bg-background-default-burn">
      <main className="flex flex-col gap-[32px] row-start-2 items-start">
        <Loading />
        <div className="flex gap-1 items-center h-5">
          <LocaleSigninSelect items={local} value="zh-CN" onChange={(val) => { console.log(val) }} />
          <Divider type={"vertical"} />
          <ThemeSelector />
        </div>
        <ToastProvider >
          <Toast
            message="message"
            type="success"
            onClose={() => { }}
          >
          </Toast>
        </ToastProvider>
        <Input className="w-full max-w-[500px]" />
        <Spinner loading></Spinner>
        <Button
          onClick={() => {
            Toast.notify({
              type: "error",
              message: "按钮点击了",
            });
          }}
        >
          按钮
        </Button>
      </main>
    </div>
  );
}
