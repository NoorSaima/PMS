"use client";

import React, { useState } from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Search, Home, MoreHorizontal, Building2, CheckCircle2, AlertTriangle, Clock, Filter, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';
import AddFacilityForm from './add-facility-form';

interface TabData {
    value: string;
    label: string;
    type?: 'list' | 'form';
}

const FacilityPage = () => {
    const [activeTab, setActiveTab] = useState("all-facilities");
    const [config] = useConfig();
    const [tabs, setTabs] = useState<TabData[]>([
        { value: "all-facilities", label: "All Facilities", type: 'list' },
    ]);

    const handleAddFacility = () => {
        const newValue = "add-facility";
        if (!tabs.find(t => t.value === newValue)) {
            setTabs(prev => [...prev, { value: newValue, label: "New Facility", type: 'form' }]);
        }
        setActiveTab(newValue);
    };

    const closeTab = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        const newTabs = tabs.filter(t => t.value !== value);
        setTabs(newTabs);
        if (activeTab === value) {
            setActiveTab(newTabs[newTabs.length - 1].value);
        }
    };

    return (
        <div className="space-y-6">
            <SiteBreadcrumb />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Facilities", value: "8", icon: Building2, color: "#4098d7", trend: "All locations" },
                    { title: "Active Facilities", value: "6", icon: CheckCircle2, color: "#3aa981", trend: "Operational" },
                    { title: "Inactive Facilities", value: "1", icon: Clock, color: "#f29857", trend: "Temporarily closed" },
                    { title: "Pending Compliance", value: "1", icon: AlertTriangle, color: "#d15c89", trend: "CLIA Expiring" },
                ].map((kpi, index) => (
                    <Card key={index} style={{ backgroundColor: kpi.color }} className="text-white border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white/90">
                                {kpi.title}
                            </CardTitle>
                            <kpi.icon className="h-4 w-4 text-white/80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                            <p className="text-xs text-white/80 mt-1">
                                {kpi.trend}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="all-facilities" value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* Custom Creative Header Section */}
                <div className="sticky top-0 z-10 backdrop-blur py-2 -mx-4 px-4 transition-all duration-200">
                    <div className="flex bg-white flex-col md:flex-row items-center justify-between gap-4 rounded-lg p-2 border">

                        {/* Animated Tabs List */}
                        <div className="relative flex items-center flex-1 overflow-x-auto no-scrollbar mask-gradient-r">
                            <TabsList className="bg-transparent h-auto p-0 gap-2">
                                {tabs.map((tab) => (
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

                                        <span className="relative z-10 flex items-center gap-2 font-medium capitalize">
                                            {tab.value === 'all-facilities' && <Building2 className="h-4 w-4" />}
                                            {tab.value === 'add-facility' && <PlusCircle className="h-4 w-4" />}
                                            {tab.label}
                                        </span>

                                        {tab.type === 'form' && (
                                            <span
                                                className="relative z-10 ml-2 hover:bg-white/20 rounded-full p-0.5 cursor-pointer transition-colors"
                                                onClick={(e) => closeTab(e, tab.value)}
                                            >
                                                <X className="h-3 w-3" />
                                            </span>
                                        )}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {/* Search & Actions Group */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <Button onClick={handleAddFacility} size="sm" className="hidden md:flex">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Facility
                            </Button>
                            <div className="relative flex-1 md:w-[200px]">
                                <Input placeholder="Search facilities..." className="pl-8" />
                                <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </div>

                {tabs.map(tab => (
                    <TabsContent key={tab.value} value={tab.value} className="mt-0">
                        {tab.value === 'add-facility' ? (
                            <AddFacilityForm />
                        ) : (
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Facilities List</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Facility Name</TableHead>
                                                <TableHead>NPI</TableHead>
                                                <TableHead>Tax ID</TableHead>
                                                <TableHead>Phone</TableHead>
                                                <TableHead>City</TableHead>
                                                <TableHead>State</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                { id: 1, name: "City Main Clinic", npi: "1122334455", taxId: "99-8877665", phone: "(555) 123-4567", city: "New York", state: "NY" },
                                                { id: 2, name: "Southside Imaging", npi: "5544332211", taxId: "11-2233445", phone: "(555) 987-6543", city: "Brooklyn", state: "NY" },
                                                { id: 3, name: "West End Rehabilitation", npi: "6677889900", taxId: "44-5566778", phone: "(555) 456-7890", city: "Queens", state: "NY" }
                                            ].map((facility) => (
                                                <TableRow key={facility.id}>
                                                    <TableCell className="font-medium flex items-center gap-2">
                                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                                        {facility.name}
                                                    </TableCell>
                                                    <TableCell>{facility.npi}</TableCell>
                                                    <TableCell>{facility.taxId}</TableCell>
                                                    <TableCell>{facility.phone}</TableCell>
                                                    <TableCell>{facility.city}</TableCell>
                                                    <TableCell>{facility.state}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default FacilityPage;
