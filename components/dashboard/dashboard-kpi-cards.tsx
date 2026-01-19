"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, FileText, CreditCard } from "lucide-react";

export const DashboardKpiCards = () => {
    const kpiData = [
        {
            title: "Total Patients",
            value: "2,847",
            description: "+12.5% from last month",
            icon: Users,
            bgColor: "#3aa981", // Softer Green
        },
        {
            title: "Total Charges",
            value: "$1,245,890",
            description: "+18.2% from last month",
            icon: DollarSign,
            bgColor: "#4098d7", // Softer Blue
        },
        {
            title: "Number of Claims",
            value: "1,523",
            description: "+8.3% from last month",
            icon: FileText,
            bgColor: "#d15c89", // Softer Pink
        },
        {
            title: "Total Payments",
            value: "$987,450",
            description: "+15.7% from last month",
            icon: CreditCard,
            bgColor: "#f29857", // Softer Orange
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
