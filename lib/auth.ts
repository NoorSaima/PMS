import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Decode JWT to extract expiration time
function decodeJwtExpiration(token: string): number | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
    return decoded.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
  } catch (error) {
    return null;
  }
}

async function createNewToken(username: string, password: string) {
  const url = `${process.env.PUBLIC_API_BASE_URL}/api/Token/CreateToken`;
  const params = new URLSearchParams({
    username: username,
    Key: password,
    Type: "OUT",
    Useragent: "Google",
    IpAddress: "172.16.16.33",
    DeviceName: "ZubairPC",
  });

  const res = await fetch(`${url}?${params.toString()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to create token: ${res.status}`);
  }

  return await res.json();
}

async function refreshAccessToken(refreshToken: string, userId: string) {
  const url = `${process.env.PUBLIC_API_BASE_URL}/api/Token/RefreshToken`;
  const params = new URLSearchParams({
    refreshToken: refreshToken,
    Useragent: "Google",
    IpAddress: "172.16.16.33",
    DeviceName: "ZubairPC",
    userid: userId,
  });

  const res = await fetch(`${url}?${params.toString()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unable to read error response');
    console.error(`Token refresh failed with status ${res.status}: ${errorText}`);
    throw new Error(`REFRESH_TOKEN_EXPIRED`);
  }

  return await res.json();
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // Create token for the user
          const tokenData = await createNewToken(
            credentials.username as string,
            credentials.password as string
          );

          // Validate the login with the external API
          const url = `${process.env.PUBLIC_API_BASE_URL}/api/Validate/ValidateLogin`;
          const params = new URLSearchParams({
            username: credentials.username as string,
            pwd: credentials.password as string,
            ipaddress: "172.16.16.33",
            useragent: "Chrome",
          });

          const response = await fetch(`${url}?${params.toString()}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${tokenData.accessToken}`,
            },
            cache: 'no-store',
          });

          if (!response.ok) {
            return null;
          }

          let userData = await response.json();

          if (typeof userData === 'string') {
            try {
              userData = JSON.parse(userData);
            } catch (e) {
              console.error("Failed to parse userData string:", e);
            }
          }

          console.log("Parsed userData:", JSON.stringify(userData, null, 2));

          // Decode JWT to get expiration time
          const jwtExpiration = decodeJwtExpiration(tokenData.accessToken);
          const tokenExpiresAt = jwtExpiration || (Date.now() + 60 * 60 * 1000);

          // Map API response to User object
          const userObj = {
            id: userData.PUUId || userData.id || "",
            email: userData.Email || userData.email || "",
            firstName: userData.FirstName || userData.firstName || "",
            lastName: userData.LastName || userData.lastName || "",
            roleId: userData.RoleId || userData.roleId || "",
            userTypeId: userData.UserTypeId || userData.userTypeId || 0,
            twoFactorEnabled: userData.TwoFactorEnabled || userData.twoFactorEnabled || false,
            companyId: userData.PCompanyId || userData.companyId || userData.pCompanyId || "",
            providerId: userData.ProviderId || userData.providerId || undefined,
            accessToken: tokenData.accessToken,
            refreshToken: tokenData.refreshToken,
            tokenExpiresAt,
          };

          return userObj;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      // console.log('JWT callback triggered:', { trigger, user, token });
      // Initial sign in
      if (user) {
        token.id = user.id ?? "";
        token.email = user.email ?? "";
        token.firstName = user.firstName ?? "";
        token.lastName = user.lastName ?? "";
        token.roleId = user.roleId ?? "";
        token.userTypeId = user.userTypeId ?? 0;
        token.twoFactorEnabled = user.twoFactorEnabled ?? false;
        token.companyId = user.companyId ?? "";
        token.providerId = user.providerId;
        token.accessToken = user.accessToken ?? "";
        token.refreshToken = user.refreshToken ?? "";
        token.tokenExpiresAt = user.tokenExpiresAt ?? Date.now();
        return token;
      }

      // Check if token needs refresh
      const now = Date.now();
      const bufferTime = 5 * 60 * 1000; // Refresh 5 minutes before expiration

      if (now >= (token.tokenExpiresAt as number) - bufferTime) {
        try {
          //  console.log('Attempting to refresh token for user:', token.email);
          const refreshedData = await refreshAccessToken(
            token.refreshToken as string,
            token.email as string
          );

          const jwtExpiration = decodeJwtExpiration(refreshedData.accessToken);
          const newExpiresAt = jwtExpiration || (now + 60 * 60 * 1000);

          console.log('Token refresh successful');
          token.accessToken = refreshedData.accessToken;
          token.refreshToken = refreshedData.refreshToken;
          token.tokenExpiresAt = newExpiresAt;
        } catch (error) {
          //console.error("Token refresh failed - forcing re-login");
          // Return null to clear the session and force re-authentication
          return null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // If token is null or doesn't exist, return empty session (forces re-login)
      if (!token || !token.id) {
        return null as any;
      }

      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user.roleId = token.roleId as string;
      session.user.userTypeId = token.userTypeId as number;
      session.user.twoFactorEnabled = token.twoFactorEnabled as boolean;
      session.user.companyId = token.companyId as string;
      session.user.providerId = token.providerId as string | undefined;
      return session;
    }
  },
  pages: {
    signIn: '/en/auth/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
