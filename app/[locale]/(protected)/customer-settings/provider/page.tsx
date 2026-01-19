"use client";
import React, { useState } from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, UserPlus, Users, PlusCircle, X, UserCheck, UserX, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import AddProviderForm from './add-provider-form';

interface TabData {
    value: string;
    label: string;
    type?: 'list' | 'form';
}

const ProviderPage = () => {
    const [activeTab, setActiveTab] = useState("all-providers");
    const [config] = useConfig();
    const [tabs, setTabs] = useState<TabData[]>([
        { value: "all-providers", label: "All Providers", type: 'list' },
    ]);

    const handleAddProvider = () => {
        const newValue = "add-provider";
        if (!tabs.find(t => t.value === newValue)) {
            setTabs(prev => [...prev, { value: newValue, label: "New Provider", type: 'form' }]);
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
                    { title: "Total Providers", value: "24", icon: Users, color: "#4098d7", trend: "+2 this month" },
                    { title: "Active Providers", value: "18", icon: UserCheck, color: "#3aa981", trend: "75% of total" },
                    { title: "Inactive Providers", value: "4", icon: UserX, color: "#f29857", trend: "Requires review" },
                    { title: "Pending Compliance", value: "2", icon: AlertCircle, color: "#d15c89", trend: "Urgent attention" },
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

            <Tabs defaultValue="all-providers" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                                            {tab.value === 'all-providers' && <Users className="h-4 w-4" />}
                                            {tab.value === 'add-provider' && <UserPlus className="h-4 w-4" />}
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
                            <Button onClick={handleAddProvider} size="sm" className="hidden md:flex">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Provider
                            </Button>
                            <div className="relative flex-1 md:w-[200px]">
                                <Input placeholder="Search providers..." className="pl-8" />
                                <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </div>

                {tabs.map(tab => (
                    <TabsContent key={tab.value} value={tab.value} className="mt-0">
                        {tab.value === 'add-provider' ? (
                            <AddProviderForm />
                        ) : (
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Provider List</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Provider Name</TableHead>
                                                <TableHead>Credentials</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Practice</TableHead>
                                                <TableHead>Contact</TableHead>
                                                <TableHead>Address</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                { id: 1, name: "John Smith", title: "MD", npi: "1234567890", taxonomy: "207Q00000X", type: "Individual", practice: "Heart Care Center", phone: "(555) 123-4567", email: "dr.smith@heartcare.com", city: "New York", state: "NY" },
                                                { id: 2, name: "Sarah Johnson", title: "DO", npi: "9876543210", taxonomy: "207R00000X", type: "Individual", practice: "City Medical Group", phone: "(555) 987-6543", email: "s.johnson@citymed.com", city: "Brooklyn", state: "NY" },
                                                { id: 3, name: "Michael Brown", title: "PA-C", npi: "1122334455", taxonomy: "363A00000X", type: "Individual", practice: "Community Health", phone: "(555) 456-7890", email: "m.brown@commhealth.org", city: "Queens", state: "NY" },
                                            ].map((provider) => (
                                                <TableRow key={provider.id}>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-9 w-9">
                                                                <AvatarFallback>{provider.title.substring(0, 2)}</AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-sm">{provider.name}, {provider.title}</span>
                                                                <span className="text-xs text-muted-foreground">{provider.email}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col text-sm">
                                                            <span className="font-medium">NPI: {provider.npi}</span>
                                                            <span className="text-xs text-muted-foreground">Tax: {provider.taxonomy}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-sm">{provider.type}</span>
                                                    </TableCell>
                                                    <TableCell className="text-sm font-medium">{provider.practice}</TableCell>
                                                    <TableCell className="text-sm">{provider.phone}</TableCell>
                                                    <TableCell className="text-sm">
                                                        {provider.city}, {provider.state}
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                                            Active
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                                                                <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                                                            </svg>
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

export default ProviderPage;
