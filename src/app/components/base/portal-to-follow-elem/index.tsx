"use client"
import classNames from "@/utils/classNames"
import { autoUpdate, flip, FloatingPortal, offset, OffsetOptions, Placement, shift, size, useDismiss, useFloating, useFocus, useHover, useInteractions, useMergeRefs, useRole } from "@floating-ui/react"
import React, { cloneElement, createContext, HTMLProps, isValidElement, RefObject, useCallback, useContext, useMemo, useState } from "react"

export type PortalToFollowElemOptions = {
  placement?: Placement
  open?: boolean
  offset?: number | OffsetOptions
  onOpenChange?: (open: boolean) => void
  triggerPopupSameWidth?: boolean
}

export function usePortalToFollowElem({
  placement = "bottom",
  open: controlledOpen,
  offset: offsetValue = 0,
  onOpenChange: setControlledOpen,
  triggerPopupSameWidth
}: PortalToFollowElemOptions) {
  const [localOpen, setLocalOpen] = useState(false)
  const open = controlledOpen ?? localOpen
  const handleOpenChange = useCallback((newOpen: boolean) => {
    setLocalOpen(newOpen)
    setControlledOpen?.(newOpen)
  }, [setLocalOpen, setControlledOpen])

  const data = useFloating({
    placement,
    open,
    onOpenChange: handleOpenChange,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "start",
        padding: 5
      }),
      shift({ padding: 5 }),
      size({
        apply({ rects, elements }) {
          if (triggerPopupSameWidth) {
            elements.floating.style.width = `${rects.reference.width}px`
          }
        }
      })
    ]
  })

  const context = data.context

  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen === undefined
  })
  const focus = useFocus(context, {
    enabled: controlledOpen === undefined
  })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: "tooltip" })

  const interactions = useInteractions([hover, focus, dismiss, role])

  return useMemo(() => ({
    open,
    setOpen: handleOpenChange,
    ...interactions,
    ...data
  }), [open, handleOpenChange, interactions, data])
}

type ContextType = ReturnType<typeof usePortalToFollowElem> | null

const PortalToFollowElemContext = createContext<ContextType>(null)

export function usePortalToFollowElemContext() {
  const context = useContext(PortalToFollowElemContext)
  if (!context) {
    throw new Error("usePortalToFollowElem must be used within a PortalToFollowElemProvider")
  }
  return context
}

export function PortalToFollowElem({
  children,
  ...options
}: { children: React.ReactNode } & PortalToFollowElemOptions) {
  const tooltip = usePortalToFollowElem(options)
  return (
    <PortalToFollowElemContext.Provider value={tooltip}>
      {children}
    </PortalToFollowElemContext.Provider>
  )
}

export const PortalToFollowElemTrigger = ({
  ref: propRef,
  children,
  asChild = false,
  ...props
}: HTMLProps<HTMLElement> & { ref?: RefObject<HTMLElement>, asChild?: boolean }) => {
  const context = usePortalToFollowElemContext()
  const childrenRef = (children as any).props?.ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed"
      } as HTMLProps<HTMLElement>)
    )
  }
  return (
    <div ref={ref} className={classNames('inline-block', classNames)} data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </div>
  )
}

PortalToFollowElemTrigger.displayName = 'PortalToFollowElemTrigger'

export const PortalToFollowElemContent = ({
  ref: propRef,
  style,
  ...props
}: HTMLProps<HTMLDivElement> & { ref?: RefObject<HTMLDivElement> }) => {
  const context = usePortalToFollowElemContext()
  const ref = useMergeRefs([context.refs.setFloating, propRef])

  if (!context.open) {
    return null
  }
  const body = document.body

  return (
    <FloatingPortal root={body}>
      <div
        ref={ref}
        style={{
          ...context.floatingStyles,
          ...style,
          visibility: context.middlewareData.hide?.referenceHidden ? 'hidden' : 'visible',
        }}
        {...context.getFloatingProps(props)}
      />
    </FloatingPortal>
  )
}

PortalToFollowElemContent.displayName = 'PortalToFollowElemContent'
