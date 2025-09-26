"use client"
import { ReactNode } from "react";
import Header from "../components/header";
import HeaderWrapper from "../components/header/header-wrapper";
import { AppContextProvider } from "../context/app-context";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppContextProvider>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        {children}
      </AppContextProvider>
    </>
  )
}