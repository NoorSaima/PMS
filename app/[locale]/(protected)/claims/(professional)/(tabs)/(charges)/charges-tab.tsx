"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, GripVertical, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SearchCPTDialog } from './search-cpt-dialog';
import { SearchModifierDialog } from './search-modifier-dialog';
import { SearchPOSDialog } from './search-pos-dialog';
import { SearchTOSDialog } from './search-tos-dialog';
import { SelectDXPointersDialog } from './select-dx-pointers-dialog';

// Define the shape of a charge row
interface ChargeRow {
    id: string;
    fromDate: string;
    toDate: string;
    procedure: string;
    mod1: string;
    mod2: string;
    mod3: string;
    mod4: string;
    pos: string;
    tos: string;
    dx: string;
    unitPrice: string;
    units: string;
    amount: string;
    status: string;
}

// Sortable Row Component
const SortableChargeRow = ({
    row,
    onDelete,
    onUpdate,
    onOpenCPTDialog,
    onOpenModifierDialog,
    onOpenPOSDialog,
    onOpenTOSDialog,
    onOpenDXDialog,
}: {
    row: ChargeRow;
    onDelete: (id: string) => void;
    onUpdate: (id: string, field: keyof ChargeRow, value: string) => void;
    onOpenCPTDialog: (id: string) => void;
    onOpenModifierDialog: (id: string, modField: 'mod1' | 'mod2' | 'mod3' | 'mod4') => void;
    onOpenPOSDialog: (id: string) => void;
    onOpenTOSDialog: (id: string) => void;
    onOpenDXDialog: (id: string) => void;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: row.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 20 : 'auto',
        position: isDragging ? 'relative' as const : 'static' as const,
    };

    return (
        <TableRow ref={setNodeRef} style={style} className={cn("bg-white", isDragging && "shadow-xl border-primary/20 bg-slate-50 opacity-90")}>
            {/* Drag Handle */}
            <TableCell className="w-[40px] p-2 text-center text-slate-400">
                <div {...attributes} {...listeners} className="cursor-grab hover:text-slate-600 active:cursor-grabbing">
                    <GripVertical className="h-4 w-4 mx-auto" />
                </div>
            </TableCell>

            {/* From Date */}
            <TableCell className="p-2">
                <Input
                    type="date"
                    value={row.fromDate}
                    onChange={(e) => onUpdate(row.id, 'fromDate', e.target.value)}
                    className="h-8 min-w-[130px]"
                />
            </TableCell>

            {/* To Date */}
            <TableCell className="p-2">
                <Input
                    type="date"
                    value={row.toDate}
                    onChange={(e) => onUpdate(row.id, 'toDate', e.target.value)}
                    className="h-8 min-w-[130px]"
                />
            </TableCell>

            {/* Procedure */}
            <TableCell className="p-2">
                <div className="relative">
                    <Input
                        value={row.procedure}
                        onChange={(e) => onUpdate(row.id, 'procedure', e.target.value)}
                        className="h-8 min-w-[100px] pr-7"
                        placeholder="CPT"
                    />
                    <Search
                        onClick={() => onOpenCPTDialog(row.id)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary"
                    />
                </div>
            </TableCell>

            {/* Modifiers 1-4 */}
            {(['mod1', 'mod2', 'mod3', 'mod4'] as const).map((mod) => (
                <TableCell key={mod} className="p-2">
                    <div className="relative">
                        <Input
                            value={row[mod]}
                            onChange={(e) => onUpdate(row.id, mod, e.target.value)}
                            className="h-8 w-[60px] pr-6 text-center text-xs"
                            maxLength={2}
                        />
                        <Search
                            onClick={() => onOpenModifierDialog(row.id, mod)}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary"
                        />
                    </div>
                </TableCell>
            ))}

            {/* POS */}
            <TableCell className="p-2">
                <div className="relative">
                    <Input
                        value={row.pos}
                        onChange={(e) => onUpdate(row.id, 'pos', e.target.value)}
                        className="h-8 w-[70px] pr-6 text-center"
                        maxLength={2}
                    />
                    <Search
                        onClick={() => onOpenPOSDialog(row.id)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary"
                    />
                </div>
            </TableCell>

            {/* TOS */}
            <TableCell className="p-2">
                <div className="relative">
                    <Input
                        value={row.tos}
                        onChange={(e) => onUpdate(row.id, 'tos', e.target.value)}
                        className="h-8 w-[70px] pr-6 text-center"
                        maxLength={2}
                    />
                    <Search
                        onClick={() => onOpenTOSDialog(row.id)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary"
                    />
                </div>
            </TableCell>

            {/* DX */}
            <TableCell className="p-2">
                <div className="relative">
                    <Input
                        value={row.dx}
                        onChange={(e) => onUpdate(row.id, 'dx', e.target.value)}
                        className="h-8 w-[80px] pr-6 text-center text-xs"
                        placeholder="A,B,C"
                        readOnly
                    />
                    <Search
                        onClick={() => onOpenDXDialog(row.id)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary"
                    />
                </div>
            </TableCell>

            {/* Unit Price */}
            <TableCell className="p-2">
                <Input
                    value={row.unitPrice}
                    onChange={(e) => onUpdate(row.id, 'unitPrice', e.target.value)}
                    className="h-8 w-[90px] text-right"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                />
            </TableCell>

            {/* Units */}
            <TableCell className="p-2">
                <Input
                    value={row.units}
                    onChange={(e) => onUpdate(row.id, 'units', e.target.value)}
                    className="h-8 w-[60px] text-center"
                    placeholder="1"
                    type="number"
                />
            </TableCell>

            {/* Amount */}
            <TableCell className="p-2">
                <Input
                    value={row.amount}
                    className="h-8 w-[90px] text-right font-medium bg-slate-50"
                    readOnly
                />
            </TableCell>

            {/* Status */}
            <TableCell className="p-2">
                <Select value={row.status} onValueChange={(val) => onUpdate(row.id, 'status', val)}>
                    <SelectTrigger className="h-8 w-[100px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="billed">Billed</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="denied">Denied</SelectItem>
                    </SelectContent>
                </Select>
            </TableCell>

            {/* Delete */}
            <TableCell className="p-2 text-center">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(row.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default function ProfessionalChargesTab() {
    // ICD Codes State (A-L)
    const [icdCodes, setIcdCodes] = useState<{ [key: string]: string }>({
        A: '', B: '', C: '', D: '', E: '', F: '',
        G: '', H: '', I: '', J: '', K: '', L: ''
    });

    // Billing Information State
    const [billingTo, setBillingTo] = useState('');
    const [setAllChargesTo, setSetAllChargesTo] = useState('');
    const [dosFrom, setDosFrom] = useState('');
    const [dosTo, setDosTo] = useState('');

    // Charges Table State
    const [rows, setRows] = useState<ChargeRow[]>([{
        id: '1',
        fromDate: '',
        toDate: '',
        procedure: '',
        mod1: '',
        mod2: '',
        mod3: '',
        mod4: '',
        pos: '',
        tos: '',
        dx: '',
        unitPrice: '',
        units: '',
        amount: '0.00',
        status: 'active'
    }]);

    // Dialog States
    const [cptDialogOpen, setCptDialogOpen] = useState(false);
    const [modifierDialogOpen, setModifierDialogOpen] = useState(false);
    const [posDialogOpen, setPosDialogOpen] = useState(false);
    const [tosDialogOpen, setTosDialogOpen] = useState(false);
    const [dxDialogOpen, setDxDialogOpen] = useState(false);
    const [currentEditingRow, setCurrentEditingRow] = useState<string | null>(null);
    const [currentModifierField, setCurrentModifierField] = useState<'mod1' | 'mod2' | 'mod3' | 'mod4' | null>(null);

    // Drag and Drop Sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setRows((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const addRow = () => {
        const newId = (Math.max(...rows.map(r => parseInt(r.id)), 0) + 1).toString();
        setRows([...rows, {
            id: newId,
            fromDate: dosFrom, // Auto-fill from DOS From if available
            toDate: dosTo, // Auto-fill from DOS To if available
            procedure: '',
            mod1: '',
            mod2: '',
            mod3: '',
            mod4: '',
            pos: '',
            tos: '',
            dx: '',
            unitPrice: '',
            units: '1',
            amount: '0.00',
            status: 'active'
        }]);
    };

    const deleteRow = (id: string) => {
        if (rows.length > 1) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const updateRow = (id: string, field: keyof ChargeRow, value: string) => {
        setRows(rows.map(row => {
            if (row.id === id) {
                const updatedRow = { ...row, [field]: value };
                // Auto-calculate amount
                if (field === 'unitPrice' || field === 'units') {
                    const price = parseFloat(updatedRow.unitPrice) || 0;
                    const units = parseFloat(updatedRow.units) || 0;
                    updatedRow.amount = (price * units).toFixed(2);
                }
                return updatedRow;
            }
            return row;
        }));
    };

    // Calculate total charges
    const totalCharges = rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);

    // Dialog Handlers
    const handleOpenCPTDialog = (id: string) => {
        setCurrentEditingRow(id);
        setCptDialogOpen(true);
    };

    const handleCPTSelect = (code: string, description: string) => {
        if (currentEditingRow) {
            updateRow(currentEditingRow, 'procedure', code);
        }
    };

    const handleOpenModifierDialog = (id: string, modField: 'mod1' | 'mod2' | 'mod3' | 'mod4') => {
        setCurrentEditingRow(id);
        setCurrentModifierField(modField);
        setModifierDialogOpen(true);
    };

    const handleModifierSelect = (modifier: string) => {
        if (currentEditingRow && currentModifierField) {
            updateRow(currentEditingRow, currentModifierField, modifier);
        }
    };

    const handleOpenPOSDialog = (id: string) => {
        setCurrentEditingRow(id);
        setPosDialogOpen(true);
    };

    const handlePOSSelect = (code: string) => {
        if (currentEditingRow) {
            updateRow(currentEditingRow, 'pos', code);
        }
    };

    const handleOpenTOSDialog = (id: string) => {
        setCurrentEditingRow(id);
        setTosDialogOpen(true);
    };

    const handleTOSSelect = (code: string) => {
        if (currentEditingRow) {
            updateRow(currentEditingRow, 'tos', code);
        }
    };

    const handleOpenDXDialog = (id: string) => {
        setCurrentEditingRow(id);
        setDxDialogOpen(true);
    };

    const handleDXSelect = (pointers: string[]) => {
        if (currentEditingRow) {
            updateRow(currentEditingRow, 'dx', pointers.join(','));
        }
    };

    const updateIcdCode = (key: string, value: string) => {
        setIcdCodes(prev => ({ ...prev, [key]: value }));
    };

    return (
        <>
            <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="bg-slate-100/50 border-b">
                    <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight">Professional Charges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    {/* ICD Codes Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">ICD Codes</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {Object.keys(icdCodes).map((key) => (
                                <div key={key} className="space-y-2">
                                    <Label className="text-slate-700 text-xs">ICD {key}</Label>
                                    <Input
                                        value={icdCodes[key]}
                                        onChange={(e) => updateIcdCode(key, e.target.value)}
                                        placeholder={`ICD ${key}`}
                                        className="h-9"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Billing Information Section */}
                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Billing Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Billing To</Label>
                                <Select value={billingTo} onValueChange={setBillingTo}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Billing To" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="insurance">Insurance</SelectItem>
                                        <SelectItem value="patient">Patient</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700">Set All Charges To</Label>
                                <Input
                                    value={setAllChargesTo}
                                    onChange={(e) => setSetAllChargesTo(e.target.value)}
                                    placeholder="Enter value"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700">DOS From</Label>
                                <Input
                                    type="date"
                                    value={dosFrom}
                                    onChange={(e) => setDosFrom(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700">DOS To</Label>
                                <Input
                                    type="date"
                                    value={dosTo}
                                    onChange={(e) => setDosTo(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Charges Table Section */}
                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Charges</h3>

                        <div className="rounded-md border bg-white overflow-x-auto">
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <Table>
                                    <TableHeader className="bg-slate-50">
                                        <TableRow>
                                            <TableHead className="w-[40px]"></TableHead>
                                            <TableHead className="min-w-[140px]">From</TableHead>
                                            <TableHead className="min-w-[140px]">To</TableHead>
                                            <TableHead className="min-w-[110px]">Procedure</TableHead>
                                            <TableHead className="w-[70px] text-center">Mod1</TableHead>
                                            <TableHead className="w-[70px] text-center">Mod2</TableHead>
                                            <TableHead className="w-[70px] text-center">Mod3</TableHead>
                                            <TableHead className="w-[70px] text-center">Mod4</TableHead>
                                            <TableHead className="w-[80px] text-center">POS</TableHead>
                                            <TableHead className="w-[80px] text-center">TOS</TableHead>
                                            <TableHead className="w-[90px] text-center">DX</TableHead>
                                            <TableHead className="text-right">Unit Price</TableHead>
                                            <TableHead className="text-center">Units</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                            <TableHead className="w-[110px]">Status</TableHead>
                                            <TableHead className="w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <SortableContext
                                            items={rows.map(r => r.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {rows.map((row) => (
                                                <SortableChargeRow
                                                    key={row.id}
                                                    row={row}
                                                    onDelete={deleteRow}
                                                    onUpdate={updateRow}
                                                    onOpenCPTDialog={handleOpenCPTDialog}
                                                    onOpenModifierDialog={handleOpenModifierDialog}
                                                    onOpenPOSDialog={handleOpenPOSDialog}
                                                    onOpenTOSDialog={handleOpenTOSDialog}
                                                    onOpenDXDialog={handleOpenDXDialog}
                                                />
                                            ))}
                                        </SortableContext>
                                    </TableBody>
                                </Table>
                            </DndContext>
                        </div>

                        <div className="flex justify-between items-center">
                            <Button onClick={addRow} variant="outline" className="border-dashed text-primary hover:bg-primary/5">
                                <Plus className="h-4 w-4 mr-2" /> Add Charge Line
                            </Button>

                            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-md border">
                                <span className="text-sm font-medium text-slate-600">Total Charges:</span>
                                <span className="text-lg font-bold text-primary">${totalCharges.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Dialogs */}
            <SearchCPTDialog
                open={cptDialogOpen}
                onOpenChange={setCptDialogOpen}
                onSelect={handleCPTSelect}
            />
            <SearchModifierDialog
                open={modifierDialogOpen}
                onOpenChange={setModifierDialogOpen}
                onSelect={handleModifierSelect}
            />
            <SearchPOSDialog
                open={posDialogOpen}
                onOpenChange={setPosDialogOpen}
                onSelect={handlePOSSelect}
            />
            <SearchTOSDialog
                open={tosDialogOpen}
                onOpenChange={setTosDialogOpen}
                onSelect={handleTOSSelect}
            />
            <SelectDXPointersDialog
                open={dxDialogOpen}
                onOpenChange={setDxDialogOpen}
                onSelect={handleDXSelect}
                icdCodes={icdCodes}
            />
        </>
    );
}
