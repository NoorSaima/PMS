"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SearchTOSDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect?: (code: string) => void;
}

export const SearchTOSDialog: React.FC<SearchTOSDialogProps> = ({ open, onOpenChange, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Placeholder data - will be replaced with actual API call
    const mockTOS = [
        { code: '1', description: 'Medical Care' },
        { code: '2', description: 'Surgery' },
        { code: '3', description: 'Consultation' },
        { code: '4', description: 'Diagnostic X-Ray' },
        { code: '5', description: 'Diagnostic Lab' },
        { code: '6', description: 'Radiation Therapy' },
        { code: '7', description: 'Anesthesia' },
        { code: '8', description: 'Surgical Assistance' },
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
                    <DialogTitle>Search Type of Service</DialogTitle>
                    <DialogDescription>
                        Search for type of service codes
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Label htmlFor="tos-search">Search Type of Service</Label>
                            <div className="relative">
                                <Input
                                    id="tos-search"
                                    placeholder="Enter TOS code or description..."
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
                                {mockTOS.map((tos) => (
                                    <TableRow key={tos.code}>
                                        <TableCell className="font-medium">{tos.code}</TableCell>
                                        <TableCell>{tos.description}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                onClick={() => handleSelect(tos.code)}
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
