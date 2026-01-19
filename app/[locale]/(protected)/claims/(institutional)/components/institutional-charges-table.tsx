"use client";

import React, { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, GripVertical, Search, MoreHorizontal, Calendar as CalendarIcon, FileText, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the shape of a charge row
export interface ChargeRow {
    id: string;
    serviceDate: string;
    hcpcsCpt: string;
    mod1: string;
    mod2: string;
    mod3: string;
    mod4: string;
    revCode: string; // Institutional only typically, but requested generally
    description: string;
    unitPrice: string;
    units: string;
    amount: string;
    status: string;
}

interface ChargesTableProps {
    initialData?: ChargeRow[];
}

const SortableRow = ({ row, onDelete, onUpdate }: { row: ChargeRow; onDelete: (id: string) => void; onUpdate: (id: string, field: keyof ChargeRow, value: string) => void }) => {
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

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            onUpdate(row.id, 'serviceDate', format(date, 'MM/dd/yyyy'));
        }
    };

    return (
        <TableRow ref={setNodeRef} style={style} className={cn("bg-white", isDragging && "shadow-xl border-primary/20 bg-slate-50 opacity-90")}>
            {/* Drag Handle */}
            <TableCell className="w-[40px] p-2 text-center text-slate-400">
                <div {...attributes} {...listeners} className="cursor-grab hover:text-slate-600 active:cursor-grabbing">
                    <GripVertical className="h-4 w-4 mx-auto" />
                </div>
            </TableCell>

            {/* Service Date (Calendar) */}
            <TableCell className="p-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "h-8 w-full min-w-[130px] justify-start text-left font-normal bg-white border-slate-200",
                                !row.serviceDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-3.5 w-3.5 opacity-70" />
                            {row.serviceDate ? row.serviceDate : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-[1000]" align="start">
                        <Calendar
                            mode="single"
                            selected={row.serviceDate ? new Date(row.serviceDate) : undefined}
                            onSelect={handleDateSelect}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </TableCell>

            {/* HCPCS/CPT (Input + Search Dialog) */}
            <TableCell className="p-2">
                <div className="relative">
                    <Input
                        value={row.hcpcsCpt}
                        onChange={(e) => onUpdate(row.id, 'hcpcsCpt', e.target.value)}
                        className="h-8 min-w-[100px] pr-8"
                        placeholder="Code"
                    />
                    <CPTSearchDialog onSelect={(code) => onUpdate(row.id, 'hcpcsCpt', code)}>
                        <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />
                    </CPTSearchDialog>
                </div>
            </TableCell>

            {/* Modifiers 1-4 */}
            {['mod1', 'mod2', 'mod3', 'mod4'].map((mod) => (
                <TableCell key={mod} className="p-2 w-[70px]">
                    <div className="relative">
                        <Input
                            value={row[mod as keyof ChargeRow]}
                            onChange={(e) => onUpdate(row.id, mod as keyof ChargeRow, e.target.value)}
                            className="h-8 px-1 text-center pr-5"
                        />
                        <ModifierSearchDialog onSelect={(code) => onUpdate(row.id, mod as keyof ChargeRow, code)}>
                            <Search className="absolute right-1 top-1/2 -translate-y-1/2 h-2.5 w-2.5 text-muted-foreground cursor-pointer hover:text-primary" />
                        </ModifierSearchDialog>
                    </div>
                </TableCell>
            ))}

            {/* Rev Code */}
            <TableCell className="p-2">
                <div className="relative">
                    <Input
                        value={row.revCode}
                        onChange={(e) => onUpdate(row.id, 'revCode', e.target.value)}
                        className="h-8 min-w-[80px] pr-8"
                        placeholder="Rev"
                    />
                    <RevCodeSearchDialog onSelect={(code) => onUpdate(row.id, 'revCode', code)}>
                        <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />
                    </RevCodeSearchDialog>
                </div>
            </TableCell>

            {/* Description */}
            <TableCell className="p-2">
                <Input
                    value={row.description}
                    onChange={(e) => onUpdate(row.id, 'description', e.target.value)}
                    className="h-8 min-w-[150px]"
                    placeholder="Description"
                />
            </TableCell>

            {/* Unit Price */}
            <TableCell className="p-2">
                <Input
                    value={row.unitPrice}
                    onChange={(e) => onUpdate(row.id, 'unitPrice', e.target.value)}
                    className="h-8 w-[80px] text-right"
                    placeholder="0.00"
                />
            </TableCell>

            {/* Units */}
            <TableCell className="p-2">
                <Input
                    value={row.units}
                    onChange={(e) => onUpdate(row.id, 'units', e.target.value)}
                    className="h-8 w-[60px] text-center"
                    placeholder="1"
                />
            </TableCell>

            {/* Amount */}
            <TableCell className="p-2">
                <Input
                    value={row.amount}
                    onChange={(e) => onUpdate(row.id, 'amount', e.target.value)}
                    className="h-8 w-[80px] text-right font-medium"
                    placeholder="0.00"
                    readOnly
                />
            </TableCell>

            {/* Status (Select) */}
            <TableCell className="p-2 w-[110px]">
                <Select value={row.status} onValueChange={(val) => onUpdate(row.id, 'status', val)}>
                    <SelectTrigger className="h-8">
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

            {/* Other */}
            <TableCell className="p-2 text-center">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
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

// Modifier Search Dialog
const ModifierSearchDialog = ({ children, onSelect }: { children: React.ReactNode, onSelect: (code: string) => void }) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelect = (code: string) => {
        onSelect(code);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Search Modifiers</DialogTitle>
                </DialogHeader>

                <div className="relative mb-4 mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search modifiers..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="h-[300px] overflow-auto border rounded-md p-2 space-y-2">
                    {[
                        { code: '25', desc: 'Significant, separately identifiable evaluation' },
                        { code: '26', desc: 'Professional component' },
                        { code: '59', desc: 'Distinct procedural service' },
                        { code: 'LT', desc: 'Left side' },
                        { code: 'RT', desc: 'Right side' },
                    ].filter(i => i.code.includes(searchTerm) || i.desc.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                        <div
                            key={item.code}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors"
                            onClick={() => handleSelect(item.code)}
                        >
                            <div className="flex flex-col">
                                <span className="font-bold text-slate-800">{item.code}</span>
                                <span className="text-sm text-muted-foreground">{item.desc}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Check className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Revenue Code Search Dialog
const RevCodeSearchDialog = ({ children, onSelect }: { children: React.ReactNode, onSelect: (code: string) => void }) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelect = (code: string) => {
        onSelect(code);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Search Revenue Codes</DialogTitle>
                </DialogHeader>

                <div className="relative mb-4 mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search rev codes..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="h-[300px] overflow-auto border rounded-md p-2 space-y-2">
                    {[
                        { code: '0100', desc: 'All Inclusive Room and Board plus Ancillary' },
                        { code: '0110', desc: 'Room & Board - Private' },
                        { code: '0120', desc: 'Room & Board - Semi-Private (Two Beds)' },
                        { code: '0250', desc: 'Pharmacy - General Classification' },
                        { code: '0270', desc: 'Medical/Surgical Supplies' },
                    ].filter(i => i.code.includes(searchTerm) || i.desc.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                        <div
                            key={item.code}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors"
                            onClick={() => handleSelect(item.code)}
                        >
                            <div className="flex flex-col">
                                <span className="font-bold text-slate-800">{item.code}</span>
                                <span className="text-sm text-muted-foreground">{item.desc}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Check className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

// CPT Dialog Component
const CPTSearchDialog = ({ children, onSelect }: { children: React.ReactNode, onSelect: (code: string) => void }) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelect = (code: string) => {
        onSelect(code);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent size='md'>
                <DialogHeader>
                    <DialogTitle>Search CPT/HCPCS Codes</DialogTitle>
                </DialogHeader>

                <div className="relative mb-4 mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by code or description..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Tabs defaultValue="cpt-codes" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="cpt-codes">CPT Codes</TabsTrigger>
                        <TabsTrigger value="bulk-charges">Bulk Charges</TabsTrigger>
                    </TabsList>

                    <TabsContent value="cpt-codes" className="h-[300px] overflow-auto border rounded-md mt-2 p-2 space-y-2">
                        {[
                            { code: '99213', desc: 'Office/outpatient visit for established patient' },
                            { code: '99214', desc: 'Office/outpatient visit for established patient (moderate)' },
                            { code: '90837', desc: 'Psychotherapy, 60 minutes with patient' },
                            { code: '36415', desc: 'Collection of venous blood by venipuncture' },
                        ].filter(i => i.code.includes(searchTerm) || i.desc.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                            <div
                                key={item.code}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors"
                                onClick={() => handleSelect(item.code)}
                            >
                                <div className="flex flex-col">
                                    <span className="font-bold text-slate-800">{item.code}</span>
                                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                                </div>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="bulk-charges" className="h-[300px] flex items-center justify-center text-muted-foreground border rounded-md mt-2 bg-slate-50 border-dashed">
                        Select multiple common charges here
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

const InstitutionalChargesTable: React.FC<ChargesTableProps> = ({ initialData = [] }) => {
    // Initialize with one empty row if no data
    const [rows, setRows] = useState<ChargeRow[]>(initialData.length > 0 ? initialData : [{
        id: '1',
        serviceDate: '',
        hcpcsCpt: '',
        mod1: '',
        mod2: '',
        mod3: '',
        mod4: '',
        revCode: '',
        description: '',
        unitPrice: '',
        units: '',
        amount: '',
        status: 'active'
    }]);

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
        const newId = (Math.max(...rows.map(r => parseInt(r.id))) + 1).toString();
        setRows([...rows, {
            id: newId,
            serviceDate: '',
            hcpcsCpt: '',
            mod1: '',
            mod2: '',
            mod3: '',
            mod4: '',
            revCode: '',
            description: '',
            unitPrice: '',
            units: '',
            amount: '',
            status: 'active'
        }]);
    };

    const deleteRow = (id: string) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const updateRow = (id: string, field: keyof ChargeRow, value: string) => {
        setRows(rows.map(row => {
            if (row.id === id) {
                const updatedRow = { ...row, [field]: value };
                // Simple auto-calculation logic for amount
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

    return (
        <div className="space-y-4">
            <div className="rounded-md border bg-white overflow-hidden">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="w-[40px]"></TableHead>
                                <TableHead className="min-w-[150px]">Service Date</TableHead>
                                <TableHead className="min-w-[130px]">HCPCS/CPT</TableHead>
                                <TableHead className="w-[70px] text-center">Mod1</TableHead>
                                <TableHead className="w-[70px] text-center">Mod2</TableHead>
                                <TableHead className="w-[70px] text-center">Mod3</TableHead>
                                <TableHead className="w-[70px] text-center">Mod4</TableHead>
                                <TableHead className="min-w-[100px]">Rev Code</TableHead>
                                <TableHead className="min-w-[160px]">Description</TableHead>
                                <TableHead className="text-right">Unit Price</TableHead>
                                <TableHead className="text-center">Units</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="w-[110px]">Status</TableHead>
                                <TableHead className="text-center">Other</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <SortableContext
                                items={rows.map(r => r.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {rows.map((row) => (
                                    <SortableRow
                                        key={row.id}
                                        row={row}
                                        onDelete={deleteRow}
                                        onUpdate={updateRow}
                                    />
                                ))}
                            </SortableContext>
                        </TableBody>
                    </Table>
                </DndContext>
            </div>

            <Button onClick={addRow} variant="outline" className="w-full border-dashed text-primary hover:bg-primary/5">
                <Plus className="h-4 w-4 mr-2" /> Add Charge Line
            </Button>
        </div>
    );
};

export default InstitutionalChargesTable;
