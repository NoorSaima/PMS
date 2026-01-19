"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientInsuranceDialog from "./patient-insurance-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPatientInsuranceList, removePolicy, type InsurancePolicy } from "@/store/slices/patientInsuranceSlice";

interface PatientInsuranceListProps {
    patientId?: string | number;
}

const PatientInsuranceList: React.FC<PatientInsuranceListProps> = ({ patientId }) => {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const { policies, isLoading, error } = useAppSelector((state) => state.patientInsurance);

    useEffect(() => {
        if (!patientId || patientId === 'new-patient' || patientId === 'New') return;

        dispatch(fetchPatientInsuranceList(patientId));
    }, [patientId, dispatch]);

    useEffect(() => {
        if (error) {
            toast({
                title: "Error",
                description: error,
                variant: "destructive",
            });
        }
    }, [error, toast]);

    const handleSavePolicy = (newPolicy: InsurancePolicy) => {
        // Refresh the list after saving
        if (patientId) {
            dispatch(fetchPatientInsuranceList(patientId));
        }
    };

    const handleDelete = (id: string) => {
        dispatch(removePolicy(id));
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-base font-medium flex items-center gap-2 text-primary">
                    <Shield className="h-4 w-4" />
                    Patient Insurance
                </CardTitle>
                <Button size="sm" onClick={() => setIsDialogOpen(true)} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Insurance
                </Button>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Priority</TableHead>
                                <TableHead>Payer</TableHead>
                                <TableHead>Member ID</TableHead>
                                <TableHead>Insured</TableHead>
                                <TableHead>Relation</TableHead>
                                <TableHead>Effective Date</TableHead>
                                <TableHead>Termination Date</TableHead>
                                <TableHead>Type</TableHead> {/* Renamed from Eligibility to match generally what PolicyType is */}
                                <TableHead>Default</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={11} className="text-center h-24">
                                        Loading policies...
                                    </TableCell>
                                </TableRow>
                            ) : policies.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={11} className="text-center text-muted-foreground h-24">
                                        No insurance policies found. Click &quot;Add Insurance&quot; to add one.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                policies.map((policy) => (
                                    <TableRow key={policy.id}>
                                        <TableCell>{policy.priority}</TableCell>
                                        <TableCell>{policy.payer}</TableCell>
                                        <TableCell>{policy.memberId}</TableCell>
                                        <TableCell>{policy.insured}</TableCell>
                                        <TableCell>{policy.relation}</TableCell>
                                        <TableCell>{policy.effectiveDate}</TableCell>
                                        <TableCell>{policy.terminationDate}</TableCell>
                                        <TableCell>
                                            <Badge color="info">{policy.eligibility}</Badge>
                                        </TableCell>
                                        <TableCell>{policy.default}</TableCell>
                                        <TableCell>
                                            <Badge color={policy.status === 'Active' ? 'success' : 'secondary'}>
                                                {policy.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive"
                                                    onClick={() => handleDelete(policy.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>

            <PatientInsuranceDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSavePolicy}
            />
        </Card>
    );
};

export default PatientInsuranceList;
