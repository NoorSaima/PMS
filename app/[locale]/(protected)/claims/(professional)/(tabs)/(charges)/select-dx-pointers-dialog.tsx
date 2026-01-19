"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SelectDXPointersDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect?: (pointers: string[]) => void;
    icdCodes?: { [key: string]: string }; // ICD A-L values from parent
}

export const SelectDXPointersDialog: React.FC<SelectDXPointersDialogProps> = ({
    open,
    onOpenChange,
    onSelect,
    icdCodes = {}
}) => {
    const [selectedPointers, setSelectedPointers] = useState<string[]>([]);

    const icdOptions = [
        { key: 'A', label: 'ICD A' },
        { key: 'B', label: 'ICD B' },
        { key: 'C', label: 'ICD C' },
        { key: 'D', label: 'ICD D' },
        { key: 'E', label: 'ICD E' },
        { key: 'F', label: 'ICD F' },
        { key: 'G', label: 'ICD G' },
        { key: 'H', label: 'ICD H' },
        { key: 'I', label: 'ICD I' },
        { key: 'J', label: 'ICD J' },
        { key: 'K', label: 'ICD K' },
        { key: 'L', label: 'ICD L' },
    ];

    const handleToggle = (key: string) => {
        setSelectedPointers((prev) => {
            if (prev.includes(key)) {
                return prev.filter((p) => p !== key);
            } else {
                // Max 4 selections
                if (prev.length >= 4) {
                    return prev;
                }
                return [...prev, key];
            }
        });
    };

    const handleSave = () => {
        if (onSelect) {
            onSelect(selectedPointers);
        }
        onOpenChange(false);
    };

    const handleCancel = () => {
        setSelectedPointers([]);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Select DX Pointers (Max 4)</DialogTitle>
                    <DialogDescription>
                        Select up to 4 diagnosis pointers from the ICD codes defined above
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-800">
                        <strong>Selected: {selectedPointers.length}/4</strong>
                        {selectedPointers.length >= 4 && (
                            <span className="ml-2 text-blue-600">
                                (Maximum reached - uncheck to select different pointers)
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
                        {icdOptions.map((option) => {
                            const icdValue = icdCodes[option.key] || '';
                            const isDisabled = !icdValue; // Disable if no ICD code entered

                            return (
                                <div
                                    key={option.key}
                                    className={`flex items-start space-x-3 p-3 border rounded-md ${isDisabled
                                            ? 'bg-slate-50 opacity-50'
                                            : selectedPointers.includes(option.key)
                                                ? 'bg-primary/5 border-primary'
                                                : 'bg-white hover:bg-slate-50'
                                        }`}
                                >
                                    <Checkbox
                                        id={`dx-${option.key}`}
                                        checked={selectedPointers.includes(option.key)}
                                        onCheckedChange={() => handleToggle(option.key)}
                                        disabled={isDisabled || (selectedPointers.length >= 4 && !selectedPointers.includes(option.key))}
                                    />
                                    <div className="flex-1">
                                        <Label
                                            htmlFor={`dx-${option.key}`}
                                            className={`font-medium cursor-pointer ${isDisabled ? 'text-slate-400' : ''
                                                }`}
                                        >
                                            {option.label}
                                        </Label>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {icdValue || 'Not specified'}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={selectedPointers.length === 0}>
                            Select ({selectedPointers.join(', ')})
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
