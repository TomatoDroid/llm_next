"use client";
import Button from "./components/base/button";
import Divider from "./components/base/divider";
import Input from "./components/base/input";
import Loading from "./components/base/loading";
import LocaleSigninSelect from "./components/base/select/local-signin";
import Spinner from "./components/base/spinner";
import ThemeSelector from "./components/base/theme-selector";
import Toast, { ToastProvider } from "./components/base/toast";

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
