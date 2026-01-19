"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PatientList from './example2';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataProps } from './example2/columns';
import PatientDetail from './patient-detail';
import { Plus, X, Search, User, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreatePatient from './create-patient';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import PatientStats from './patient-stats';
import { useConfig } from '@/hooks/use-config';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
    setActiveTab, 
    openPatientTab, 
    closeTab, 
    openNewPatientTab, 
    setSearchQuery 
} from '@/store/slices/patientsTabsSlice';


const ReactTablePage = () => {
    // Get state from Redux instead of local state
    const dispatch = useAppDispatch();
    const { activeTab, tabs, searchQuery } = useAppSelector((state) => state.patientsTabs);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleViewPatient = (patient: DataProps) => {
        dispatch(openPatientTab(patient));
    };

    const handleCloseTab = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(closeTab(value));
    };

    const handleCreatePatient = () => {
        dispatch(openNewPatientTab());
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
                {/* Custom Creative Header Section */}
                <div className="sticky top-0 z-10  backdrop-blur  py-2 -mx-4 px-4 transition-all duration-200">
                    <div className="flex bg-white flex-col md:flex-row items-center justify-between gap-4 rounded-lg p-2 border">

                        {/* Animated Tabs List */}
                        <div className="relative flex items-center flex-1 overflow-x-auto no-scrollbar mask-gradient-r">
                            <TabsList className="bg-transparent h-auto p-0 gap-2">
                                {/* Removed AnimatePresence here to prevent conflicts with Radix TabsTrigger removal */}
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
                                            {tab.value === "all-patients" ? (
                                                <LayoutGrid className="w-4 h-4" />
                                            ) : tab.value === "new-patient" ? (
                                                <User className="w-4 h-4" />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full bg-background/20 flex items-center justify-center text-[10px]">
                                                    {tab.label.charAt(0)}
                                                </div>
                                            )}
                                            {tab.label}
                                        </span>

                                        {tab.value !== "all-patients" && (
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

                        {/* Search & Actions Group */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {/* Animated Search Bar in Pill Container */}
                            {activeTab === "all-patients" && (
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
                                            placeholder="Search patients..."
                                            value={searchQuery}
                                            onChange={(e) => handleSearchChange(e.target.value)}
                                            onFocus={() => setIsSearchFocused(true)}
                                            onBlur={() => setIsSearchFocused(false)}
                                            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/70"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "all-patients" && (
                                <Button
                                    onClick={handleCreatePatient}
                                    className="rounded-lg duration-300 gap-2 pl-3"
                                    size='md'
                                    color='success'
                                >
                                    <div className="bg-white/20 p-1 rounded-lg">
                                        <Plus className="h-3 w-3" />
                                    </div>
                                    <span className="hidden sm:inline">Add Patient</span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="relative bg-white rounded-lg min-h-[500px]">
                    <TabsContent value="all-patients" className="mt-0 outline-none">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <PatientStats />

                            <Card className="border-0 shadow-none bg-transparent">
                                <CardContent className="p-0">
                                    <PatientList onViewPatient={handleViewPatient} searchQuery={searchQuery} />
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    {tabs.map(tab => {
                        if (tab.value === "all-patients") return null;
                        return (
                            <TabsContent key={tab.value} value={tab.value} className="mt-0 outline-none">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {tab.value === "new-patient" ? (
                                        <CreatePatient />

                                    ) : (
                                        <PatientDetail patient={tab.patient!} />
                                    )}
                                </motion.div>
                            </TabsContent>
                        );
                    })}
                </div>
            </Tabs>
        </div>
    );
};

export default ReactTablePage;
