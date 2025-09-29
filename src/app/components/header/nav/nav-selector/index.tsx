import classNames from "@/utils/classNames"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { RiArrowDownSLine } from "@remixicon/react"

export type NavItem = {
  id: string
  name: string
  link: string
  icon_type: string
  icon: string
  icon_background: string
  icon_url: string
  mode?: string
}

export type INavSelectorProps = {
  navigationItems: NavItem[]
  curNav?: Omit<NavItem, 'link'>
  createText: string
  isApp?: boolean
  onCreate: (state: string) => void
  onLoadMore?: () => void
}

const NavSelector = ({ }: INavSelectorProps) => {
  return (
    <Menu as={"div"} className={"relative"}>
      {({ open }) => (
        <>
          <MenuButton className={classNames(
            "hover:bg-components-main-nav-nav-button-bg-active-hover group inline-flex h-7 w-full items-center justify-center rounded-[10px] pl-2 pr-2.5 text-[14px] font-semibold text-components-main-nav-nav-button-text-active",
            open && "bg-components-main-nav-nav-button-bg-active"
          )}>
            <div className="max-w-[157px] truncate" title="chatFlow">chatFlow</div>
            <RiArrowDownSLine className={classNames(
              "ml-1 size-3 shrink-0 opacity-50 group-hover:opacity-100",
              open && "!opacity-100"
            )}
              aria-hidden="true"
            />
          </MenuButton>
          <MenuItems className={classNames(
            "absolute -left-11 right-0 mt-1.5 w-60 max-w-80",
            "origin-top-right divide-y divide-divider-regular rounded-lg bg-components-panel-bg-blur",
            "shadow-lg"
          )}>
            <div className="overflow-auto px-1 py-1 max-h-[50vh]" onScroll={() => { }}>
              {
                [<MenuItem>
                  <div className="flex w-full cursor-pointer items-center truncate rounded-lg px-3 py-[6px] text-[14px] font-normal text-text-secondary hover:bg-state-base-hover"
                    onClick={() => { }}
                  >
                    <div></div>
                    <div className="truncate">
                      chatFlow
                    </div>
                  </div>
                </MenuItem>,
                <MenuItem>
                  <div className="flex w-full cursor-pointer items-center truncate rounded-lg px-3 py-[6px] text-[14px] font-normal text-text-secondary hover:bg-state-base-hover"
                    onClick={() => { }}
                  >
                    <div></div>
                    <div className="truncate">
                      chatFlow
                    </div>
                  </div>
                </MenuItem>]
              }
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  )
}

export default NavSelector