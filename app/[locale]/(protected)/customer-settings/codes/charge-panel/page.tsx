"use client";
import React from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const ChargePanelPage = () => {
    return (
        <div className="space-y-6">
            <SiteBreadcrumb />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Charge Panel</h2>
                    <p className="text-muted-foreground">Customize quick-entry charge panels.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Panel
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="flex flex-col items-center justify-center p-6 border-dashed cursor-pointer hover:bg-muted/50">
                    <Plus className="h-8 w-8 text-muted-foreground mb-4" />
                    <p className="font-medium text-muted-foreground">Add New Panel</p>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Common Visits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Standard E&M codes for daily visits.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
export default ChargePanelPage;
