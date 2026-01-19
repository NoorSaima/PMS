"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SearchCPTDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect?: (code: string, description: string) => void;
}

export const SearchCPTDialog: React.FC<SearchCPTDialogProps> = ({ open, onOpenChange, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Placeholder data - will be replaced with actual API call
    const mockResults = [
        { code: '99213', description: 'Office/outpatient visit, established patient, 20-29 minutes', fee: '110.00' },
        { code: '99214', description: 'Office/outpatient visit, established patient, 30-39 minutes', fee: '167.00' },
        { code: '99215', description: 'Office/outpatient visit, established patient, 40-54 minutes', fee: '211.00' },
    ];

    const handleSelect = (code: string, description: string) => {
        if (onSelect) {
            onSelect(code, description);
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Search CPT Code and Bulk Charges</DialogTitle>
                    <DialogDescription>
                        Search for CPT codes by code number or description
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Label htmlFor="cpt-search">Search CPT Code</Label>
                            <div className="relative">
                                <Input
                                    id="cpt-search"
                                    placeholder="Enter CPT code or description..."
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
                                    <TableHead className="w-[120px]">CPT Code</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="w-[120px] text-right">Fee</TableHead>
                                    <TableHead className="w-[100px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockResults.map((result) => (
                                    <TableRow key={result.code}>
                                        <TableCell className="font-medium">{result.code}</TableCell>
                                        <TableCell>{result.description}</TableCell>
                                        <TableCell className="text-right">${result.fee}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                onClick={() => handleSelect(result.code, result.description)}
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
