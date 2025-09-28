"use client"
import { Theme } from "@/app/types/apps";
import { RiCheckLine, RiComputerLine, RiMoonLine, RiSunLine } from "@remixicon/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import ActionButton from "../action-button";
import { PortalToFollowElem, PortalToFollowElemContent, PortalToFollowElemTrigger } from "../portal-to-follow-elem";

// 创建一个可复用的主题选项组件
interface ThemeOptionProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}
const ThemeOption = ({ icon, label, isActive, onClick }: ThemeOptionProps) => (
  <button
    className="flex w-full items-center gap-1 rounded-lg px-2 py-1.5 text-text-secondary hover:bg-state-base-hover"
    onClick={onClick}
  >
    {icon}
    <div className="flex grow items-center justify-start px-1">
      <span className="system-md-regular">{label}</span>
    </div>
    {isActive && (
      <div className="flex size-4 shrink-0 items-center justify-center">
        <RiCheckLine className="size-4 text-text-accent" />
      </div>
    )}
  </button>
);
export default function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const handleThemeChange = (theme: Theme) => {
    console.log("Changing theme to:", theme)
    setTheme(theme)
    setOpen(false)
  }

  function getCurrentIcon() {
    switch (theme) {
      case "light":
        return <RiSunLine className="size-4 text-text-tertiary" />;
      case "dark":
        return <RiMoonLine className="size-4 text-text-tertiary" />;
      default:
        return <RiComputerLine className="size-4 text-text-tertiary" />;
    }
  }

  return (
    <PortalToFollowElem
      open={open}
      onOpenChange={setOpen}
      placement="bottom-end"
      offset={{ mainAxis: 8 }}
    >
      <PortalToFollowElemTrigger onClick={() => setOpen(!open)}>
        <ActionButton className={`size-8 p-[6px] ${open && "bg-state-base-hover"}`}>
          {getCurrentIcon()}
        </ActionButton>
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent className="z-1000">
        <div className="flex w-[144px] flex-col items-start rounded-xl border-[0.5px] border-components-panel-border bg-components-panel-bg-blur p-1 shadow-lg">
          <ThemeOption
            icon={<RiSunLine className='h-4 w-4 text-text-tertiary' />}
            label="浅色"
            isActive={theme === "light"}
            onClick={() => handleThemeChange("light")}
          />
          <ThemeOption
            icon={<RiMoonLine className='h-4 w-4 text-text-tertiary' />}
            label="深色"
            isActive={theme === "dark"}
            onClick={() => handleThemeChange("dark")}
          />
          <ThemeOption
            icon={<RiComputerLine className='h-4 w-4 text-text-tertiary' />}
            label="自动"
            isActive={theme === "system"}
            onClick={() => handleThemeChange("system")}
          />
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  )
}
