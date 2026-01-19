import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GeneralInfo } from './general-info';
import { ProviderInfo } from './provider-info';
import { InsuranceInfo } from './insurance-info';

export default function InstitutionalClaimTab() {
    return (
        <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-slate-100/50 border-b">
                <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight">Institutional Claim Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <GeneralInfo />
                <ProviderInfo />
                <InsuranceInfo />
            </CardContent>
        </Card>
    );
};
