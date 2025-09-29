import classNames from "@/utils/classNames"
import { RiArrowLeftLine } from "@remixicon/react"
import Link from "next/link"
import { ReactNode, useState } from "react"
import NavSelector, { INavSelectorProps } from "./nav-selector"

type INavProps = {
  icon: ReactNode,
  activeIcon: ReactNode,
  text: string,
  activeSegment: string | string[]
  link: string
  isApp: boolean
} & INavSelectorProps

const Nav = ({
  text,
  activeIcon,
  icon,
  activeSegment,
  link,
  isApp,
  createText,
  curNav,
  navigationItems,
  onCreate,
  onLoadMore
}: INavProps) => {
  const [hovered, setHovered] = useState(false)
  const isActivated = true
  return (
    <div className={classNames(
      "flex h-8 max-w-[670px] shrink-0 items-center rounded-xl px-0.5 text-sm font-medium max-[1024px]:max-w-[400px]",
      isActivated && "bg-components-main-nav-nav-button-bg-active font-semibold shadow-md",
      !isActivated && "hover:bg-components-main-nav-nav-button-bg-hover"
    )}>
      <Link href={""}>
        <div
          onClick={() => { }}
          className={classNames(
            "flex h-7 cursor-pointer items-center rounded-[10px] px-2.5",
            isActivated ? "text-components-main-nav-nav-button-text-active" : "text-components-main-nav-nav-button-text",
            isActivated && "hover:bg-components-main-nav-nav-button-bg-active-hover"
          )}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div>
            {
              hovered ? <RiArrowLeftLine className="size-4" /> : (isActivated ? activeIcon : icon)
            }
          </div>
          <div className="ml-2 max-[1024px]:hidden">
            {text}
          </div>
        </div>
      </Link>
      {
        !isActivated && (
          <>
            <div className="font-light text-divider-deep">/</div>
            <NavSelector
              isApp={isApp}
              curNav={curNav}
              navigationItems={navigationItems}
              createText={createText}
              onCreate={onCreate}
              onLoadMore={onLoadMore}
            />
          </>
        )
      }
    </div>
  )
}

export default Nav