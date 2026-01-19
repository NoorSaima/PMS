"use client";
import React from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Activity, DollarSign, List, Table } from 'lucide-react';
import Link from 'next/link';

const CodesPage = () => {
    const codes = [
        { title: "ICD Codes", description: "International Classification of Diseases", icon: Activity, href: "/customer-settings/codes/icd" },
        { title: "CPT Codes", description: "Current Procedural Terminology", icon: FileText, href: "/customer-settings/codes/cpt" },
        { title: "Revenue Codes", description: "UB-04 Revenue Codes", icon: DollarSign, href: "/customer-settings/codes/revenue" },
        { title: "Fee Schedules", description: "Manage pricing and fee schedules", icon: Table, href: "/customer-settings/codes/fee-schedules" },
        { title: "Charge Panel", description: "Configure charge entry panels", icon: List, href: "/customer-settings/codes/charge-panel" },
    ];

    return (
        <div className="space-y-6">
            <SiteBreadcrumb />
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Medical Codes & Fees</h2>
                <p className="text-muted-foreground">Manage standard codes and fee schedules.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {codes.map((item) => (
                    <Link key={item.title} href={item.href}>
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <item.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <CardTitle className="text-base">{item.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{item.description}</CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CodesPage;
