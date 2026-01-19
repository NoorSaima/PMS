"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SearchModifierDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect?: (modifier: string) => void;
}

export const SearchModifierDialog: React.FC<SearchModifierDialogProps> = ({ open, onOpenChange, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Placeholder data - will be replaced with actual API call
    const mockModifiers = [
        { code: '22', description: 'Increased Procedural Services' },
        { code: '25', description: 'Significant, Separately Identifiable E/M Service' },
        { code: '26', description: 'Professional Component' },
        { code: '50', description: 'Bilateral Procedure' },
        { code: '51', description: 'Multiple Procedures' },
        { code: '52', description: 'Reduced Services' },
        { code: '59', description: 'Distinct Procedural Service' },
        { code: 'TC', description: 'Technical Component' },
    ];

    const handleSelect = (modifier: string) => {
        if (onSelect) {
            onSelect(modifier);
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Search Modifier</DialogTitle>
                    <DialogDescription>
                        Search for procedure modifiers by code or description
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Label htmlFor="modifier-search">Search Modifier</Label>
                            <div className="relative">
                                <Input
                                    id="modifier-search"
                                    placeholder="Enter modifier code or description..."
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
                                {mockModifiers.map((modifier) => (
                                    <TableRow key={modifier.code}>
                                        <TableCell className="font-medium">{modifier.code}</TableCell>
                                        <TableCell>{modifier.description}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                onClick={() => handleSelect(modifier.code)}
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
