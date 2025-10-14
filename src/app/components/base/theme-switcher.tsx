import classNames from "@/utils/classNames"
import { RiComputerLine, RiMoonLine, RiSunLine } from "@remixicon/react"
import { useTheme } from "next-themes"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex items-center rounded-[10px] bg-components-segmented-control-bg-normal p-0.5">
      <div className={classNames(
        "rounded-lg px-2 py-1 text-text-tertiary hover:bg-state-base-hover hover:text-text-secondary",
        theme === "system" && "bg-components-segmented-control-item-active-bg text-text-accent-light-mode-only shadow-sm hover:bg-components-segmented-control-item-active-bg hover:text-text-accent-light-mode-only"
      )}
        onClick={() => setTheme("system")}
      >
        <div className="p-0.5">
          <RiComputerLine className="size-4" />
        </div>
      </div>
      <div className={classNames("h-[14px] w-px bg-transparent")}></div>
      <div className={classNames(
        "rounded-lg px-2 py-1 text-text-tertiary hover:bg-state-base-hover hover:text-text-secondary",
        theme === "light" && "bg-components-segmented-control-item-active-bg text-text-accent-light-mode-only shadow-sm hover:bg-components-segmented-control-item-active-bg hover:text-text-accent-light-mode-only"
      )}
        onClick={() => setTheme("light")}
      >
        <div className="p-0.5">
          <RiSunLine className="size-4" />
        </div>
      </div>
      <div></div>
      <div className={classNames(
        "rounded-lg px-2 py-1 text-text-tertiary hover:bg-state-base-hover hover:text-text-secondary",
        theme === "dark" && "bg-components-segmented-control-item-active-bg text-text-accent-light-mode-only shadow-sm hover:bg-components-segmented-control-item-active-bg hover:text-text-accent-light-mode-only"
      )}
        onClick={() => setTheme("dark")}
      >
        <div className="p-0.5">
          <RiMoonLine className="size-4" />
        </div>
      </div>
    </div >
  )
}