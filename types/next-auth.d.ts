// Type definitions for the authentication system

import { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Extends the built-in session type with custom fields
   * Note: Tokens are kept in JWT only (server-side), not exposed to client
   */
  interface Session {
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
      roleId: string
      userTypeId: number
      twoFactorEnabled: boolean
      companyId: string
      providerId?: string
    } & DefaultSession["user"]
  }

  /**
   * Extends the built-in user type
   */
  interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    roleId: string
    userTypeId: number
    twoFactorEnabled: boolean
    companyId: string
    providerId?: string
    accessToken: string
    refreshToken: string
    tokenExpiresAt: number
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the built-in JWT type
   */
  interface JWT {
    id: string
    email: string
    firstName: string
    lastName: string
    roleId: string
    userTypeId: number
    twoFactorEnabled: boolean
    companyId: string
    providerId?: string
    accessToken: string
    refreshToken: string
    tokenExpiresAt: number
  }
}
