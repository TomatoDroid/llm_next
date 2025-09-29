import classNames from "@/utils/classNames";
import { RiHammerFill, RiHammerLine } from "@remixicon/react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type ToolsNavProps = {
  className?: string;
}
export default function ToolsNav({ className }: ToolsNavProps) {
  const segment = useSelectedLayoutSegment()
  const activated = segment === "tools"
  return (
    <Link href={"/tools"} className={classNames(
      "group text-sm font-medium",
      activated && "hover:bg-components-main-nav-nav-button-bg-active-hover bg-components-main-nav-nav-button-bg-active font-semibold shadow-md",
      activated ? "text-components-main-nav-nav-button-text-active" : "text-components-main-nav-nav-button-text hover:text-components-main-nav-nav-button-text-hover",
      className
    )}>
      {
        activated ? <RiHammerFill className="size-4" /> : <RiHammerLine className="size-4" />
      }
      <div className="ml-2 max-[1024px]:hidden">工具</div>
    </Link>
  )
}