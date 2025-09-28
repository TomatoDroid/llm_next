"use client"

import { useWorkspacesContext } from "@/app/context/workspace-context"
import classNames from "@/utils/classNames"
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react"
import { RiArrowDownSLine } from "@remixicon/react"
import { Fragment } from "react"

export default function WorkspaceSelector() {
  const { workspaces } = useWorkspacesContext()
  const currentWorkspace = workspaces.find(ws => ws.current)
  return (
    <Menu as={"div"} className={"min-h-0"}>
      {({ open }) => (
        <>
          <MenuButton className={`group flex w-full cursor-pointer items-center p-0.5 hover:bg-state-base-hover ${open && 'bg-state-base-hover'} rounded-[10px]`}>
            <div className="mr-1.5 flex h-6 w-6 shrink-0 items-center justify-center bg-components-icon-bg-blue-solid rounded-md text-[13px] max-[800px]:mr-0">
              <span className="h-6 bg-gradient-to-r from-components-avatar-shape-fill-stop-0 to-components-avatar-shape-fill-stop-100 bg-clip-text align-middle font-semibold uppercase leading-6 text-shadow-shadow-1 opacity-90">{currentWorkspace?.name[0].toLocaleUpperCase()}</span>
            </div>
            <div className="flex min-w-0 items-center">
              <div className="system-sm-medium min-w-0 max-w-[149px] truncate text-text-secondary max-[800px]:hidden">{currentWorkspace?.name}</div>
              <RiArrowDownSLine className="size-4 shrink-0 text-text-secondary" />
            </div>
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
            <MenuItems anchor="bottom start" className={classNames(
              "shadow-lg absolute left-[-15px] z-[1000] mt-1 flex max-h-[400px] w-[280px] flex-col items-start overflow-y-auto",
              "rounded-xl bg-components-panel-bg backdrop-blur-[5px]"
            )}>
              <div className="flex w-full flex-col items-start self-stretch rounded-xl border-[0.5px] border-components-panel-border p-1 pb-2 shadow-lg">
                <div className="flex items-start gap-2 self-stretch px-3 pb-[0.5] pt-1">
                  <span className="system-xs-medium-uppercase flex-1 text-text-tertiary">工作空间</span>
                </div>
                {
                  workspaces.map(ws => (
                    <div className="flex items-center gap-2 self-stretch rounded-lg py-1 pl-3 pr-2 hover:bg-state-base-hover" key={ws.id}>
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-components-icon-bg-blue-solid text-[13px]">
                        <span className='h-6 bg-gradient-to-r from-components-avatar-shape-fill-stop-0 to-components-avatar-shape-fill-stop-100 bg-clip-text align-middle font-semibold uppercase leading-6 text-shadow-shadow-1 opacity-90'>{ws?.name[0]?.toLocaleUpperCase()}</span>
                      </div>
                      <div className="system-md-regular line-clamp-1 grow cursor-pointer overflow-hidden text-ellipsis text-text-secondary">{ws.name}</div>
                    </div>
                  ))
                }
              </div>
            </MenuItems>
          </Transition>
        </>
      )
      }
    </Menu >
  )
}