"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, Search } from 'lucide-react';
import { SearchICDDialog } from './search-icd-dialog';

// Define interfaces for table rows
interface ExternalCauseRow {
    id: string;
    code: string;
    description: string;
}

interface PatientReasonRow {
    id: string;
    code: string;
    description: string;
}

interface OtherDiagnosisRow {
    id: string;
    code: string;
    description: string;
    poa: string;
}

interface OtherProcedureRow {
    id: string;
    code: string;
    date: string;
    description: string;
}

interface OccurrenceSpanRow {
    id: string;
    code: string;
    from: string;
    to: string;
    description: string;
}

interface OccurrenceRow {
    id: string;
    code: string;
    description: string;
}

interface ValueCodeRow {
    id: string;
    code: string;
    amount: string;
    description: string;
}

export default function InformationCodesTab() {
    // Principal sections state
    const [principalDiagnosis, setPrincipalDiagnosis] = useState('');
    const [poa, setPoa] = useState('');
    const [principalProcedure, setPrincipalProcedure] = useState('');
    const [principalProcedureDate, setPrincipalProcedureDate] = useState('');
    const [admittingDiagnosis, setAdmittingDiagnosis] = useState('');

    // Table states
    const [externalCauseRows, setExternalCauseRows] = useState<ExternalCauseRow[]>([]);
    const [patientReasonRows, setPatientReasonRows] = useState<PatientReasonRow[]>([]);
    const [otherDiagnosisRows, setOtherDiagnosisRows] = useState<OtherDiagnosisRow[]>([]);
    const [otherProcedureRows, setOtherProcedureRows] = useState<OtherProcedureRow[]>([]);
    const [occurrenceSpanRows, setOccurrenceSpanRows] = useState<OccurrenceSpanRow[]>([]);
    const [occurrenceRows, setOccurrenceRows] = useState<OccurrenceRow[]>([]);
    const [valueCodeRows, setValueCodeRows] = useState<ValueCodeRow[]>([]);

    // ICD Search Dialog States
    const [icdDialogOpen, setIcdDialogOpen] = useState(false);
    const [currentEditingRowId, setCurrentEditingRowId] = useState<string | null>(null);
    const [currentEditingTable, setCurrentEditingTable] = useState<'principal-diagnosis' | 'principal-procedure' | 'admitting-diagnosis' | 'external' | 'patient-reason' | 'other-diagnosis' | 'other-procedure' | 'occurrence-span' | 'occurrence' | 'value-code' | null>(null);
    const [currentEditingField, setCurrentEditingField] = useState<'code' | 'description' | null>(null);

    // Helper functions for External Cause
    const addExternalCauseRow = () => {
        const newId = (Math.max(...externalCauseRows.map(r => parseInt(r.id)), 0) + 1).toString();
        setExternalCauseRows([...externalCauseRows, { id: newId, code: '', description: '' }]);
    };

    const deleteExternalCauseRow = (id: string) => {
        setExternalCauseRows(externalCauseRows.filter(row => row.id !== id));
    };

    const updateExternalCauseRow = (id: string, field: keyof ExternalCauseRow, value: string) => {
        setExternalCauseRows(externalCauseRows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    // Helper functions for Patient Reason
    const addPatientReasonRow = () => {
        const newId = (Math.max(...patientReasonRows.map(r => parseInt(r.id)), 0) + 1).toString();
        setPatientReasonRows([...patientReasonRows, { id: newId, code: '', description: '' }]);
    };

    const deletePatientReasonRow = (id: string) => {
        setPatientReasonRows(patientReasonRows.filter(row => row.id !== id));
    };

    const updatePatientReasonRow = (id: string, field: keyof PatientReasonRow, value: string) => {
        setPatientReasonRows(patientReasonRows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    // Helper functions for Other Diagnosis
    const addOtherDiagnosisRow = () => {
        const newId = (Math.max(...otherDiagnosisRows.map(r => parseInt(r.id)), 0) + 1).toString();
        setOtherDiagnosisRows([...otherDiagnosisRows, { id: newId, code: '', description: '', poa: '' }]);
    };

    const deleteOtherDiagnosisRow = (id: string) => {
        setOtherDiagnosisRows(otherDiagnosisRows.filter(row => row.id !== id));
    };

    const updateOtherDiagnosisRow = (id: string, field: keyof OtherDiagnosisRow, value: string) => {
        setOtherDiagnosisRows(otherDiagnosisRows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    // Helper functions for Other Procedure
    const addOtherProcedureRow = () => {
        const newId = (Math.max(...otherProcedureRows.map(r => parseInt(r.id)), 0) + 1).toString();
        setOtherProcedureRows([...otherProcedureRows, { id: newId, code: '', date: '', description: '' }]);
    };

    const deleteOtherProcedureRow = (id: string) => {
        setOtherProcedureRows(otherProcedureRows.filter(row => row.id !== id));
    };

    const updateOtherProcedureRow = (id: string, field: keyof OtherProcedureRow, value: string) => {
        setOtherProcedureRows(otherProcedureRows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    // Helper functions for Occurrence Span
    const addOccurrenceSpanRow = () => {
        const newId = (Math.max(...occurrenceSpanRows.map(r => parseInt(r.id)), 0) + 1).toString();
        setOccurrenceSpanRows([...occurrenceSpanRows, { id: newId, code: '', from: '', to: '', description: '' }]);
    };

    const deleteOccurrenceSpanRow = (id: string) => {
        setOccurrenceSpanRows(occurrenceSpanRows.filter(row => row.id !== id));
    };

    const updateOccurrenceSpanRow = (id: string, field: keyof OccurrenceSpanRow, value: string) => {
        setOccurrenceSpanRows(occurrenceSpanRows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    // Helper functions for Occurrence
    const addOccurrenceRow = () => {
        const newId = (Math.max(...occurrenceRows.map(r => parseInt(r.id)), 0) + 1).toString();
        setOccurrenceRows([...occurrenceRows, { id: newId, code: '', description: '' }]);
    };

    const deleteOccurrenceRow = (id: string) => {
        setOccurrenceRows(occurrenceRows.filter(row => row.id !== id));
    };

    const updateOccurrenceRow = (id: string, field: keyof OccurrenceRow, value: string) => {
        setOccurrenceRows(occurrenceRows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    // Helper functions for Value Code
    const addValueCodeRow = () => {
        const newId = (Math.max(...valueCodeRows.map(r => parseInt(r.id)), 0) + 1).toString();
        setValueCodeRows([...valueCodeRows, { id: newId, code: '', amount: '', description: '' }]);
    };

    const deleteValueCodeRow = (id: string) => {
        setValueCodeRows(valueCodeRows.filter(row => row.id !== id));
    };

    const updateValueCodeRow = (id: string, field: keyof ValueCodeRow, value: string) => {
        setValueCodeRows(valueCodeRows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    // ICD Search Handlers
    const handleOpenICDSearch = (
        rowIdOrField: string,
        table: 'principal-diagnosis' | 'principal-procedure' | 'admitting-diagnosis' | 'external' | 'patient-reason' | 'other-diagnosis' | 'other-procedure' | 'occurrence-span' | 'occurrence' | 'value-code',
        field?: 'code' | 'description'
    ) => {
        if (table === 'principal-diagnosis' || table === 'principal-procedure' || table === 'admitting-diagnosis') {
            setCurrentEditingRowId(null);
            setCurrentEditingField(null);
        } else {
            setCurrentEditingRowId(rowIdOrField);
            setCurrentEditingField(field || null);
        }
        setCurrentEditingTable(table);
        setIcdDialogOpen(true);
    };

    const handleICDSelect = (code: string, description: string) => {
        if (currentEditingTable) {
            // Handle principal fields
            if (currentEditingTable === 'principal-diagnosis') {
                setPrincipalDiagnosis(code);
            } else if (currentEditingTable === 'principal-procedure') {
                setPrincipalProcedure(code);
            } else if (currentEditingTable === 'admitting-diagnosis') {
                setAdmittingDiagnosis(code);
            }
            // Handle table rows
            else if (currentEditingRowId) {
                if (currentEditingTable === 'external') {
                    setExternalCauseRows(externalCauseRows.map(row =>
                        row.id === currentEditingRowId ? { ...row, code, description } : row
                    ));
                } else if (currentEditingTable === 'patient-reason') {
                    setPatientReasonRows(patientReasonRows.map(row =>
                        row.id === currentEditingRowId ? { ...row, code, description } : row
                    ));
                } else if (currentEditingTable === 'other-diagnosis') {
                    setOtherDiagnosisRows(otherDiagnosisRows.map(row =>
                        row.id === currentEditingRowId ? { ...row, code, description } : row
                    ));
                } else if (currentEditingTable === 'other-procedure') {
                    setOtherProcedureRows(otherProcedureRows.map(row =>
                        row.id === currentEditingRowId ? { ...row, code, description } : row
                    ));
                } else if (currentEditingTable === 'occurrence-span') {
                    setOccurrenceSpanRows(occurrenceSpanRows.map(row =>
                        row.id === currentEditingRowId ? { ...row, code, description } : row
                    ));
                } else if (currentEditingTable === 'occurrence') {
                    setOccurrenceRows(occurrenceRows.map(row =>
                        row.id === currentEditingRowId ? { ...row, code, description } : row
                    ));
                } else if (currentEditingTable === 'value-code') {
                    setValueCodeRows(valueCodeRows.map(row =>
                        row.id === currentEditingRowId ? { ...row, code, description } : row
                    ));
                }
            }
        }
        setIcdDialogOpen(false);
        setCurrentEditingRowId(null);
        setCurrentEditingTable(null);
        setCurrentEditingField(null);
    };

    return (
        <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-slate-100/50 border-b">
                <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight">Information Codes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {/* Principal Diagnosis Section */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Principal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-700">Principal Diagnosis</Label>
                            <div className="relative">
                                <Input
                                    value={principalDiagnosis}
                                    onChange={(e) => setPrincipalDiagnosis(e.target.value)}
                                    placeholder="Enter diagnosis code"
                                    className="pr-8"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-9 w-8"
                                    onClick={() => handleOpenICDSearch('', 'principal-diagnosis', 'code')}
                                >
                                    <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700">POA (Present on Admission)</Label>
                            <Select value={poa} onValueChange={setPoa}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select POA" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Y">Y - Yes</SelectItem>
                                    <SelectItem value="N">N - No</SelectItem>
                                    <SelectItem value="U">U - Unknown</SelectItem>
                                    <SelectItem value="W">W - Clinically Undetermined</SelectItem>
                                    <SelectItem value="1">1 - Unreported/Not Used</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700">Principal Procedure</Label>
                            <div className="relative">
                                <Input
                                    value={principalProcedure}
                                    onChange={(e) => setPrincipalProcedure(e.target.value)}
                                    placeholder="Enter procedure code"
                                    className="pr-8"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-9 w-8"
                                    onClick={() => handleOpenICDSearch('', 'principal-procedure', 'code')}
                                >
                                    <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700">Principal Procedure Date</Label>
                            <Input
                                type="date"
                                value={principalProcedureDate}
                                onChange={(e) => setPrincipalProcedureDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Admitting Diagnosis Section */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Admitting Diagnosis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-700">Admitting Diagnosis</Label>
                            <div className="relative">
                                <Input
                                    value={admittingDiagnosis}
                                    onChange={(e) => setAdmittingDiagnosis(e.target.value)}
                                    placeholder="Enter admitting diagnosis code"
                                    className="pr-8"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-9 w-8"
                                    onClick={() => handleOpenICDSearch('', 'admitting-diagnosis', 'code')}
                                >
                                    <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* External Cause of Injury Table */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">External Cause of Injury</h3>
                    {externalCauseRows.length > 0 && (
                        <div className="rounded-md border bg-white overflow-hidden">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow>
                                        <TableHead className="w-[200px]">Code</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="w-[100px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {externalCauseRows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.code}
                                                        onChange={(e) => updateExternalCauseRow(row.id, 'code', e.target.value)}
                                                        placeholder="Code"
                                                        className="h-9 pr-8"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'external')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.description}
                                                        onChange={(e) => updateExternalCauseRow(row.id, 'description', e.target.value)}
                                                        placeholder="Description"
                                                        className="h-9 pr-8"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'external')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2 text-center">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => deleteExternalCauseRow(row.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                    <Button onClick={addExternalCauseRow} variant="outline" className="w-full border-dashed text-primary hover:bg-primary/5">
                        <Plus className="h-4 w-4 mr-2" /> Add External Cause of Injury
                    </Button>
                </div>

                {/* Patient's Reason for Visit Table */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Patient&apos;s Reason for Visit</h3>
                    {patientReasonRows.length > 0 && (
                        <div className="rounded-md border bg-white overflow-hidden">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow>
                                        <TableHead className="w-[200px]">Code</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="w-[100px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patientReasonRows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.code}
                                                        onChange={(e) => updatePatientReasonRow(row.id, 'code', e.target.value)}
                                                        placeholder="Code"
                                                        className="h-9 pr-8"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'patient-reason', 'code')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.description}
                                                        onChange={(e) => updatePatientReasonRow(row.id, 'description', e.target.value)}
                                                        placeholder="Description"
                                                        className="h-9 pr-8"
                                                        readOnly
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'patient-reason', 'description')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2 text-center">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => deletePatientReasonRow(row.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                    <Button onClick={addPatientReasonRow} variant="outline" className="w-full border-dashed text-primary hover:bg-primary/5">
                        <Plus className="h-4 w-4 mr-2" /> Add Patient&apos;s Reason for Visit
                    </Button>
                </div>

                {/* Other Diagnosis Table */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Other Diagnosis</h3>
                    {otherDiagnosisRows.length > 0 && (
                        <div className="rounded-md border bg-white overflow-hidden">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow>
                                        <TableHead className="w-[180px]">Code</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="w-[120px]">POA</TableHead>
                                        <TableHead className="w-[100px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {otherDiagnosisRows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.code}
                                                        onChange={(e) => updateOtherDiagnosisRow(row.id, 'code', e.target.value)}
                                                        placeholder="Code"
                                                        className="h-9 pr-8"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'other-diagnosis')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.description}
                                                        onChange={(e) => updateOtherDiagnosisRow(row.id, 'description', e.target.value)}
                                                        placeholder="Description"
                                                        className="h-9 pr-8"
                                                        readOnly
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'other-diagnosis')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <Select value={row.poa} onValueChange={(val) => updateOtherDiagnosisRow(row.id, 'poa', val)}>
                                                    <SelectTrigger className="h-9">
                                                        <SelectValue placeholder="POA" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Y">Y</SelectItem>
                                                        <SelectItem value="N">N</SelectItem>
                                                        <SelectItem value="U">U</SelectItem>
                                                        <SelectItem value="W">W</SelectItem>
                                                        <SelectItem value="1">1</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell className="p-2 text-center">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => deleteOtherDiagnosisRow(row.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                    <Button onClick={addOtherDiagnosisRow} variant="outline" className="w-full border-dashed text-primary hover:bg-primary/5">
                        <Plus className="h-4 w-4 mr-2" /> Add Other Diagnosis
                    </Button>
                </div>

                {/* Other Procedure Table */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Other Procedure</h3>
                    {otherProcedureRows.length > 0 && (
                        <div className="rounded-md border bg-white overflow-hidden">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow>
                                        <TableHead className="w-[200px]">Code</TableHead>
                                        <TableHead className="w-[200px]">Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="w-[100px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {otherProcedureRows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.code}
                                                        onChange={(e) => updateOtherProcedureRow(row.id, 'code', e.target.value)}
                                                        placeholder="Code"
                                                        className="h-9 pr-8"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'other-procedure', 'code')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <Input
                                                    type="date"
                                                    value={row.date}
                                                    onChange={(e) => updateOtherProcedureRow(row.id, 'date', e.target.value)}
                                                    className="h-9"
                                                />
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.description}
                                                        onChange={(e) => updateOtherProcedureRow(row.id, 'description', e.target.value)}
                                                        placeholder="Description"
                                                        className="h-9 pr-8"
                                                        readOnly
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'other-procedure', 'description')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2 text-center">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => deleteOtherProcedureRow(row.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                    <Button onClick={addOtherProcedureRow} variant="outline" className="w-full border-dashed text-primary hover:bg-primary/5">
                        <Plus className="h-4 w-4 mr-2" /> Add Other Procedure
                    </Button>
                </div>

                {/* Occurrence Span Table */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Occurrence Span</h3>
                    {occurrenceSpanRows.length > 0 && (
                        <div className="rounded-md border bg-white overflow-hidden">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow>
                                        <TableHead className="w-[150px]">Code</TableHead>
                                        <TableHead className="w-[180px]">From</TableHead>
                                        <TableHead className="w-[180px]">To</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="w-[100px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {occurrenceSpanRows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.code}
                                                        onChange={(e) => updateOccurrenceSpanRow(row.id, 'code', e.target.value)}
                                                        placeholder="Code"
                                                        className="h-9 pr-8"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'occurrence-span', 'code')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <Input
                                                    type="date"
                                                    value={row.from}
                                                    onChange={(e) => updateOccurrenceSpanRow(row.id, 'from', e.target.value)}
                                                    className="h-9"
                                                />
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <Input
                                                    type="date"
                                                    value={row.to}
                                                    onChange={(e) => updateOccurrenceSpanRow(row.id, 'to', e.target.value)}
                                                    className="h-9"
                                                />
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.description}
                                                        onChange={(e) => updateOccurrenceSpanRow(row.id, 'description', e.target.value)}
                                                        placeholder="Description"
                                                        className="h-9 pr-8"
                                                        readOnly
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'occurrence-span', 'description')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2 text-center">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => deleteOccurrenceSpanRow(row.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                    <Button onClick={addOccurrenceSpanRow} variant="outline" className="w-full border-dashed text-primary hover:bg-primary/5">
                        <Plus className="h-4 w-4 mr-2" /> Add Occurrence Span
                    </Button>
                </div>

                {/* Occurrence Table */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Occurrence</h3>
                    {occurrenceRows.length > 0 && (
                        <div className="rounded-md border bg-white overflow-hidden">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow>
                                        <TableHead className="w-[200px]">Code</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="w-[100px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {occurrenceRows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.code}
                                                        onChange={(e) => updateOccurrenceRow(row.id, 'code', e.target.value)}
                                                        placeholder="Code"
                                                        className="h-9 pr-8"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'occurrence', 'code')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.description}
                                                        onChange={(e) => updateOccurrenceRow(row.id, 'description', e.target.value)}
                                                        placeholder="Description"
                                                        className="h-9 pr-8"
                                                        readOnly
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'occurrence', 'description')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2 text-center">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => deleteOccurrenceRow(row.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                    <Button onClick={addOccurrenceRow} variant="outline" className="w-full border-dashed text-primary hover:bg-primary/5">
                        <Plus className="h-4 w-4 mr-2" /> Add Occurrence
                    </Button>
                </div>

                {/* Value Codes Table */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Value Codes</h3>
                    {valueCodeRows.length > 0 && (
                        <div className="rounded-md border bg-white overflow-hidden">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow>
                                        <TableHead className="w-[150px]">Code</TableHead>
                                        <TableHead className="w-[180px]">Amount</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="w-[100px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {valueCodeRows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.code}
                                                        onChange={(e) => updateValueCodeRow(row.id, 'code', e.target.value)}
                                                        placeholder="Code"
                                                        className="h-9 pr-8"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'value-code', 'code')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <Input
                                                    type="number"
                                                    value={row.amount}
                                                    onChange={(e) => updateValueCodeRow(row.id, 'amount', e.target.value)}
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    className="h-9"
                                                />
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <div className="relative">
                                                    <Input
                                                        value={row.description}
                                                        onChange={(e) => updateValueCodeRow(row.id, 'description', e.target.value)}
                                                        placeholder="Description"
                                                        className="h-9 pr-8"
                                                        readOnly
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-9 w-8"
                                                        onClick={() => handleOpenICDSearch(row.id, 'value-code', 'description')}
                                                    >
                                                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-2 text-center">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => deleteValueCodeRow(row.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                    <Button onClick={addValueCodeRow} variant="outline" className="w-full border-dashed text-primary hover:bg-primary/5">
                        <Plus className="h-4 w-4 mr-2" /> Add Value Code
                    </Button>
                </div>
            </CardContent>

            {/* ICD Search Dialog */}
            <SearchICDDialog
                open={icdDialogOpen}
                onOpenChange={setIcdDialogOpen}
                onSelect={handleICDSelect}
            />
        </Card>
    );
}
