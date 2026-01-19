import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OtherTab() {
    return (
        <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
                <CardTitle>Other Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64 bg-slate-100 rounded-md flex items-center justify-center text-muted-foreground border border-dashed border-slate-300">
                    Other Institutional Fields
                </div>
            </CardContent>
        </Card>
    );
};
