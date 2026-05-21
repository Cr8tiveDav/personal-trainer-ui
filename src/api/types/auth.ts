export type AdminLoginPayload = {
  email: string
  password: string
}

export type AuthUser = {
  name?: string
  email?: string
  avatar_url?: string | null
  user_type?: string
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
