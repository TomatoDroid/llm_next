import { useAppContext } from "@/app/context/app-context";
import { logout } from "@/service/common";
import classNames from "@/utils/classNames";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { RiAccountCircleLine, RiArrowRightUpLine, RiLogoutBoxLine, RiSettings3Line, RiTShirt2Line } from "@remixicon/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import Avatar from "../../base/avatar";
import ThemeSwitcher from "../../base/theme-switcher";

export default function AppSelect() {
  const router = useRouter()
  const itemsClassName = "flex items-center w-full h-8 pl-3 text-text-secondary system-md-regular rounded-lg hover:bg-state-base-hover cursor-pointer gap-1"
  const { userProfile } = useAppContext()

  async function handleLogout() {
    await logout({
      url: "/logout",
      params: {}
    })

    localStorage.removeItem('setup_status')
    localStorage.removeItem('console_token')
    localStorage.removeItem('refresh_token')

    router.push("/signin")
  }

  return (
    <div className="">
      <Menu as={"div"} className={"relative inline-block text-left"}>
        {
          ({ open }) => (
            <>
              <MenuButton className={classNames("inline-flex items-center rounded-[20px] p-0.5 hover:bg-background-default-dodge", open && "bg-background-default-dodge")}>
                <Avatar avatar={userProfile.avatar_url} name={userProfile.name} size={36} />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveTo="transform opacity-100 scale-100"
                leaveFrom="transform opacity-0 scale-95"
              >
                <MenuItems className={"absolute right-0 mt-1.5 w-60 max-w-80 origin-top-right divide-y divide-divider-subtle rounded-xl bg-components-panel-bg-blur shadow-lg backdrop-blur-sm focus:outline-none"}>
                  <div className="px-1 py-1">
                    <MenuItem disabled>
                      <div className="flex flex-nowrap items-center py-2 pl-3 pr-2">
                        <div className="grow">
                          <div className="break-all text-text-primary system-md-medium">
                            <div>{userProfile.name}</div>
                            <div className="system-xs-regular break-all text-text-tertiary">{userProfile.email}</div>
                          </div>
                        </div>
                        <Avatar name={userProfile.name} avatar={userProfile.avatar_url} size={36} />
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        className={classNames(itemsClassName)}
                        href={"/account"}
                        target="_self"
                        rel="noopener noreferrer"
                      >
                        <RiAccountCircleLine className="size-4 shrink-0 text-text-tertiary" />
                        <div className="system-md-regular grow px-1 text-text-secondary">账户</div>
                        <RiArrowRightUpLine className="size-[14px] shrink-0 text-text-tertiary" />
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <div className={classNames(itemsClassName)}>
                        <RiSettings3Line className="size-4 shrink-0 text-text-tertiary" />
                        <div className="system-md-regular grow px-1 text-text-secondary">
                          设置
                        </div>
                      </div>
                    </MenuItem>
                  </div>
                  <MenuItem disabled>
                    <div className="p-1">
                      <div className={classNames(itemsClassName, "hover:bg-transparent")}>
                        <RiTShirt2Line className="size-4 shrink-0 text-text-tertiary" />
                        <div className="system-md-regular grow px-1 text-text-secondary">主题</div>
                        <ThemeSwitcher />
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className="p-1" onClick={handleLogout}>
                      <div className={classNames(itemsClassName, "group justify-between")}>
                        <RiLogoutBoxLine className="size-4 shrink-0 text-text-tertiary" />
                        <div className="system-md-regular grow px-1 text-text-secondary">登出</div>
                      </div>
                    </div>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </>
          )
        }
      </Menu>
    </div>
  )
}