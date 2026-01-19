import { auth } from "./auth"

/**
 * Get the current user's access token from the session
 * This should be used in API routes and server components
 */
export async function getServerSession() {
  return await auth()
}

/**
 * Get the current user's access token
 * Throws an error if user is not authenticated
 */
export async function getAccessToken(): Promise<string> {
  const session = await auth()
  
  if (!session?.accessToken) {
    throw new Error("No access token available. User may not be authenticated.")
  }
  
  return session.accessToken
}

/**
 * Get the current user's session data including tokens
 * Returns null if user is not authenticated
 */
export async function getUserSession() {
  const session = await auth()
  
  if (!session) {
    return null
  }
  
  return {
    user: session.user,
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    tokenExpiresAt: session.tokenExpiresAt,
  }
}
