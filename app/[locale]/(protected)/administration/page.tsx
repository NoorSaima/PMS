"use client";
import React from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Lock } from 'lucide-react';
import Link from 'next/link';

const AdministrationPage = () => {
    return (
        <div className="space-y-6">
            <SiteBreadcrumb />
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Administration</h2>
                <p className="text-muted-foreground">System configuration and user access control.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/administration/user-management">
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-base">User Management</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Manage system users and access.</CardDescription>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/administration/role-setup">
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Lock className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-base">Role Setup</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Configure roles and permissions.</CardDescription>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
};
export default AdministrationPage;
