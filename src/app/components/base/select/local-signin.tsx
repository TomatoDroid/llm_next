import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { GlobeAltIcon } from "@heroicons/react/24/outline"
import { Fragment } from "react"

type ISelectProps = {
  items: Array<{ value: string, name: string }>
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export default function LocaleSigninSelect({
  items,
  value,
  onChange
}: ISelectProps) {
  const item = items.find(item => item.value === value)
  return (
    <div className="w-56 text-right">
      <Menu as={"div"} className={"relative inline-block text-left"}>
        <MenuButton className={`justify-center inline-flex w-full items-center rounded-lg border border-components-button-secondary-border px-[10px] py-[6px] text-[13px] font-medium text-text-primary hover:bg-state-base-hover`}>
          <GlobeAltIcon className="size-5 mr-1" aria-hidden="true" />
          {item?.name}
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className={"absolute right-0 z-10 mt-2 w-[200px] origin-top-right divide-y divide-divider-regular rounded-xl border-[0.5px] border-components-panel-border bg-components-panel-bg-blur shadow-lg focus:outline-none "}>
            <div className="max-h-[96px] overflow-y-auto px-1 py-1 [mask-image:linear-gradient(to_bottom,transparent_0px,black_8px,black_calc(100%-8px),transparent_100%)]">
              {
                items.map(item => (
                  <MenuItem key={item.value}>
                    <button className="group flex w-full items-center rounded-lg px-3 py-2 text-sm text-text-secondary data-[active]:bg-state-base-active"
                      onClick={(evt) => {
                        evt.preventDefault();
                        onChange && onChange(item.value);
                      }}
                    >
                      {item.name}
                    </button>
                  </MenuItem>
                ))
              }
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}