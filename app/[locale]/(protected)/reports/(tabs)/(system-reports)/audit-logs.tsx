import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';

export default function AuditLogs() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <ScrollText className="h-5 w-5 text-primary" />
                    <CardTitle>Audit Logs</CardTitle>
                </div>
                <CardDescription>
                    System audit trail and changes log
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="rounded-full bg-slate-100 p-6 mb-4">
                        <ScrollText className="h-12 w-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">Audit Logs Report</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                        This report will display comprehensive audit logs of all system changes and user actions with timestamps and details.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
