import Header from "./_header";

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background-default-burn w-full justify-center p-6">
      <div className="flex flex-col w-full items-center rounded-2xl border border-effects-highlight bg-background-default-subtle">
        <Header />
        <div className="flex w-full flex-col grow items-center justify-center px-6">
          <div className="flex flex-col w-[400px]">
            {children}
          </div>
        </div>
        <div className="system-xs-regular px-8 py-6 text-text-tertiary">
          © {new Date().getFullYear()} LangGenius, Inc. All rights reserved.
        </div>
      </div>
    </div>
  )
}