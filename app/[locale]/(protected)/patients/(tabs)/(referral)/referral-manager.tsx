"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ReferralList from "./referral-list";
import AddReferralDialog from "./add-referral-dialog";

interface ReferralManagerProps {
    patientId: string;
}

export default function ReferralManager({ patientId }: ReferralManagerProps) {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="px-0 pt-0 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Referrals</CardTitle>
                        <CardDescription>Manage incoming and outgoing patient referrals.</CardDescription>
                    </div>
                    <AddReferralDialog patientId={patientId} onSuccess={handleRefresh} />
                </div>
            </CardHeader>
            <CardContent className="px-0">
                <ReferralList patientId={patientId} key={refreshKey} />
            </CardContent>
        </Card>
    );
}
