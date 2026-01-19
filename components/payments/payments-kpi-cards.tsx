"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, AlertCircle, Ban, RefreshCcw } from "lucide-react";

export const PaymentsKpiCards = () => {
    const kpiData = [
        {
            title: "Total Collections",
            value: "$1,250,400",
            description: "+12% from last month",
            icon: DollarSign,
            bgColor: "#3aa981", // Softer Green
        },
        {
            title: "Pending Payments",
            value: "$45,200",
            description: "15 invoices pending",
            icon: AlertCircle,
            bgColor: "#f29857", // Softer Orange
        },
        {
            title: "Denied/Failed",
            value: "$12,450",
            description: "5 transactions failed",
            icon: Ban,
            bgColor: "#ea5f5f", // Red
        },
        {
            title: "Refunds Processed",
            value: "$6,000",
            description: "3 processed this month",
            icon: RefreshCcw,
            bgColor: "#4098d7", // Softer Blue
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {kpiData.map((kpi, index) => (
                <Card
                    key={index}
                    style={{ backgroundColor: kpi.bgColor }}
                    className="border-none shadow-md"
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">{kpi.title}</CardTitle>
                        <kpi.icon className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{kpi.value}</div>
                        <p className="text-xs text-white/90">{kpi.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
