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
import { Trash2, Plus, GripVertical, Search, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

// Sortable Row Component
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

    return (
        <TableRow ref={setNodeRef} style={style} className={cn("bg-white", isDragging && "shadow-xl border-primary/20 bg-slate-50 opacity-90")}>
            {/* Drag Handle */}
            <TableCell className="w-[40px] p-2 text-center text-slate-400">
                <div {...attributes} {...listeners} className="cursor-grab hover:text-slate-600 active:cursor-grabbing">
                    <GripVertical className="h-4 w-4 mx-auto" />
                </div>
            </TableCell>

            {/* Service Date */}
            <TableCell className="p-2">
                <Input
                    value={row.serviceDate}
                    onChange={(e) => onUpdate(row.id, 'serviceDate', e.target.value)}
                    className="h-8 min-w-[100px]"
                    placeholder="MM/DD/YYYY"
                />
            </TableCell>

            {/* HCPCS/CPT */}
            <TableCell className="p-2">
                <div className="relative">
                    <Input
                        value={row.hcpcsCpt}
                        onChange={(e) => onUpdate(row.id, 'hcpcsCpt', e.target.value)}
                        className="h-8 min-w-[100px] pr-7"
                        placeholder="Code"
                    />
                    <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
            </TableCell>

            {/* Modifiers 1-4 */}
            {['mod1', 'mod2', 'mod3', 'mod4'].map((mod) => (
                <TableCell key={mod} className="p-2 w-[60px]">
                    <Input
                        value={row[mod as keyof ChargeRow]}
                        onChange={(e) => onUpdate(row.id, mod as keyof ChargeRow, e.target.value)}
                        className="h-8 px-1 text-center"
                    />
                </TableCell>
            ))}

            {/* Rev Code */}
            <TableCell className="p-2">
                <div className="relative">
                    <Input
                        value={row.revCode}
                        onChange={(e) => onUpdate(row.id, 'revCode', e.target.value)}
                        className="h-8 min-w-[80px] pr-7"
                        placeholder="Rev"
                    />
                    <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />
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

            {/* Status */}
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

const ChargesTable: React.FC<ChargesTableProps> = ({ initialData = [] }) => {
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
                                <TableHead className="min-w-[110px]">Service Date</TableHead>
                                <TableHead className="min-w-[130px]">HCPCS/CPT</TableHead>
                                <TableHead className="w-[60px] text-center">Mod1</TableHead>
                                <TableHead className="w-[60px] text-center">Mod2</TableHead>
                                <TableHead className="w-[60px] text-center">Mod3</TableHead>
                                <TableHead className="w-[60px] text-center">Mod4</TableHead>
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

export default ChargesTable;
