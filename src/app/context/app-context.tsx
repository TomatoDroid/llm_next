"use client"
import { fetchUserProfile } from "@/service/common"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import useSWR from "swr"
import { UserProfileResponse } from "../models/common"

export type AppContextValue = {
  userProfile: UserProfileResponse
}
const userProfilePlaceholder = {
  id: "",
  name: "",
  email: "",
  avatar: "",
  avatar_url: "",
  is_password_set: false,
}

const AppContext = createContext<AppContextValue>({
  userProfile: userProfilePlaceholder,
})

export function AppContextProvider({ children }: React.PropsWithChildren) {
  const { data: userProfileResponse, mutate: mutateUserProfile, error: userProfileError } = useSWR({ url: "/account/profile", params: {} }, fetchUserProfile)
  const [userProfile, setUserProfile] = useState<UserProfileResponse>(userProfilePlaceholder)

  const updateUserProfileAndVersion = useCallback(async () => {
    if (userProfileResponse) {
      try {
        const result = await userProfileResponse.json()
        setUserProfile(result)
      } catch (error) {
        setUserProfile(userProfilePlaceholder)
      }
    }
  }, [userProfileResponse])

  useEffect(() => {
    updateUserProfileAndVersion()
  }, [userProfileResponse])

  return (
    <AppContext value={{
      userProfile
    }}>
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="relative flex grow flex-col overflow-y-auto overflow-x-hidden bg-background-body">
          {children}
        </div>
      </div>
    </AppContext>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider")
  }
  return context
}