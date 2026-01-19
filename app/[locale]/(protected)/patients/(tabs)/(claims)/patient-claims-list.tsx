
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Search, Filter } from 'lucide-react';
import { cn } from "@/lib/utils";

// Exporting interface for use in Manager
export interface Claim {
    id: string;
    createdDate: string;
    type: string;
    ref: string;
    status: string;
    totalCharge: number;
    totalPaid: number;
    balance: number;
    renderingProvider: string;
    billingProvider: string;
    supervisingProvider?: string;
    facility: string;
    payerName: string;
    payerId?: string;
    policyNumber?: string;
    diagnosisCodes?: string[];
    lines?: any[];
    // Institutional specific
    patientReason?: { code: string; description: string };
    otherDiagnosis?: any[];
    otherProcedures?: any[];
    [key: string]: any;
}

interface PatientClaimsListProps {
    claims: Claim[];
    onSelectClaim: (claim: Claim) => void;
}

export default function PatientClaimsList({ claims, onSelectClaim }: PatientClaimsListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClaims = claims.filter(claim =>
        claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.renderingProvider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.payerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid': return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case 'denied': return "bg-red-50 text-red-700 border-red-200";
            case 'pending': return "bg-amber-50 text-amber-700 border-amber-200";
            default: return "bg-slate-50 text-slate-700 border-slate-200";
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search by ID, Provider, Facility or Payer..."
                        className="pl-9 bg-white border-slate-200 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="shadow-sm text-slate-600 border-slate-200">
                    <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-b border-slate-100">
                            <TableHead className="py-4 font-semibold text-slate-600 pl-6">Claim ID</TableHead>
                            <TableHead className="py-4 font-semibold text-slate-600">Date</TableHead>
                            <TableHead className="py-4 font-semibold text-slate-600">Type</TableHead>
                            <TableHead className="py-4 font-semibold text-slate-600">Provider / Facility</TableHead>
                            <TableHead className="py-4 font-semibold text-slate-600">Payer</TableHead>
                            <TableHead className="py-4 font-semibold text-slate-600 text-right">Total Charge</TableHead>
                            <TableHead className="py-4 font-semibold text-slate-600">Status</TableHead>
                            <TableHead className="py-4 font-semibold text-slate-600 text-right pr-6">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredClaims.length > 0 ? (
                            filteredClaims.map((claim) => (
                                <TableRow key={claim.id} className="hover:bg-slate-50/60 border-b border-slate-50 transition-colors">
                                    <TableCell className="py-4 pl-6">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-700">{claim.id}</span>
                                            {claim.ref && <span className="text-[10px] text-slate-400 font-mono">Ref: {claim.ref}</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-600 font-medium text-sm">{claim.createdDate}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                "font-normal",
                                                claim.type === 'Institutional'
                                                    ? "border-blue-200 bg-blue-50/50 text-blue-700"
                                                    : "border-purple-200 bg-purple-50/50 text-purple-700"
                                            )}
                                        >
                                            {claim.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col max-w-[180px]">
                                            <span className="font-medium text-sm text-slate-700 truncate" title={claim.renderingProvider}>{claim.renderingProvider}</span>
                                            <span className="text-xs text-slate-500 truncate" title={claim.facility}>{claim.facility}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-slate-600">{claim.payerName}</span>
                                    </TableCell>
                                    <TableCell className="text-right font-medium text-slate-700">
                                        ${claim.totalCharge.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn("px-2.5 py-0.5 border", getStatusColor(claim.status))}>
                                            <span className={cn(
                                                "w-1.5 h-1.5 rounded-full mr-1.5 inline-block",
                                                claim.status === 'Paid' ? "bg-emerald-500" :
                                                    claim.status === 'Denied' ? "bg-red-500" :
                                                        "bg-amber-500"
                                            )}></span>
                                            {claim.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right flex justify-center items-center pr-6">

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300  text-default-400"
                                            color="secondary"
                                            onClick={() => onSelectClaim(claim)}
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="h-32 text-center text-slate-500">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Search className="h-8 w-8 text-slate-200" />
                                        <p>No claims found matching your filters.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
