"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SearchPOSDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect?: (code: string) => void;
}

export const SearchPOSDialog: React.FC<SearchPOSDialogProps> = ({ open, onOpenChange, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Placeholder data - will be replaced with actual API call
    const mockPOS = [
        { code: '11', description: 'Office' },
        { code: '12', description: 'Home' },
        { code: '21', description: 'Inpatient Hospital' },
        { code: '22', description: 'Outpatient Hospital' },
        { code: '23', description: 'Emergency Room - Hospital' },
        { code: '24', description: 'Ambulatory Surgical Center' },
        { code: '31', description: 'Skilled Nursing Facility' },
        { code: '32', description: 'Nursing Facility' },
    ];

    const handleSelect = (code: string) => {
        if (onSelect) {
            onSelect(code);
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Search Place of Service</DialogTitle>
                    <DialogDescription>
                        Search for place of service codes
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Label htmlFor="pos-search">Search Place of Service</Label>
                            <div className="relative">
                                <Input
                                    id="pos-search"
                                    placeholder="Enter POS code or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pr-8"
                                />
                                <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                        <div className="flex items-end">
                            <Button>Search</Button>
                        </div>
                    </div>

                    <div className="border rounded-md overflow-hidden max-h-[400px] overflow-y-auto">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="w-[120px]">Code</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="w-[100px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockPOS.map((pos) => (
                                    <TableRow key={pos.code}>
                                        <TableCell className="font-medium">{pos.code}</TableCell>
                                        <TableCell>{pos.description}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                onClick={() => handleSelect(pos.code)}
                                            >
                                                Select
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
