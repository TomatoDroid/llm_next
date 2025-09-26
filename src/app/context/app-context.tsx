"use client"
import { createContext, useContext } from "react"

const AppContext = createContext({})

export function AppContextProvider({ children }: React.PropsWithChildren) {
  return (
    <AppContext value={{}}>
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="relative flex grow flex-col overflow-y-auto overflow-x-hidden bg-background-body">
          {children}
        </div>
      </div>
    </AppContext>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider")
  }
  return context
}