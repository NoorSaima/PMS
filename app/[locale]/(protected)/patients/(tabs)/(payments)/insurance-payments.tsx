"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, CreditCard, Calendar, User, FileText, CheckCircle2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Dummy Data
const PAYMENTS_DATA = [
    {
        id: "PAY-001",
        payer: "Blue Cross Blue Shield",
        source: "ERA",
        amount: 1250.00,
        appliedAmount: 1250.00,
        remainingAmount: 0.00,
        receivedDate: "2024-12-10",
        depositDate: "2024-12-11",
        clearanceDate: "2024-12-12",
        checkNumber: "CHK-889922",
        addedBy: "System Admin",
        status: "Posted"
    },
    {
        id: "PAY-002",
        payer: "UnitedHealthcare",
        source: "Manual",
        amount: 450.50,
        appliedAmount: 400.00,
        remainingAmount: 50.50,
        receivedDate: "2024-12-14",
        depositDate: "2024-12-15",
        clearanceDate: "Pending",
        checkNumber: "CHK-776655",
        addedBy: "Jane Doe",
        status: "Partial"
    },
    {
        id: "PAY-003",
        payer: "Aetna",
        source: "ERA",
        amount: 2100.00,
        appliedAmount: 2100.00,
        remainingAmount: 0.00,
        receivedDate: "2024-12-18",
        depositDate: "2024-12-19",
        clearanceDate: "2024-12-20",
        checkNumber: "EFT-112233",
        addedBy: "System Admin",
        status: "Posted"
    }
];

export default function InsurancePayments() {
    const [selectedPayment, setSelectedPayment] = useState<typeof PAYMENTS_DATA[0] | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleViewDetails = (payment: typeof PAYMENTS_DATA[0]) => {
        setSelectedPayment(payment);
        setIsDialogOpen(true);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="px-6 py-4 border-b bg-slate-50/50">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-slate-800">Insurance Payments</CardTitle>
                    <Badge className="bg-white border border-slate-200 text-slate-700">Total: {PAYMENTS_DATA.length}</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="font-semibold text-slate-700">Payer</TableHead>
                            <TableHead className="font-semibold text-slate-700">Source</TableHead>
                            <TableHead className="font-semibold text-slate-700">Amount</TableHead>
                            <TableHead className="font-semibold text-slate-700">Applied</TableHead>
                            <TableHead className="font-semibold text-slate-700">Remaining</TableHead>
                            <TableHead className="font-semibold text-slate-700">Received</TableHead>
                            <TableHead className="font-semibold text-slate-700">Deposit</TableHead>
                            <TableHead className="font-semibold text-slate-700">Clearance</TableHead>
                            <TableHead className="font-semibold text-slate-700">Check #</TableHead>
                            <TableHead className="font-semibold text-slate-700">Added By</TableHead>
                            <TableHead className="text-right font-semibold text-slate-700">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {PAYMENTS_DATA.map((payment) => (
                            <TableRow key={payment.id} className="hover:bg-slate-50/50">
                                <TableCell className="font-medium text-slate-900">{payment.payer}</TableCell>
                                <TableCell>
                                    <Badge color="secondary" className="font-normal">
                                        {payment.source}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium text-green-600">
                                    {formatCurrency(payment.amount)}
                                </TableCell>
                                <TableCell>{formatCurrency(payment.appliedAmount)}</TableCell>
                                <TableCell className={payment.remainingAmount > 0 ? "text-amber-600 font-medium" : "text-slate-500"}>
                                    {formatCurrency(payment.remainingAmount)}
                                </TableCell>
                                <TableCell className="text-slate-500">{payment.receivedDate}</TableCell>
                                <TableCell className="text-slate-500">{payment.depositDate}</TableCell>
                                <TableCell className="text-slate-500">{payment.clearanceDate}</TableCell>
                                <TableCell className="font-mono text-xs">{payment.checkNumber}</TableCell>
                                <TableCell className="text-slate-500">{payment.addedBy}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleViewDetails(payment)}
                                        className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">View Details</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <CreditCard className="h-5 w-5 text-primary" />
                            Payment Details
                        </DialogTitle>
                        <DialogDescription>
                            Complete information for payment <span className="font-mono font-medium text-slate-900">{selectedPayment?.id}</span>
                        </DialogDescription>
                    </DialogHeader>

                    {selectedPayment && (
                        <div className="grid gap-6 py-4">
                            {/* Key Financials */}
                            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-slate-500 uppercase">Total Amount</p>
                                    <p className="text-lg font-bold text-green-700">{formatCurrency(selectedPayment.amount)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-slate-500 uppercase">Applied</p>
                                    <p className="text-lg font-semibold text-slate-700">{formatCurrency(selectedPayment.appliedAmount)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-slate-500 uppercase">Remaining</p>
                                    <p className={`text-lg font-semibold ${selectedPayment.remainingAmount > 0 ? "text-amber-600" : "text-slate-400"}`}>
                                        {formatCurrency(selectedPayment.remainingAmount)}
                                    </p>
                                </div>
                            </div>

                            {/* Payer Info */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 pb-2 border-b">
                                    <FileText className="h-4 w-4 text-slate-500" /> Payer Information
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">Payer Name</p>
                                        <p className="text-sm font-medium">{selectedPayment.payer}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">Check / Ref Number</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded">{selectedPayment.checkNumber}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">Source</p>
                                        <Badge className="bg-transparent border border-slate-200 text-slate-700">{selectedPayment.source}</Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">Status</p>
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                                            <span className="text-sm font-medium text-green-700">{selectedPayment.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dates & Meta */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 pb-2 border-b">
                                    <Calendar className="h-4 w-4 text-slate-500" /> Transaction Dates
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">Received Date</p>
                                        <p className="text-sm">{selectedPayment.receivedDate}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">Deposit Date</p>
                                        <p className="text-sm">{selectedPayment.depositDate}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">Clearance Date</p>
                                        <p className="text-sm">{selectedPayment.clearanceDate}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <User className="h-3.5 w-3.5" />
                                <span>Entry added by <span className="font-medium text-slate-700">{selectedPayment.addedBy}</span></span>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
