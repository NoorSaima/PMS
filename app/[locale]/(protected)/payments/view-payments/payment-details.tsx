"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { CalendarIcon, CreditCard, DollarSign, FileText, User, Building } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface PaymentDetailsProps {
    payment: {
        id: string;
        patientName: string;
        providerName: string;
        payerName: string;
        amount: string;
        date: string;
        method: string;
        reference?: string;
        checkDate?: string;
        depositDate?: string;
        clearanceDate?: string;
        source?: string;
    };
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ payment }) => {
    return (
        <Card className="border-none shadow-none">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            Payment Details
                        </CardTitle>
                        <CardDescription>
                            Viewing details for payment <span className="font-mono text-primary">{payment.id}</span>
                        </CardDescription>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Completed
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    {/* Primary Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Patient</Label>
                            <div className="flex items-center gap-2 font-medium">
                                <User className="h-4 w-4 text-muted-foreground" />
                                {payment.patientName}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Provider</Label>
                            <div className="flex items-center gap-2 font-medium">
                                <User className="h-4 w-4 text-muted-foreground" />
                                {payment.providerName}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Payer / Payment From</Label>
                            <div className="flex items-center gap-2 font-medium">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                {payment.payerName}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Financial Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Amount</Label>
                            <div className="text-2xl font-bold text-green-700">
                                {payment.amount}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Payment Method</Label>
                            <div className="flex items-center gap-2 font-medium">
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                                {payment.method}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Reference / Check #</Label>
                            <div className="flex items-center gap-2 font-medium">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                {payment.reference || "N/A"}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Payment Date</Label>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                {payment.date}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Deposit Date</Label>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                {payment.depositDate || "Pending"}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Clearance Date</Label>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                {payment.clearanceDate || "Pending"}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PaymentDetails;
