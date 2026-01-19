"use client";

import React, { useState } from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BarChart3, Settings, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';
import ArReportsManager from './(tabs)/(ar-reports)/ar-reports-manager';
import ClaimReportsManager from './(tabs)/(claim-reports)/claim-reports-manager';
import SystemReportsManager from './(tabs)/(system-reports)/system-reports-manager';

type TabData = {
    value: string;
    label: string;
    icon: typeof FileText;
};

const mainTabs: TabData[] = [
    { value: "ar-reports", label: "AR Reports", icon: BarChart3 },
    { value: "claim-reports", label: "Claim Reports", icon: FileText },
    { value: "system-reports", label: "System Reports", icon: Settings },
];

const ReportsPage = () => {
    const [config] = useConfig();
    const [activeTab, setActiveTab] = useState("ar-reports");

    return (
        <div className="min-h-screen">
            <SiteBreadcrumb />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-2 mt-4">
                {/* Header Section with Tabs */}
                <div className="sticky top-0 z-10 backdrop-blur py-2 -mx-4 px-4 transition-all duration-200">
                    <div className="flex bg-white flex-col md:flex-row items-center justify-between gap-4 rounded-lg p-2 border">
                        {/* Tabs List */}
                        <div className="relative flex items-center flex-1 overflow-x-auto no-scrollbar mask-gradient-r">
                            <TabsList className="bg-transparent h-auto p-0 gap-2">
                                {mainTabs.map(tab => {
                                    const Icon = tab.icon;
                                    return (
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
                                                    layoutId="active-main-tab-pill"
                                                    className={cn(
                                                        "absolute inset-0 rounded-lg",
                                                        config.headerColor === "light" ? "bg-primary" : `theme-${config.headerColor} bg-header`
                                                    )}
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}

                                            <span className="relative z-10 flex items-center gap-2 font-medium">
                                                <Icon className="w-4 h-4" />
                                                {tab.label}
                                            </span>
                                        </TabsTrigger>
                                    );
                                })}
                            </TabsList>
                        </div>
                    </div>
                </div>

                {/* Tab Contents */}
                <TabsContent value="ar-reports" className="mt-0 outline-none">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ArReportsManager />
                    </motion.div>
                </TabsContent>

                <TabsContent value="claim-reports" className="mt-0 outline-none">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ClaimReportsManager />
                    </motion.div>
                </TabsContent>

                <TabsContent value="system-reports" className="mt-0 outline-none">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SystemReportsManager />
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ReportsPage;
