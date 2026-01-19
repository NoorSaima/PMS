"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Columns, FileText, Activity, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';
import EnteredCharges from './entered-charges';
import CptPerformed from './cpt-performed';
import IcdPerformed from './icd-performed';

const claimReportTabs = [
    { value: "entered-charges", label: "Entered Charges", icon: FileText },
    { value: "cpt-performed", label: "CPT Performed", icon: Activity },
    { value: "icd-performed", label: "ICD Performed", icon: Stethoscope },
];

export default function ClaimReportsManager() {
    const [config] = useConfig();
    const [activeTab, setActiveTab] = useState("entered-charges");
    const [layout, setLayout] = useState<"vertical" | "horizontal">("vertical");

    return (
        <Card className="mt-4 border-none shadow-none">
            <Card className="mb-6 border-none shadow-md overflow-hidden bg-white/50 backdrop-blur-sm relative group">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3aa981] via-[#4098d7] to-[#d15c89]" />

                {/* Layout Toggle - Top Right */}
                <div className="absolute top-4 right-4 z-10 transition-opacity opacity-50 group-hover:opacity-100">
                    <div className="flex items-center gap-1 bg-white/80 backdrop-blur border p-1 rounded-lg shadow-sm">
                        <Button
                            variant={layout === "vertical" ? "default" : "ghost"}
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setLayout("vertical")}
                        >
                            <LayoutDashboard className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                            variant={layout === "horizontal" ? "default" : "ghost"}
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setLayout("horizontal")}
                        >
                            <Columns className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>

                <div className="p-6 pt-8">
                    <h3 className="text-xl font-bold text-slate-800">Claim Reports</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Claims-related reporting and analytics
                    </p>
                </div>
            </Card>

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className={layout === "vertical" ? "flex gap-8" : "w-full"}
                orientation={layout === "vertical" ? "vertical" : "horizontal"}
            >
                <div className={layout === "vertical" ? "w-64 flex-shrink-0 pt-0" : "w-full pb-6"}>
                    <div className={cn(
                        "rounded-xl transition-all",
                        layout === "vertical" ? "h-auto" : "flex overflow-x-auto no-scrollbar border-b border-slate-200"
                    )}>
                        <TabsList className={
                            layout === "vertical"
                                ? "flex flex-col h-auto items-stretch bg-transparent p-0 gap-2 w-full"
                                : "flex w-full justify-start h-auto bg-transparent p-0 gap-6"
                        }>
                            {claimReportTabs.map((tab) => {
                                const Icon = tab.icon;
                                const isColorTheme = !["light", "transparent"].includes(config.headerColor);

                                return (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className={
                                            layout === "vertical"
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
                                            layout === "vertical" ? "mr-3" : "mr-1",
                                            isColorTheme ? `theme-${config.headerColor} group-data-[state=active]:text-header`
                                                : "group-data-[state=active]:text-primary",
                                            "text-slate-400 group-hover:text-slate-600"
                                        )}>
                                            <Icon className={cn(
                                                layout === "vertical" ? "h-5 w-5" : "h-4 w-4"
                                            )} />
                                        </div>
                                        <span className="text-sm tracking-wide">{tab.label}</span>

                                        {/* Vertical Active Indicator */}
                                        {layout === "vertical" && (
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
                    <TabsContent value="entered-charges" className="mt-0">
                        <EnteredCharges />
                    </TabsContent>

                    <TabsContent value="cpt-performed" className="mt-0">
                        <CptPerformed />
                    </TabsContent>

                    <TabsContent value="icd-performed" className="mt-0">
                        <IcdPerformed />
                    </TabsContent>
                </div>
            </Tabs>
        </Card>
    );
}
