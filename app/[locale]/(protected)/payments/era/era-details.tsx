import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { DollarSign, FileText, TrendingUp, Users, Activity } from 'lucide-react';

interface EraDetailsProps {
    era: any;
}

export default function EraDetails({ era }: EraDetailsProps) {
    if (!era) return null;

    // Calculate totals across all claims
    const totalClaims = era.claims.length;
    const totalCharge = era.claims.reduce((sum: number, claim: any) => sum + claim.charge, 0);
    const totalPaid = era.claims.reduce((sum: number, claim: any) => sum + claim.paid, 0);
    const totalAdjustments = totalCharge - totalPaid;

    // Calculate grand totals for the detail table
    const calculateClaimTotals = (claim: any) => {
        return claim.lines.reduce((totals: any, line: any) => ({
            amount: totals.amount + line.amount,
            allowed: totals.allowed + line.allowed,
            paid: totals.paid + line.paid,
            adjustedAmount: totals.adjustedAmount + line.adjustedAmount,
            unpaidAmount: totals.unpaidAmount + line.unpaidAmount
        }), { amount: 0, allowed: 0, paid: 0, adjustedAmount: 0, unpaidAmount: 0 });
    };

    return (
        <div className="space-y-6">
            {/* ERA Header Info */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">ERA Details - {era.id}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Report Date: {era.rptDate} • Received: {era.receivedDate}
                            </p>
                        </div>
                        {era.isNew && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Payer</p>
                            <p className="font-semibold">{era.payer}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Payer ID</p>
                            <p className="font-semibold">{era.payerId}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Submitter</p>
                            <p className="font-semibold">{era.submitter}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Check Number</p>
                            <p className="font-semibold">{era.checkNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Check Date</p>
                            <p className="font-semibold">{era.checkDate}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Check Amount</p>
                            <p className="font-semibold text-emerald-600">${era.checkAmount.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">NPI</p>
                            <p className="font-semibold">{era.npi}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Tax ID</p>
                            <p className="font-semibold">{era.taxId}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card style={{ backgroundColor: "#9b87f5" }} className="border-none shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">No. of Claims</CardTitle>
                        <Users className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{totalClaims}</div>
                        <p className="text-xs text-white/90">Claims processed</p>
                    </CardContent>
                </Card>

                <Card style={{ backgroundColor: "#4098d7" }} className="border-none shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">Total Bill Amount</CardTitle>
                        <FileText className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">${totalCharge.toFixed(2)}</div>
                        <p className="text-xs text-white/90">Total charges</p>
                    </CardContent>
                </Card>

                <Card style={{ backgroundColor: "#3aa981" }} className="border-none shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">Total Paid</CardTitle>
                        <DollarSign className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">${totalPaid.toFixed(2)}</div>
                        <p className="text-xs text-white/90">Payment received</p>
                    </CardContent>
                </Card>

                <Card style={{ backgroundColor: "#f29857" }} className="border-none shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">Adjustments</CardTitle>
                        <TrendingUp className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">${totalAdjustments.toFixed(2)}</div>
                        <p className="text-xs text-white/90">Total adjustments</p>
                    </CardContent>
                </Card>
            </div>

            {/* Claims List */}
            {era.claims.map((claim: any, claimIndex: number) => {
                const claimTotals = calculateClaimTotals(claim);

                return (
                    <Card key={claimIndex}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">Claim {claim.claimId}</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Patient: {claim.patientName} ({claim.patientId})
                                    </p>
                                </div>
                                <div className="text-right">
                                    <Badge className="bg-transparent border border-slate-200 text-slate-700">{claim.processedAs}</Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Claim Summary */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <p className="text-sm font-medium text-muted-foreground">Charged</p>
                                    <p className="text-xl font-bold">${claim.charge.toFixed(2)}</p>
                                </div>
                                <div className="p-3 bg-emerald-50 rounded-lg">
                                    <p className="text-sm font-medium text-muted-foreground">Paid</p>
                                    <p className="text-xl font-bold text-emerald-600">${claim.paid.toFixed(2)}</p>
                                </div>
                            </div>

                            <Separator />

                            {/* Service Lines Detail */}
                            <div>
                                <h4 className="font-semibold mb-3">Service Line Details</h4>
                                <div className="border rounded-lg overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-slate-50">
                                                <TableHead>DOS</TableHead>
                                                <TableHead>Proc</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                                <TableHead className="text-right">Allowed</TableHead>
                                                <TableHead className="text-right">Paid</TableHead>
                                                <TableHead>Remarks</TableHead>
                                                <TableHead>Adj Reasons</TableHead>
                                                <TableHead className="text-right">Adjusted Amt</TableHead>
                                                <TableHead>Unpaid Reasons</TableHead>
                                                <TableHead className="text-right">Unpaid Amt</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {claim.lines.map((line: any, lineIndex: number) => (
                                                <TableRow key={lineIndex}>
                                                    <TableCell>{line.dos}</TableCell>
                                                    <TableCell className="font-medium">{line.proc}</TableCell>
                                                    <TableCell className="text-right">${line.amount.toFixed(2)}</TableCell>
                                                    <TableCell className="text-right">${line.allowed.toFixed(2)}</TableCell>
                                                    <TableCell className="text-right text-emerald-600 font-medium">${line.paid.toFixed(2)}</TableCell>
                                                    <TableCell>
                                                        <Badge className="text-xs bg-transparent border border-slate-200 text-slate-700">{line.remarks}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-xs max-w-[200px]">{line.adjReasons}</TableCell>
                                                    <TableCell className="text-right text-amber-600">${line.adjustedAmount.toFixed(2)}</TableCell>
                                                    <TableCell className="text-xs">{line.unpaidReasons || '-'}</TableCell>
                                                    <TableCell className="text-right">${line.unpaidAmount.toFixed(2)}</TableCell>
                                                </TableRow>
                                            ))}
                                            {/* Totals Row */}
                                            <TableRow className="bg-slate-50 font-semibold">
                                                <TableCell colSpan={2}>Total</TableCell>
                                                <TableCell className="text-right">${claimTotals.amount.toFixed(2)}</TableCell>
                                                <TableCell className="text-right">${claimTotals.allowed.toFixed(2)}</TableCell>
                                                <TableCell className="text-right text-emerald-600">${claimTotals.paid.toFixed(2)}</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell className="text-right text-amber-600">${claimTotals.adjustedAmount.toFixed(2)}</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell className="text-right">${claimTotals.unpaidAmount.toFixed(2)}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
