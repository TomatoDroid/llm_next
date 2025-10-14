export type CommonResponse = {
  result: 'success' | 'error'
}

export type IWorkspace = {
  id: string
  name: string
  plan: string
  status: string
  created_at: number
  current: boolean
}

export type UserProfileResponse = {
  id: string
  name: string
  email: string
  avatar: string
  avatar_url: string | null
  is_password_set: boolean
  interface_language?: string
  interface_theme?: string
  timezone?: string
  last_login_at?: string
  last_active_at?: string
  last_login_ip?: string
  created_at?: string
}

export type UserProfileOriginResponse = {
  json: () => Promise<UserProfileResponse>
  bodyUsed: boolean
  headers: any
}
