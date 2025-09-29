"use client"
import { WorkspaceProvider } from "@/app/context/workspace-context";
import dynamic from "next/dynamic";
import Link from "next/link";
import WorkspaceSelector from "./account-dropdown/workspace-selector";
import AppNav from "./app-nav";
import DatasetNav from "./dataset-nav";
import ExploreNav from "./explore-nav";
import ToolsNav from "./tools-nav";

const DifyLogo = dynamic(() => import("../base/logo/dify-logo"), {
  ssr: false,
  loading: () => <div className="w-12 h-[22px] bg-transparent"></div>
});

const navClassName = "flex items-center relative px-3 h-8 rounded-xl font-medium text-sm cursor-pointer"
export default function Header() {
  return (
    <div className="flex h-[56px] items-center">
      <div className="flex min-w-0 flex-[1] items-center pl-3 pr-2 min-[1280px]:pr-3">
        <Link href={"/apps"} className="flex h-8 shrink-0 items-center justify-center px-0.5">
          <DifyLogo />
        </Link>
        <div className="mx-1.5 shrink-0 font-light text-divider-deep">/</div>
        <WorkspaceProvider>
          <WorkspaceSelector />
        </WorkspaceProvider>
      </div>
      <div className="flex items-center gap-2">
        <ExploreNav className={navClassName} />
        <AppNav />
        <DatasetNav />
        <ToolsNav className={navClassName} />
      </div>
      <div></div>
    </div>
  )
}