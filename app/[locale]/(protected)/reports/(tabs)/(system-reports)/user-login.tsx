import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

export default function UserLogin() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <LogIn className="h-5 w-5 text-primary" />
                    <CardTitle>User Login</CardTitle>
                </div>
                <CardDescription>
                    User login history and activity
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="rounded-full bg-slate-100 p-6 mb-4">
                        <LogIn className="h-12 w-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">User Login Report</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                        This report will show user login history including timestamps, IP addresses, and session duration.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
