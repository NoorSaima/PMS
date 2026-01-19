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

interface QueueItemDetailsProps {
    item: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function QueueItemDetails({ item, isOpen, onClose }: QueueItemDetailsProps) {
    if (!item) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent size="lg" className="max-h-[90vh] overflow-y-auto max-w-5xl">
                <DialogHeader>
                    <DialogTitle className="text-xl">Claim Details - {item.claimId}</DialogTitle>
                    <DialogDescription>
                        Queue Item #{item.id}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Header Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Claim ID</p>
                            <p className="font-semibold">{item.claimId || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Patient</p>
                            <p className="font-semibold">{item.patient}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Type</p>
                            <p className="font-semibold">{item.type}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Status</p>
                            <Badge color={item.status === 'Processing' ? 'default' : 'secondary'}>{item.status}</Badge>
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-2xl font-bold text-slate-800">${item.totalCharge || '0.00'}</div>
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Total Charge</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-2xl font-bold text-emerald-600">${item.totalPaid || '0.00'}</div>
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Total Paid</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Provider & Facility Information */}
                    <div>
                        <h3 className="font-semibold mb-3 text-lg">Provider & Facility Information</h3>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 border p-4 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Rendering Provider</p>
                                <p>{item.rendering || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Billing Provider</p>
                                <p>{item.billing || 'N/A'}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-muted-foreground">Facility</p>
                                <p>{item.facility || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Primary Insurance */}
                    <div>
                        <h3 className="font-semibold mb-3 text-lg">Primary Insurance</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Individual Policy</p>
                                <p className="font-medium">{item.primaryInsurance?.individualPolicy || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Member ID</p>
                                <p className="font-medium">{item.primaryInsurance?.memberId || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Authorization</p>
                                <p className="font-medium">{item.primaryInsurance?.authorization || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Insurance */}
                    <div>
                        <h3 className="font-semibold mb-3 text-lg">Secondary Insurance</h3>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Member ID</p>
                                <p className="font-medium">{item.secondaryInsurance?.memberId || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Authorization</p>
                                <p className="font-medium">{item.secondaryInsurance?.authorization || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tertiary Insurance */}
                    <div>
                        <h3 className="font-semibold mb-3 text-lg">Tertiary Insurance</h3>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Member ID</p>
                                <p className="font-medium">{item.tertiaryInsurance?.memberId || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Authorization</p>
                                <p className="font-medium">{item.tertiaryInsurance?.authorization || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Queue Lines Table */}
                    <div>
                        <h3 className="font-semibold mb-3 text-lg">Queue Lines</h3>
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50">
                                        <TableHead>From</TableHead>
                                        <TableHead>To</TableHead>
                                        <TableHead>CPT</TableHead>
                                        <TableHead>Mods</TableHead>
                                        <TableHead>POS</TableHead>
                                        <TableHead>TOS</TableHead>
                                        <TableHead className="text-right">Units</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead className="text-right">Charge</TableHead>
                                        <TableHead className="text-right">Paid</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {item.queueLines && item.queueLines.length > 0 ? (
                                        item.queueLines.map((line: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell>{line.from || 'N/A'}</TableCell>
                                                <TableCell>{line.to || 'N/A'}</TableCell>
                                                <TableCell className="font-medium">{line.cpt || 'N/A'}</TableCell>
                                                <TableCell>{line.mods || '-'}</TableCell>
                                                <TableCell>{line.pos || 'N/A'}</TableCell>
                                                <TableCell>{line.tos || 'N/A'}</TableCell>
                                                <TableCell className="text-right">{line.units || '0'}</TableCell>
                                                <TableCell className="text-right">${line.price || '0.00'}</TableCell>
                                                <TableCell className="text-right">${line.charge || '0.00'}</TableCell>
                                                <TableCell className="text-right text-emerald-600 font-medium">${line.paid || '0.00'}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={10} className="text-center text-muted-foreground">
                                                No queue lines available
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
