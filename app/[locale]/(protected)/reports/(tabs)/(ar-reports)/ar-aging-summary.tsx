import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

export default function ArAgingSummary() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    <CardTitle>AR Aging Summary</CardTitle>
                </div>
                <CardDescription>
                    View aging of accounts receivable balances
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="rounded-full bg-slate-100 p-6 mb-4">
                        <BarChart className="h-12 w-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">AR Aging Summary Report</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                        This report will display accounts receivable aging summary with breakdowns by 30, 60, 90, and 120+ days.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
