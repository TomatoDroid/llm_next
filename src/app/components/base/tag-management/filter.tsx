import { useState } from "react"
import { PortalToFollowElem, PortalToFollowElemContent, PortalToFollowElemTrigger } from "../portal-to-follow-elem"

type TagFilterProps = {
  type: "knowledge" | "app"
  value: string[]
  onChange: (value: string[]) => void
}
const TagFilter = ({
  type,
  value,
  onChange
}: TagFilterProps) => {
  const [open, setOpen] = useState(true)
  return (
    <PortalToFollowElem open={open} onOpenChange={setOpen} placement="bottom-start" offset={4}>
      <div className="relative">
        <PortalToFollowElemTrigger onClick={() => setOpen(!open)} className="">
          <div></div>
        </PortalToFollowElemTrigger>
        <PortalToFollowElemContent>
          <div></div>
        </PortalToFollowElemContent>
      </div>
    </PortalToFollowElem>
  )
}

export default TagFilter