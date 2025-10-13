import classNames from "@/utils/classNames";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { GroupIcon } from "./plugins-icon";

interface PluginsNavProps {
  className?: string;
}
export const PluginsNav = ({
  className
}: PluginsNavProps) => {
  const selectedSegment = useSelectedLayoutSegment()
  const activated = selectedSegment === "plugins"
  return (
    <Link href={"/plugins"} className={classNames(
      "group", //TODO
      className
    )}>
      <div className={classNames(
        "system-sm-medium relative flex h-8 flex-row items-center justify-center gap-0.5 rounded-xl border border-transparent p-1.5",
        activated && "border-components-main-nav-nav-button-border bg-components-main-nav-nav-button-bg-active text-components-main-nav-nav-button-text shadow-md",
        !activated && "text-text-tertiary hover:bg-state-base-hover hover:text-text-secondary",
        activated && "border-components-panel-border-subtle"
      )}>
        <div className="mr-0.5 flex size-5 items-center justify-center">
          <GroupIcon className="h-4 w-4" />
        </div>
        <span className="px-0.5">插件</span>
      </div>
    </Link>
  )
}