"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SearchICDDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect?: (code: string, description: string) => void;
}

export const SearchICDDialog: React.FC<SearchICDDialogProps> = ({ open, onOpenChange, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Placeholder data - will be replaced with actual API call
    const mockICDCodes = [
        { code: 'I10', description: 'Essential (primary) hypertension' },
        { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
        { code: 'J44.0', description: 'Chronic obstructive pulmonary disease with acute lower respiratory infection' },
        { code: 'I25.10', description: 'Atherosclerotic heart disease of native coronary artery without angina pectoris' },
        { code: 'N18.3', description: 'Chronic kidney disease, stage 3 (moderate)' },
        { code: 'F41.1', description: 'Generalized anxiety disorder' },
        { code: 'M79.3', description: 'Panniculitis, unspecified' },
        { code: 'R07.9', description: 'Chest pain, unspecified' },
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
                    <DialogTitle>Search ICD Codes</DialogTitle>
                    <DialogDescription>
                        Search for ICD diagnosis codes by code number or description
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Label htmlFor="icd-search">Search ICD Code</Label>
                            <div className="relative">
                                <Input
                                    id="icd-search"
                                    placeholder="Enter ICD code or description..."
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
                                    <TableHead className="w-[150px]">ICD Code</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="w-[100px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockICDCodes.map((icd) => (
                                    <TableRow key={icd.code}>
                                        <TableCell className="font-medium">{icd.code}</TableCell>
                                        <TableCell>{icd.description}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                onClick={() => handleSelect(icd.code, icd.description)}
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
