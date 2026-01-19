"use client";
import React from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PracticePage = () => {
    return (
        <div className="space-y-6">
            <SiteBreadcrumb />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Practice Configuration</h2>
                    <p className="text-muted-foreground">Configure practice-wide defaults and settings.</p>
                </div>
                <Button>Save Changes</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Defaults</CardTitle>
                    <CardDescription>Set default values for new claims and patients.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Default Place of Service</Label>
                            <Input placeholder="11 - Office" />
                        </div>
                        <div className="space-y-2">
                            <Label>Default Provider</Label>
                            <Input placeholder="Select provider..." />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Billing Preferences</CardTitle>
                    <CardDescription>Manage billing cycles and statement settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Statement Cycle</Label>
                        <Input placeholder="Monthly" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PracticePage;
