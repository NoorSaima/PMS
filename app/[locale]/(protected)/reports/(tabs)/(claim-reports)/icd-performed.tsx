import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Stethoscope } from 'lucide-react';

export default function IcdPerformed() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-primary" />
                    <CardTitle>ICD Performed</CardTitle>
                </div>
                <CardDescription>
                    ICD diagnosis codes analysis
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="rounded-full bg-slate-100 p-6 mb-4">
                        <Stethoscope className="h-12 w-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">ICD Performed Report</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                        This report will display all ICD diagnosis codes used with frequency and associated claims data.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
