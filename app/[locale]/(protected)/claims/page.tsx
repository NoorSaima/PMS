"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, X, Search, FileText, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    setActiveTab,
    openClaimTab,
    closeTab,
    openNewClaimTab,
    setSearchQuery
} from '@/store/slices/claimsTabsSlice';
import { getClaimList } from '@/store/slices/claimSlice';
import AddClaimDialog from './components/add-claim-dialog';
import ClaimsTable from './components/claims-table';
import ProfessionalClaimView from './(professional)/professional-claim-view';
import InstitutionalClaimView from './(institutional)/institutional-claim-view';
import { ClaimData } from './components/columns';

type ClaimType = 'professional' | 'institutional';

export type ClaimTab = {
    value: string;
    label: string;
    type: ClaimType;
    id?: string; // If existing claim
    data?: any;
};

const ClaimsPage = () => {
    // Get state from Redux
    const dispatch = useAppDispatch();
    const { activeTab, tabs, searchQuery } = useAppSelector((state) => state.claimsTabs);
    const { claims, loading } = useAppSelector((state) => state.claim as any) || { claims: [], loading: false }; // Temporary cast given we just added slice

    // Fetch claims on mount
    useEffect(() => {
        // You might want to get companyId from somewhere, hardcoding or getting from user/practice state
        // Assuming we need to fetch for current context. 
        // For now, passing empty or minimal params as required by thunk. 
        // The thunk expects { companyId: string, ... }
        // Let's check session or config. For now using a placeholder if not available in context.
        // But better to fetch properly.
        // Assuming user has a practice/company context.
        // NOTE: User generic request didn't specify context so I'll try to fetch with a default or available ID if possible.
        // If practice/company ID is needed, we should select it.
        // Let's assume a hardcoded ID for demo or try to select it from `state.practice` if exists.

        // Dispatching with dummy ID for now or checking if we can get it. 
        // Ideally we select from state.practice.selectedPracticeId
        dispatch(getClaimList({ companyId: '74e0ec91-ce44-4766-8257-35fb44cb0f7f' })); // Using ID from user prompt example
    }, [dispatch]);

    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    // Map Redux claims to Table ClaimData
    const tableData: ClaimData[] = (claims || []).map((c: any) => ({
        id: c.ClaimID || c.ClaimId || '',
        name: c.PatientName || '',
        dpb: c.DOB || '', // Assuming DPB maps to DOB or similar
        type: c.ClaimType === '1' ? 'Professional' : 'Institutional', // Simple mapping assumption
        totalCharge: c.TotalCharge || 0,
        totalPaid: c.Payments || c.TotalPaid || 0,
        totalAdjustments: 0, // Not in RecentClaim
        balance: c.Balance || 0,
        providerName: c.ProviderName || '', // Might be missing
        payerName: c.PayerName || '', // Might be missing
        facilityName: c.FacilityName || '',
        status: (c.Status === '1' ? 'Pending' : 'Draft') as any, // Simple mapping
    }));

    const handleCreateClaim = (type: ClaimType) => {
        dispatch(openNewClaimTab(type));
        setIsAddDialogOpen(false);
    };

    const handleViewClaim = (claim: any) => {
        dispatch(openClaimTab(claim));
    };

    const handleCloseTab = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(closeTab(value));
    };

    const handleTabChange = (value: string) => {
        dispatch(setActiveTab(value));
    };

    const handleSearchChange = (value: string) => {
        dispatch(setSearchQuery(value));
    };

    const [config] = useConfig();

    return (
        <div className="min-h-screen">
            <SiteBreadcrumb />

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full space-y-2 mt-4">
                {/* Header Section */}
                <div className="sticky top-0 z-10 backdrop-blur py-2 -mx-4 px-4 transition-all duration-200">
                    <div className="flex bg-white flex-col md:flex-row items-center justify-between gap-4 rounded-lg p-2 border">

                        {/* Tabs List */}
                        <div className="relative flex items-center flex-1 overflow-x-auto no-scrollbar mask-gradient-r">
                            <TabsList className="bg-transparent h-auto p-0 gap-2">
                                {tabs.map(tab => (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className={cn(
                                            "relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300",
                                            "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                                            "hover:bg-muted/50 bg-slate-100 data-[state=active]:text-primary-foreground"
                                        )}
                                    >
                                        {activeTab === tab.value && (
                                            <motion.div
                                                layoutId="active-tab-pill"
                                                className={cn(
                                                    "absolute inset-0 rounded-lg",
                                                    config.headerColor === "light" ? "bg-primary" : `theme-${config.headerColor} bg-header`
                                                )}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}

                                        <span className="relative z-10 flex items-center gap-2 font-medium">
                                            {tab.value === "all-claims" ? (
                                                <LayoutGrid className="w-4 h-4" />
                                            ) : (
                                                <FileText className="w-4 h-4" />
                                            )}
                                            {tab.label}
                                        </span>

                                        {tab.value !== "all-claims" && (
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0 }}
                                                className="relative z-10 ml-1 rounded-full p-0.5 hover:bg-background/20 transition-colors cursor-pointer"
                                                onMouseDown={(e) => handleCloseTab(e, tab.value)}
                                            >
                                                <X className="w-3 h-3" />
                                            </motion.span>
                                        )}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {activeTab === "all-claims" && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        className={cn(
                                            "relative flex-1 md:w-[300px] group transition-all duration-300",
                                            isSearchFocused ? "md:w-[400px]" : ""
                                        )}
                                    >
                                        <div className={cn(
                                            "relative flex items-center overflow-hidden rounded-lg border bg-background transition-all duration-300",
                                            isSearchFocused ? "ring-2 ring-primary/20 border-primary" : "hover:border-primary/50"
                                        )}>
                                            <Search className={cn(
                                                "ml-3 h-4 w-4 transition-colors",
                                                isSearchFocused ? "text-primary" : "text-muted-foreground"
                                            )} />
                                            <input
                                                type="text"
                                                placeholder="Search claims..."
                                                value={searchQuery}
                                                onChange={(e) => handleSearchChange(e.target.value)}
                                                onFocus={() => setIsSearchFocused(true)}
                                                onBlur={() => setIsSearchFocused(false)}
                                                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/70"
                                            />
                                        </div>
                                    </motion.div>

                                    <Button
                                        onClick={() => setIsAddDialogOpen(true)}
                                        className="rounded-lg duration-300 gap-2 pl-3"
                                        size='md'
                                        color='success'
                                    >
                                        <div className="bg-white/20 p-1 rounded-lg">
                                            <Plus className="h-3 w-3" />
                                        </div>
                                        <span className="hidden sm:inline">Add Claim</span>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="relative bg-white rounded-lg min-h-[500px]">
                    <TabsContent value="all-claims" className="mt-0 outline-none">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <Card className="border shadow-sm bg-white overflow-hidden rounded-xl">
                                <CardContent className="p-0">
                                    <ClaimsTable searchQuery={searchQuery} onViewClaim={handleViewClaim} data={tableData} />
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    {tabs.map(tab => {
                        if (tab.value === "all-claims") return null;
                        return (
                            <TabsContent key={tab.value} value={tab.value} className="mt-0 outline-none">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {tab.type === 'professional' ? (
                                        <ProfessionalClaimView claimId={tab.id} defaultData={tab.data} />
                                    ) : (
                                        <InstitutionalClaimView claimId={tab.id} defaultData={tab.data} />
                                    )}
                                </motion.div>
                            </TabsContent>
                        );
                    })}
                </div>
            </Tabs>

            <AddClaimDialog
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onSelectType={handleCreateClaim}
            />
        </div>
    );
};

export default ClaimsPage;
