'use client';

import React from 'react';
import PracticeSelector from '@/components/settings/practice-selector';
import SiteBreadcrumb from '@/components/site-breadcrumb';

const SettingsPage = () => {
    return (
        <div className="space-y-6">
            <SiteBreadcrumb />
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your profile and application preferences.
                    </p>
                </div>

                <div className="grid gap-6">
                    <PracticeSelector />
                    {/* Future settings components can be added here */}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
