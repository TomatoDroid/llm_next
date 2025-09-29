import classNames from "@/utils/classNames"
import { RiPlanetFill, RiPlanetLine } from "@remixicon/react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

type ExploreNavProps = {
  className?: string
}

export default function ExploreNav({ className }: ExploreNavProps) {
  const selectedSegment = useSelectedLayoutSegment()
  const activated = selectedSegment === "explore"

  return (
    <Link href={"/explore/apps"}
      className={classNames(
        className,
        'group',
        activated && "bg-components-main-nav-nav-button-bg-active shadow-md",
        activated ? "text-components-main-nav-nav-button-text-active" : "text-components-main-nav-nav-button-text hover:bg-components-main-nav-nav-button-bg-hover"
      )}
    >
      {activated
        ? <RiPlanetFill className="size-4" />
        : <RiPlanetLine className="size-4" />
      }
      <div className="ml-2 max-[1024px]:hidden">
        探索
      </div>
    </Link>
  )
}