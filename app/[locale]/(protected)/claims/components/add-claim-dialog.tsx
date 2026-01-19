"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { FileText, Building2, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AddClaimDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelectType: (type: 'professional' | 'institutional') => void;
}

const AddClaimDialog = ({ open, onOpenChange, onSelectType }: AddClaimDialogProps) => {
    const [selectedType, setSelectedType] = useState<'professional' | 'institutional' | null>(null);

    const handleConfirm = () => {
        if (selectedType) {
            onSelectType(selectedType);
            onOpenChange(false);
            // Reset selection after a short delay
            setTimeout(() => setSelectedType(null), 300);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent size='md'>
                <div className="bg-white dark:bg-slate-950 rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="relative p-6 border-b border-border/40">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <FileText className="w-48 h-48 -mr-12 -mt-12" />
                        </div>

                        <div className="relative z-10 pr-12">
                            <DialogTitle className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Create New Claim
                            </DialogTitle>
                            <p className="text-muted-foreground mt-1.5 text-sm">
                                Select the appropriate claim form below. Please verify the provider type before proceeding to ensure accurate billing.
                            </p>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Professional Claim Option */}
                            <motion.button
                                whileHover={{ scale: 1.01, y: -2 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => setSelectedType('professional')}
                                className={cn(
                                    "relative group flex flex-col items-start p-4 rounded-xl border transition-all duration-300 text-left outline-none",
                                    selectedType === 'professional'
                                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                        : "border-border hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900"
                                )}
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300",
                                    selectedType === 'professional' ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                                )}>
                                    <FileText className="w-5 h-5" />
                                </div>

                                <h3 className="text-base font-bold mb-1 group-hover:text-primary transition-colors">
                                    Professional Claim
                                </h3>
                                <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                                    CMS-1500 form for physicians and non-institutional providers. Use this for individual provider services.
                                </p>

                                <div className="mt-auto flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    Select Professional <ArrowRight className="w-3 h-3 ml-1" />
                                </div>

                                {selectedType === 'professional' && (
                                    <div className="absolute top-3 right-3 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                                        <Check className="w-3 h-3" />
                                    </div>
                                )}
                            </motion.button>

                            {/* Institutional Claim Option */}
                            <motion.button
                                whileHover={{ scale: 1.01, y: -2 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => setSelectedType('institutional')}
                                className={cn(
                                    "relative group flex flex-col items-start p-4 rounded-xl border transition-all duration-300 text-left outline-none",
                                    selectedType === 'institutional'
                                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                        : "border-border hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900"
                                )}
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300",
                                    selectedType === 'institutional' ? "bg-primary text-primary-foreground" : "bg-purple-500/10 text-purple-600"
                                )}>
                                    <Building2 className="w-5 h-5" />
                                </div>

                                <h3 className="text-base font-bold mb-1 group-hover:text-primary transition-colors">
                                    Institutional Claim
                                </h3>
                                <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                                    UB-04 form for hospitals and other institutional facilities. Use this for facility-based billing.
                                </p>

                                <div className="mt-auto flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    Select Institutional <ArrowRight className="w-3 h-3 ml-1" />
                                </div>

                                {selectedType === 'institutional' && (
                                    <div className="absolute top-3 right-3 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                                        <Check className="w-3 h-3" />
                                    </div>
                                )}
                            </motion.button>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border/40">
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="h-9 px-4 text-sm rounded-lg border-border/60 hover:bg-muted font-medium"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirm}
                                disabled={!selectedType}
                                className={cn(
                                    "h-9 px-6 rounded-lg text-sm font-bold transition-all duration-300",
                                    selectedType ? "shadow-md shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5" : ""
                                )}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddClaimDialog;
