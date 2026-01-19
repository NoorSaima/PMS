'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * Example component showing how to access user session data
 * including all fields from the API response
 */
export default function UserProfileExample() {
  const { user, isAuthenticated, isLoading, } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div>Please login to view this page</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="font-semibold">Name:</label>
          <p className="text-sm text-muted-foreground">
            {user.firstName} {user.lastName}
          </p>
        </div>

        <div>
          <label className="font-semibold">Email:</label>
          <p>{user.email}</p>
        </div>

        <div>
          <label className="font-semibold">User ID:</label>
          <p className="font-mono text-sm">{user.id}</p>
        </div>

        <div>
          <label className="font-semibold">Role ID:</label>
          <p className="font-mono text-sm">{user.roleId}</p>
        </div>

        <div>
          <label className="font-semibold">User Type:</label>
          <Badge>{user.userTypeId}</Badge>
        </div>

        <div>
          <label className="font-semibold">Company ID:</label>
          <p className="font-mono text-sm">{user.companyId}</p>
        </div>

        <div>
          <label className="font-semibold">Two Factor Auth:</label>
          <Badge variant={user.twoFactorEnabled ? 'default' : 'secondary'}>
            {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>

        {user.providerId && (
          <div>
            <label className="font-semibold">Provider ID:</label>
            <p className="font-mono text-sm">{user.providerId}</p>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
