import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export default function CptPerformed() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <CardTitle>CPT Performed</CardTitle>
                </div>
                <CardDescription>
                    CPT codes performed analysis
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="rounded-full bg-slate-100 p-6 mb-4">
                        <Activity className="h-12 w-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">CPT Performed Report</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                        This report will show all CPT codes performed with frequency, charges, and payment statistics.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
