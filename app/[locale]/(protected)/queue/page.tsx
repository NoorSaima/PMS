"use client";
import React, { useState } from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle2, AlertCircle, List, Filter, FileText, Building, User, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';
import { Checkbox } from '@/components/ui/checkbox';
import QueueItemDetails from './queue-item-details';

const QueuePage = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [config] = useConfig();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedItemForDetails, setSelectedItemForDetails] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const kpiData = [
        {
            title: "Items in Queue",
            value: "128",
            description: "+10% from last hour",
            icon: Clock,
            bgColor: "#4098d7", // Softer Blue
        },
        {
            title: "Processing",
            value: "12",
            description: "Active processes",
            icon: Clock,
            bgColor: "#f29857", // Softer Orange
        },
        {
            title: "Completed",
            value: "1,024",
            description: "Today's completions",
            icon: CheckCircle2,
            bgColor: "#3aa981", // Softer Green
        },
        {
            title: "Failed",
            value: "3",
            description: "Requires attention",
            icon: AlertCircle,
            bgColor: "#d15c89", // Softer Pink (using as red/alert)
        },
    ];

    const generateMockData = (type: string) => {
        return Array.from({ length: 5 }).map((_, i) => ({
            id: 2000 + i,
            claimId: `CLM-${2000 + i}`,
            type: type === 'all' ? (i % 2 === 0 ? 'Professional' : 'Institutional') : type === 'professional' ? 'Professional' : 'Institutional',
            patient: type === 'all' ? (i % 2 === 0 ? 'John Doe' : 'Jane Smith') : 'Specific Patient',
            rendering: i % 2 === 0 ? 'Dr. Sarah Johnson' : 'Dr. Michael Chen',
            billing: 'Medical Associates Inc.',
            facility: i % 3 === 0 ? 'Memorial Hospital' : 'Central Medical Center',
            time: `10:${30 + i} AM`,
            status: i === 0 ? 'Processing' : 'Pending',
            totalCharge: (1500 + (i * 250)).toFixed(2),
            totalPaid: (800 + (i * 150)).toFixed(2),
            primaryInsurance: {
                individualPolicy: `POL-${10000 + i}`,
                memberId: `MEM-${20000 + i}`,
                authorization: `AUTH-${30000 + i}`,
            },
            secondaryInsurance: {
                memberId: i % 2 === 0 ? `SEC-${40000 + i}` : 'N/A',
                authorization: i % 2 === 0 ? `SAUTH-${50000 + i}` : 'N/A',
            },
            tertiaryInsurance: {
                memberId: i % 3 === 0 ? `TER-${60000 + i}` : 'N/A',
                authorization: i % 3 === 0 ? `TAUTH-${70000 + i}` : 'N/A',
            },
            queueLines: [
                {
                    from: '2024-01-15',
                    to: '2024-01-15',
                    cpt: '99213',
                    mods: 'GT',
                    pos: '11',
                    tos: '1',
                    units: '1',
                    price: '150.00',
                    charge: '150.00',
                    paid: '120.00',
                },
                {
                    from: '2024-01-15',
                    to: '2024-01-15',
                    cpt: '90834',
                    mods: '',
                    pos: '11',
                    tos: '1',
                    units: '1',
                    price: '200.00',
                    charge: '200.00',
                    paid: '180.00',
                },
            ],
        }));
    };

    const getItems = () => generateMockData(activeTab);
    const currentItems = getItems();

    const toggleSelection = (id: number) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === currentItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(currentItems.map(item => item.id));
        }
    };

    const handleSendToBatch = () => {
        console.log("Sending to batch:", selectedItems);
        // Implement batch sending logic here
        setSelectedItems([]);
    };

    const handleViewDetails = (item: any) => {
        setSelectedItemForDetails(item);
        setIsDetailsOpen(true);
    };

    return (
        <div className="space-y-6">
            <SiteBreadcrumb />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpiData.map((kpi, index) => (
                    <Card
                        key={index}
                        style={{ backgroundColor: kpi.bgColor }}
                        className="border-none shadow-md"
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white">{kpi.title}</CardTitle>
                            <kpi.icon className="h-4 w-4 text-white" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{kpi.value}</div>
                            <p className="text-xs text-white/90">{kpi.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={(val) => { setActiveTab(val); setSelectedItems([]); }} className="w-full">

                {/* Custom Creative Header Section Matching Patients Page */}
                <div className="sticky top-0 z-10 backdrop-blur py-2 -mx-4 px-4 transition-all duration-200">
                    <div className="flex bg-white flex-col md:flex-row items-center justify-between gap-4 rounded-lg p-2 border">

                        {/* Animated Tabs List */}
                        <div className="relative flex items-center flex-1 overflow-x-auto no-scrollbar mask-gradient-r">
                            <TabsList className="bg-transparent h-auto p-0 gap-2">
                                {['all', 'professional', 'institutional'].map((tabValue) => (
                                    <TabsTrigger
                                        key={tabValue}
                                        value={tabValue}
                                        className={cn(
                                            "relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300",
                                            "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                                            "hover:bg-muted/50 bg-slate-100 data-[state=active]:text-primary-foreground"
                                        )}
                                    >
                                        {activeTab === tabValue && (
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
                                            {tabValue === 'all' && <List className="h-4 w-4" />}
                                            {tabValue === 'professional' && <User className="h-4 w-4" />}
                                            {tabValue === 'institutional' && <Building className="h-4 w-4" />}
                                            {tabValue}
                                        </span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {/* Search & Actions Group */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <AnimatePresence>
                                {selectedItems.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                    >
                                        <Button onClick={handleSendToBatch} className="bg-primary text-primary-foreground gap-2">
                                            <Layers className="h-4 w-4" />
                                            Send to Batch ({selectedItems.length})
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="relative flex-1 md:w-[200px]">
                                <Input placeholder="Search queue..." className="pl-8" />
                                <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                            <Select defaultValue="all_status">
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all_status">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline">More Filters</Button>
                        </div>
                    </div>
                </div>

                {/* Shared Content Structure for all tabs */}
                {['all', 'professional', 'institutional'].map((tabValue) => (
                    <TabsContent key={tabValue} value={tabValue} className="mt-0">
                        <Card>
                            <CardHeader className="flex flex-row items-center space-y-0 gap-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={currentItems.length > 0 && selectedItems.length === currentItems.length}
                                        onCheckedChange={toggleSelectAll}
                                        id={`select-all-${tabValue}`}
                                    />
                                    <label htmlFor={`select-all-${tabValue}`} className="text-sm font-medium cursor-pointer">
                                        Select All
                                    </label>
                                </div>
                                <div className="ml-auto">
                                    <CardTitle className="capitalize text-lg">{tabValue === 'all' ? 'All Items' : `${tabValue} Claims Queue`}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ScrollArea className="h-[400px]">
                                    <div className="space-y-4 px-2">
                                        {currentItems.map((item, i) => (
                                            <div
                                                key={item.id}
                                                className={cn(
                                                    "flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors",
                                                    selectedItems.includes(item.id) && "bg-muted/50 border-primary/50"
                                                )}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Checkbox
                                                        checked={selectedItems.includes(item.id)}
                                                        onCheckedChange={() => toggleSelection(item.id)}
                                                    />
                                                    <div className={`p-2 rounded-full ${item.type === 'Professional' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                                                        {item.type === 'Professional' ? <User className={`h-5 w-5 ${item.type === 'Professional' ? 'text-blue-600' : 'text-purple-600'}`} /> : <Building className={`h-5 w-5 ${item.type === 'Professional' ? 'text-blue-600' : 'text-purple-600'}`} />}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-sm font-medium leading-none">
                                                                Claim Submission #{item.id}
                                                            </p>
                                                            <Badge color="secondary" className="text-[10px] h-5">
                                                                {item.type}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            Patient: {item.patient} • Queued at {item.time}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <Badge color={item.status === 'Processing' ? 'warning' : 'secondary'} className={item.status === 'Processing' ? 'bg-orange-100 text-orange-700 hover:bg-orange-100' : ''}>
                                                        {item.status}
                                                    </Badge>
                                                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(item)}>Details</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>

            {/* Queue Item Details Dialog */}
            <QueueItemDetails
                item={selectedItemForDetails}
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
            />
        </div>
    );
};

export default QueuePage;
