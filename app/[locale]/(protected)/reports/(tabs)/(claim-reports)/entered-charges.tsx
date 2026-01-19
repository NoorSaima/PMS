import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function EnteredCharges() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <CardTitle>Entered Charges</CardTitle>
                </div>
                <CardDescription>
                    View all entered charges and billing details
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="rounded-full bg-slate-100 p-6 mb-4">
                        <FileText className="h-12 w-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">Entered Charges Report</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                        This report will display all charges entered into the system with detailed breakdowns by provider, date, and service type.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
