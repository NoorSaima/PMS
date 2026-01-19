
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

interface ProfessionalClaimDetailsProps {
    claim: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProfessionalClaimDetails({ claim, isOpen, onClose }: ProfessionalClaimDetailsProps) {
    if (!claim) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent size="md" className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">Professional Claim Details - {claim.id}</DialogTitle>
                    <DialogDescription>
                        Created on {claim.createdDate}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Header Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Reference</p>
                            <p className="font-semibold">{claim.ref || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Frequency</p>
                            <p className="font-semibold">{claim.frequency || 'Original'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Type</p>
                            <p className="font-semibold">{claim.type}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Status</p>
                            <Badge color={claim.status === 'Paid' ? 'default' : 'secondary'}>{claim.status}</Badge>
                        </div>
                    </div>

                    {/* Financials */}
                    <div className="grid grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-2xl font-bold text-slate-800">${claim.totalCharge}</div>
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Total Charge</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-2xl font-bold text-emerald-600">${claim.totalPaid}</div>
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Total Paid</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-2xl font-bold text-amber-600">${claim.balance}</div>
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Balance</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Diagnosis Codes */}
                    <div>
                        <h3 className="font-semibold mb-2">Diagnosis Codes</h3>
                        <div className="flex flex-wrap gap-2">
                            {claim.diagnosisCodes?.map((code: string, index: number) => (
                                <Badge key={index} className="text-sm py-1 px-3 bg-transparent border border-slate-200 text-slate-700">
                                    {code}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Provider Information */}
                    <div>
                        <h3 className="font-semibold mb-2">Provider & Facility Information</h3>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 border p-4 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Rendering Provider</p>
                                <p>{claim.renderingProvider}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Billing Provider</p>
                                <p>{claim.billingProvider}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Supervising Provider</p>
                                <p>{claim.supervisingProvider || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Facility</p>
                                <p>{claim.facility}</p>
                            </div>
                        </div>
                    </div>

                    {/* Claim Lines */}
                    <div>
                        <h3 className="font-semibold mb-2">Claim Lines</h3>
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50">
                                        <TableHead className="w-[50px]">Seq</TableHead>
                                        <TableHead>From Date</TableHead>
                                        <TableHead>To Date</TableHead>
                                        <TableHead>CPT</TableHead>
                                        <TableHead className="text-right">Units</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead className="text-right">Paid</TableHead>
                                        <TableHead>DX Pointer</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {claim.lines?.map((line: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{line.fromDate}</TableCell>
                                            <TableCell>{line.toDate}</TableCell>
                                            <TableCell className="font-medium">{line.cpt}</TableCell>
                                            <TableCell className="text-right">{line.units}</TableCell>
                                            <TableCell className="text-right">${line.price}</TableCell>
                                            <TableCell className="text-right text-emerald-600">${line.paid}</TableCell>
                                            <TableCell>{line.dxPointer}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Payer Information */}
                    <div>
                        <h3 className="font-semibold mb-2">Payer Information</h3>
                        <div className="p-4 bg-slate-50 border rounded-lg">
                            <p className="font-medium">{claim.payerName}</p>
                            <p className="text-sm text-muted-foreground">Payer ID: {claim.payerId}</p>
                            <p className="text-sm text-muted-foreground">Policy #: {claim.policyNumber}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
