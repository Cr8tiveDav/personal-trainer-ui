export type LoginPayload = {
  email: string
  password: string
}

/** @deprecated Use LoginPayload */
export type AdminLoginPayload = LoginPayload

export type AuthUser = {
  name?: string
  email?: string
  avatar_url?: string | null
  user_type?: string
  id?: string
  trainer_id?: string
}

export type LoginResponse = {
  data: {
    access_token: string
    refresh_token: string
    expires_in: number
    user: AuthUser
  }
  message?: string
}
