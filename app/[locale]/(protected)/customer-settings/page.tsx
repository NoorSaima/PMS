"use client";
import React from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building, User, Users, FileText, Settings, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const CustomerSettingsPage = () => {
    const settings = [
        { title: "Company", description: "Manage company details and branding.", icon: Building, href: "/customer-settings/company" },
        { title: "Practice", description: "Configure practice settings and locations.", icon: Settings, href: "/customer-settings/practice" },
        { title: "Providers", description: "Manage healthcare providers and credentials.", icon: User, href: "/customer-settings/provider" },
        { title: "Facilities", description: "Manage facility information.", icon: Building, href: "/customer-settings/facility" },
        { title: "Insurance List", description: "Manage insurance payers and plans.", icon: ShieldCheck, href: "/customer-settings/insurance-list" },
        { title: "Codes", description: "Manage ICD, CPT, and other medical codes.", icon: FileText, href: "/customer-settings/codes" },
    ];

    return (
        <div className="space-y-6">
            <SiteBreadcrumb />
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Customer Settings</h2>
                <p className="text-muted-foreground">Manage your organization&apos;s configuration and preferences.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {settings.map((item) => (
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

export default CustomerSettingsPage;
