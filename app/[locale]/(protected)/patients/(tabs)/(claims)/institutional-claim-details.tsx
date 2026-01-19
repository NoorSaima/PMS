
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface InstitutionalClaimDetailsProps {
    claim: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function InstitutionalClaimDetails({ claim, isOpen, onClose }: InstitutionalClaimDetailsProps) {
    if (!claim) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent size="md" className=" max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">Institutional Claim Details - {claim.id}</DialogTitle>
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
                                        <TableHead>Rev Code</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">Rate</TableHead>
                                        <TableHead className="text-right">Units</TableHead>
                                        <TableHead className="text-right">Charge</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {claim.lines?.map((line: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="font-medium">{line.revCode}</TableCell>
                                            <TableCell>{line.description}</TableCell>
                                            <TableCell className="text-right">${line.rate}</TableCell>
                                            <TableCell className="text-right">{line.units}</TableCell>
                                            <TableCell className="text-right">${line.charge}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Other Diagnosis */}
                    <div>
                        <h3 className="font-semibold mb-2">Other Diagnosis</h3>
                        <div className="border rounded-lg p-4 bg-slate-50">
                            {claim.otherDiagnosis?.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1">
                                    {claim.otherDiagnosis.map((dx: any, i: number) => (
                                        <li key={i}><span className="font-medium">{dx.code}</span> - {dx.description}</li>
                                    ))}
                                </ul>
                            ) : <p className="text-muted-foreground text-sm">No other diagnosis recorded.</p>}
                        </div>
                    </div>

                    {/* Other Procedures */}
                    <div>
                        <h3 className="font-semibold mb-2">Other Procedures</h3>
                        <div className="border rounded-lg p-4 bg-slate-50">
                            {claim.otherProcedures?.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1">
                                    {claim.otherProcedures.map((proc: any, i: number) => (
                                        <li key={i}><span className="font-medium">{proc.code}</span> - {proc.description} ({proc.date})</li>
                                    ))}
                                </ul>
                            ) : <p className="text-muted-foreground text-sm">No other procedures recorded.</p>}
                        </div>
                    </div>

                    {/* Patient Reason for Visit */}
                    <div>
                        <h3 className="font-semibold mb-2">Patient&apos;s Reason for Visit</h3>
                        <div className="border rounded-lg p-4 bg-slate-50">
                            {claim.patientReason ? (
                                <p><span className="font-medium">{claim.patientReason.code}</span> - {claim.patientReason.description}</p>
                            ) : <p className="text-muted-foreground text-sm">Not specified.</p>}
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
