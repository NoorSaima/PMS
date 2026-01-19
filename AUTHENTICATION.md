# Authentication System

## Overview
This application uses NextAuth v5 with JWT sessions to provide per-user authentication and token management. Each user has their own access token and refresh token stored securely in their session.

## Key Features
- **Per-user tokens**: Each authenticated user has their own access token
- **Automatic token refresh**: Tokens are automatically refreshed 5 minutes before expiration
- **Secure session management**: Uses JWT strategy with HttpOnly cookies
- **Protected routes**: Middleware protects authenticated routes automatically

## Setup

### 1. Environment Variables
Add these to your `.env.local` file:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
PUBLIC_API_BASE_URL=https://your-api-url
```

Generate a secret key with:
```bash
openssl rand -base64 32
```

### 2. Authentication Flow

#### Login
Users login through the `/api/auth/login` endpoint or NextAuth's built-in signin:

```javascript
import { signIn } from 'next-auth/react';

// Client-side login
await signIn('credentials', {
  username: 'user@example.com',
  password: 'password',
  redirect: false,
});
```

#### Using Access Tokens in API Routes
In your API routes, get the user's access token from their session:

```javascript
import { getAccessToken } from '@/lib/getServerSession';

export async function GET(request) {
  try {
    // Get current user's token
    const accessToken = await getAccessToken();
    
    // Use token for API calls
    const response = await fetch('https://api.example.com/data', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    return NextResponse.json(await response.json());
  } catch (error) {
    // User not authenticated
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
```

#### Using Session in Server Components
```javascript
import { getServerSession } from '@/lib/getServerSession';

export default async function Page() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/auth/login');
  }
  
  return <div>Welcome {session.user.username}</div>;
}
```

#### Using Session in Client Components
```javascript
'use client';
import { useSession } from 'next-auth/react';

export default function Component() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'unauthenticated') return <div>Please login</div>;
  
  return <div>Welcome {session.user.username}</div>;
}
```

## Architecture

### Token Management
- **Initial Login**: Creates new access + refresh tokens for the user
- **Token Storage**: Stored in JWT session (encrypted, HttpOnly cookie)
- **Auto-Refresh**: Checks expiration on each request, refreshes if needed
- **Per-User**: Each user's tokens are isolated in their own session

### File Structure
```
lib/
  ├── auth.ts                 # NextAuth configuration & token management
  └── getServerSession.ts     # Helper functions to get session/tokens

app/api/auth/
  ├── [...nextauth]/route.ts  # NextAuth API handler
  └── login/route.js          # Custom login endpoint

middleware.ts                 # Route protection & session checks
```

### Security Features
- JWT sessions with encrypted cookies
- HttpOnly cookies (not accessible via JavaScript)
- Automatic token refresh before expiration
- Per-user token isolation
- Protected route middleware

## Migration from Old System

The old `apiKeyManager.js` used a single shared token for all users, which was:
- ❌ Insecure (all users shared one token)
- ❌ Not scalable
- ❌ No per-user tracking

The new system:
- ✅ Each user has their own token
- ✅ Tokens stored securely in encrypted sessions
- ✅ Automatic refresh per user
- ✅ Full audit trail of who accessed what

## Troubleshooting

### "No access token available" error
This means the user is not authenticated. Ensure:
1. User has logged in via `/api/auth/login`
2. Session cookie is present
3. NEXTAUTH_SECRET is set correctly

### Tokens not refreshing
Check:
1. Token expiration time is being decoded correctly
2. Refresh token endpoint is accessible
3. User credentials are correct in session

### Logout
```javascript
import { signOut } from 'next-auth/react';

// Client-side
await signOut({ redirect: true, callbackUrl: '/auth/login' });
```

```javascript
import { signOut } from '@/lib/auth';

// Server-side
await signOut();
```
