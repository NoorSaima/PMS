"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlignJustify, Columns, FileText, CreditCard, Plus, Save, Loader2 } from 'lucide-react';
import { useConfig } from '@/hooks/use-config';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setClaimDetailTab, setClaimDetailLayout } from '@/store/slices/claimsTabsSlice';
import { getClaimDetail, addClaim, editClaim, getClaimStatusList, getClaimLineStatusList } from '@/store/slices/claimSlice';
import { ClaimProvider, useClaimContext } from './claim-context';
import ProfessionalClaimTab from './(tabs)/(claim)/claim-tab';
import ProfessionalChargesTab from './(tabs)/(charges)/charges-tab';
import AmbulanceTab from './(tabs)/(ambulance)/ambulance-tab';
import { toast } from 'sonner';

interface ProfessionalClaimViewProps {
    claimId?: string;
    defaultData?: any;
}

const ProfessionalClaimViewContent: React.FC<ProfessionalClaimViewProps> = ({ claimId, defaultData }) => {
    const dispatch = useAppDispatch();
    const [config] = useConfig();
    const { claimData, setClaimData } = useClaimContext();

    // Get claim-specific tab state from Redux
    const claimTabId = claimId || `new-professional-claim`;
    const claimDetailState = useAppSelector(
        (state) => state.claimsTabs.claimDetailTabs[claimTabId]
    );

    const { claimDetail, loading, saving, error } = useAppSelector((state) => state.claim);

    // Use Redux state if available, otherwise use defaults
    const activeTab = claimDetailState?.activeSubTab || 'claim';
    const orientation = claimDetailState?.layout || 'vertical';

    // Fetch claim detail if claimId exists
    useEffect(() => {
        if (claimId) {
            dispatch(getClaimDetail(claimId));
        }
    }, [claimId, dispatch]);

    // Fetch dropdown data on mount
    useEffect(() => {
        dispatch(getClaimStatusList());
        dispatch(getClaimLineStatusList());
    }, [dispatch]);

    // Populate form when claim detail is loaded
    useEffect(() => {
        if (claimDetail && claimId) {
            setClaimData(claimDetail as any);
        }
    }, [claimDetail, claimId]);

    const handleTabChange = (value: string) => {
        dispatch(setClaimDetailTab({ claimId: claimTabId, subTab: value }));
    };

    const handleLayoutChange = (layout: 'vertical' | 'horizontal') => {
        dispatch(setClaimDetailLayout({ claimId: claimTabId, layout }));
    };

    const handleSave = async () => {
        try {
            // TODO: Add validation here
            if (!claimData.PatientID || !claimData.ProviderID) {
                toast.error('Please fill in required fields');
                return;
            }

            if (claimId) {
                // Edit existing claim
                await dispatch(editClaim({ ...claimData, ClaimID: claimId } as any)).unwrap();
                toast.success('Claim updated successfully');
            } else {
                // Add new claim
                await dispatch(addClaim(claimData as any)).unwrap();
                toast.success('Claim created successfully');
            }
        } catch (err: any) {
            toast.error(err || 'Failed to save claim');
        }
    };

    // Define tabs with icons
    const subTabs = [
        { value: "claim", label: "Claim", icon: FileText },
        { value: "charges", label: "Charges", icon: CreditCard },
        { value: "ambulance", label: "Ambulance", icon: Plus },
    ];

    return (
        <Card className="mt-4 border-none shadow-none bg-transparent">
            <Card className="mb-6 border-none shadow-md overflow-hidden bg-white/50 backdrop-blur-sm relative group">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-primary" />

                {/* Layout Toggle - Top Right */}
                <div className="absolute top-4 right-4 z-10 transition-opacity opacity-50 group-hover:opacity-100">
                    <div className="flex items-center gap-1 bg-white/80 backdrop-blur border p-1 rounded-lg shadow-sm">
                        <Button
                            variant={orientation === "horizontal" ? "default" : "ghost"}
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleLayoutChange("horizontal")}
                        >
                            <AlignJustify className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                            variant={orientation === "vertical" ? "default" : "ghost"}
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleLayoutChange("vertical")}
                        >
                            <Columns className="h-3.5 w-3.5 rotate-90" />
                        </Button>
                    </div>
                </div>

                <div className="p-6 pt-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                        {/* Icon Section */}
                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0 relative">
                                <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200 shadow-sm">
                                    <FileText className="h-8 w-8" />
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="flex-grow space-y-1 min-w-0 pt-1">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                                        Professional Claim
                                    </h2>
                                    <div className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200">
                                        {claimId || "New"}
                                    </div>
                                </div>
                                <p className="text-slate-500 font-medium">
                                    {claimId ? `Managing claim details for ${claimId}` : "Create a new professional claim record"}
                                </p>
                            </div>
                        </div>

                        {/* Save Button */}
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2"
                            size="lg"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    {claimId ? 'Update Claim' : 'Save Claim'}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </Card>

            <Tabs value={activeTab} onValueChange={handleTabChange} orientation={orientation} className={orientation === 'vertical' ? "flex gap-8" : "w-full"}>
                <div className={orientation === 'vertical' ? "w-64 flex-shrink-0 pt-0" : "w-full pb-6  px-6"}>
                    <div className={cn(
                        "rounded-xl transition-all",
                        orientation === 'vertical' ? "h-auto" : "flex overflow-x-auto no-scrollbar border-b px-2  border-slate-200"
                    )}>
                        <TabsList className={
                            orientation === 'vertical'
                                ? "flex flex-col h-auto items-stretch  bg-transparent p-0 gap-2 w-full"
                                : "flex w-full justify-start h-auto  bg-transparent p-0 gap-6"
                        }>
                            {subTabs.map((tab) => {
                                const Icon = tab.icon;
                                const isColorTheme = !["light", "transparent"].includes(config.headerColor);

                                return (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className={
                                            orientation === 'vertical'
                                                ? cn(
                                                    "justify-start px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                                    "hover:bg-slate-50",
                                                    isColorTheme ? `theme-${config.headerColor} data-[state=active]:bg-header/10 data-[state=active]:text-header`
                                                        : "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                                                    "font-medium text-slate-500"
                                                )
                                                : cn(
                                                    "rounded-none px-2 py-3 transition-all duration-300 flex items-center gap-2 border-b-2 border-transparent",
                                                    "hover:text-slate-800",
                                                    isColorTheme ? `theme-${config.headerColor} data-[state=active]:border-header data-[state=active]:text-header`
                                                        : "data-[state=active]:border-primary data-[state=active]:text-primary",
                                                    "font-medium text-slate-500"
                                                )
                                        }
                                    >
                                        <div className={cn(
                                            "flex items-center justify-center transition-colors duration-300",
                                            orientation === 'vertical' ? "mr-3" : "mr-1",
                                            isColorTheme ? `theme-${config.headerColor} group-data-[state=active]:text-header`
                                                : "group-data-[state=active]:text-primary",
                                            "text-slate-400 group-hover:text-slate-600"
                                        )}>
                                            <Icon className={cn(
                                                orientation === 'vertical' ? "h-5 w-5" : "h-4 w-4"
                                            )} />
                                        </div>
                                        <span className={cn(
                                            "text-sm tracking-wide",
                                        )}>{tab.label}</span>

                                        {/* Vertical Active Indicator */}
                                        {orientation === 'vertical' && (
                                            <div className={cn(
                                                "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full opacity-0 transition-all duration-300 group-data-[state=active]:opacity-100 group-data-[state=active]:h-8",
                                                isColorTheme ? `theme-${config.headerColor} bg-header` : "bg-primary"
                                            )} />
                                        )}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <TabsContent value="claim" className="mt-0">
                        <ProfessionalClaimTab />
                    </TabsContent>

                    <TabsContent value="charges" className="mt-0">
                        <ProfessionalChargesTab />
                    </TabsContent>

                    <TabsContent value="ambulance" className="mt-0">
                        <AmbulanceTab />
                    </TabsContent>
                </div>
            </Tabs>
        </Card>
    );
};

const ProfessionalClaimView: React.FC<ProfessionalClaimViewProps> = (props) => {
    return (
        <ClaimProvider initialData={props.defaultData}>
            <ProfessionalClaimViewContent {...props} />
        </ClaimProvider>
    );
};

export default ProfessionalClaimView;
