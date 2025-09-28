"use client"

import { createContext, useContext } from "use-context-selector"
import { IWorkspace } from "../models/common"

export type WorkspacesContextValue = {
  workspaces: IWorkspace[]
}

const WorkspacesContext = createContext<WorkspacesContextValue>({
  workspaces: []
})

export function WorkspaceProvider({ children }: React.PropsWithChildren) {
  const data = [{
    "id": "4aef6dbe-920d-40bd-a868-42cd55a99291",
    "name": "zhen's Workspace",
    "plan": "sandbox",
    "status": "normal",
    "created_at": 1757301028,
    "current": true
  }]
  return (
    <WorkspacesContext.Provider value={{
      workspaces: data || []
    }}>
      {children}
    </WorkspacesContext.Provider>
  )
}

export const useWorkspacesContext = () => {
  const context = useContext(WorkspacesContext)
  if (!context) {
    throw new Error("useWorkspacesContext must be used within a WorkspaceProvider")
  }
  return context
}