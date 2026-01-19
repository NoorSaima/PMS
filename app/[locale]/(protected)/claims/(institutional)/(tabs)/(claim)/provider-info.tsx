import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const ProviderInfo = () => {
    return (
        <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900">Provider & Facility Details</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label className="text-slate-700">Billing Provider</Label>
                    <Input placeholder="Search Billing Provider" />
                </div>

                <div className="space-y-2">
                    <Label className="text-slate-700">Rendering Provider</Label>
                    <Input placeholder="Search Rendering Provider" />
                </div>

                <div className="space-y-2">
                    <Label className="text-slate-700">Ordering Provider</Label>
                    <Input placeholder="Search Ordering Provider" />
                </div>

                <div className="space-y-2">
                    <Label className="text-slate-700">Facility</Label>
                    <Input placeholder="Search Facility" />
                </div>

                <div className="space-y-2">
                    <Label className="text-slate-700">Referring/PCP Provider</Label>
                    <Input placeholder="Search Referring Provider" />
                </div>
            </div>
        </div>
    );
};
