import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InstitutionalChargesTable from '../../components/institutional-charges-table';

export default function InstitutionalChargesTab() {
    return (
        <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
                <CardTitle>Charges & Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Charge Options Section */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <div className="h-6 w-1 rounded-full bg-primary" />
                        Charge Options
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Bill To</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Payer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="primary">Primary Payer</SelectItem>
                                    <SelectItem value="secondary">Secondary Payer</SelectItem>
                                    <SelectItem value="tertiary">Tertiary Payer</SelectItem>
                                    <SelectItem value="patient">Patient</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Set all charges to</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="No Action" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bill-patient">Bill to Patient</SelectItem>
                                    <SelectItem value="bill-insurance">Bill to Insurance</SelectItem>
                                    <SelectItem value="hold">Hold</SelectItem>
                                    <SelectItem value="write-off">Write Off</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">DOS From</label>
                            <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">DOS To</label>
                            <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Charges Table */}
                <div>
                    <InstitutionalChargesTable />
                </div>
            </CardContent>
        </Card>
    );
};
