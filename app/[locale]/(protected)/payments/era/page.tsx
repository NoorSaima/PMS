"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
    setActiveTab, 
    openEraTab, 
    closeTab,
    setReceivedDateFilter,
    setReceivedDateFrom,
    setReceivedDateTo,
    setCheckNumberFilter,
    setCheckAmountFilter,
    setCheckDateFilter,
    setPayerIdFilter,
    setNpiFilter,
    setTaxIdFilter,
    setEraIdFilter,
    setNewOnlyFilter,
    clearAllFilters
} from '@/store/slices/eraTabsSlice';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    FileText, Search, X, Calendar, DollarSign,
    TrendingUp, Activity, FileCheck, LayoutGrid
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';
import EraDetails from './era-details';

// Mock ERA data
const MOCK_ERA_DATA = [
    {
        id: 'ERA-2024001',
        payer: 'Blue Cross Blue Shield',
        rptDate: '2024-12-15',
        submitter: 'Medical Associates Inc.',
        checks: 3,
        amount: 3250.00,
        payment: 2950.00,
        checkDate: '2024-12-14',
        checkNumber: 'CHK-8875421',
        checkAmount: 2950.00,
        payerId: 'BCBS01',
        npi: '1234567890',
        taxId: '12-3456789',
        receivedDate: '2024-12-15',
        isNew: true,
        claims: [
            {
                claimId: 'CLM-2023-001',
                patientId: 'PAT-001',
                patientName: 'John Doe',
                processedAs: 'Primary',
                charge: 1200.00,
                paid: 1080.00,
                lines: [
                    {
                        dos: '2024-12-01',
                        proc: '99213',
                        amount: 750.00,
                        allowed: 675.00,
                        paid: 675.00,
                        remarks: 'CO-45',
                        adjReasons: 'CO-45: Charges exceed your contracted fees',
                        adjustedAmount: 75.00,
                        unpaidReasons: '',
                        unpaidAmount: 0.00
                    },
                    {
                        dos: '2024-12-01',
                        proc: '85025',
                        amount: 450.00,
                        allowed: 405.00,
                        paid: 405.00,
                        remarks: 'CO-45',
                        adjReasons: 'CO-45: Charges exceed your contracted fees',
                        adjustedAmount: 45.00,
                        unpaidReasons: '',
                        unpaidAmount: 0.00
                    }
                ]
            },
            {
                claimId: 'CLM-2023-002',
                patientId: 'PAT-002',
                patientName: 'Jane Smith',
                processedAs: 'Primary',
                charge: 950.00,
                paid: 855.00,
                lines: [
                    {
                        dos: '2024-12-02',
                        proc: '99214',
                        amount: 950.00,
                        allowed: 855.00,
                        paid: 855.00,
                        remarks: 'CO-45',
                        adjReasons: 'CO-45: Charges exceed your contracted fees',
                        adjustedAmount: 95.00,
                        unpaidReasons: '',
                        unpaidAmount: 0.00
                    }
                ]
            },
            {
                claimId: 'CLM-2023-003',
                patientId: 'PAT-003',
                patientName: 'Robert Johnson',
                processedAs: 'Primary',
                charge: 1100.00,
                paid: 1015.00,
                lines: [
                    {
                        dos: '2024-12-03',
                        proc: '99215',
                        amount: 600.00,
                        allowed: 540.00,
                        paid: 540.00,
                        remarks: 'CO-45',
                        adjReasons: 'CO-45: Charges exceed your contracted fees',
                        adjustedAmount: 60.00,
                        unpaidReasons: '',
                        unpaidAmount: 0.00
                    },
                    {
                        dos: '2024-12-03',
                        proc: '36415',
                        amount: 500.00,
                        allowed: 475.00,
                        paid: 475.00,
                        remarks: 'CO-45',
                        adjReasons: 'CO-45: Charges exceed your contracted fees',
                        adjustedAmount: 25.00,
                        unpaidReasons: '',
                        unpaidAmount: 0.00
                    }
                ]
            }
        ]
    },
    {
        id: 'ERA-2024002',
        payer: 'Medicare',
        rptDate: '2024-12-14',
        submitter: 'Medical Associates Inc.',
        checks: 2,
        amount: 1850.00,
        payment: 1665.00,
        checkDate: '2024-12-13',
        checkNumber: 'CHK-9876543',
        checkAmount: 1665.00,
        payerId: 'MC01',
        npi: '1234567890',
        taxId: '12-3456789',
        receivedDate: '2024-12-14',
        isNew: false,
        claims: [
            {
                claimId: 'CLM-2023-004',
                patientId: 'PAT-004',
                patientName: 'Mary Williams',
                processedAs: 'Primary',
                charge: 1100.00,
                paid: 990.00,
                lines: [
                    {
                        dos: '2024-12-04',
                        proc: '99213',
                        amount: 1100.00,
                        allowed: 990.00,
                        paid: 990.00,
                        remarks: 'CO-45',
                        adjReasons: 'CO-45: Charges exceed your contracted fees',
                        adjustedAmount: 110.00,
                        unpaidReasons: '',
                        unpaidAmount: 0.00
                    }
                ]
            },
            {
                claimId: 'CLM-2023-005',
                patientId: 'PAT-005',
                patientName: 'David Brown',
                processedAs: 'Primary',
                charge: 750.00,
                paid: 675.00,
                lines: [
                    {
                        dos: '2024-12-05',
                        proc: '99214',
                        amount: 750.00,
                        allowed: 675.00,
                        paid: 675.00,
                        remarks: 'CO-45',
                        adjReasons: 'CO-45: Charges exceed your contracted fees',
                        adjustedAmount: 75.00,
                        unpaidReasons: '',
                        unpaidAmount: 0.00
                    }
                ]
            }
        ]
    },
    {
        id: 'ERA-2024003',
        payer: 'Aetna',
        rptDate: '2024-12-13',
        submitter: 'Medical Associates Inc.',
        checks: 1,
        amount: 625.00,
        payment: 562.50,
        checkDate: '2024-12-12',
        checkNumber: 'CHK-5554321',
        checkAmount: 562.50,
        payerId: 'AET01',
        npi: '1234567890',
        taxId: '12-3456789',
        receivedDate: '2024-12-13',
        isNew: true,
        claims: [
            {
                claimId: 'CLM-2023-006',
                patientId: 'PAT-006',
                patientName: 'Sarah Davis',
                processedAs: 'Secondary',
                charge: 625.00,
                paid: 562.50,
                lines: [
                    {
                        dos: '2024-12-06',
                        proc: '90834',
                        amount: 625.00,
                        allowed: 562.50,
                        paid: 562.50,
                        remarks: 'CO-45',
                        adjReasons: 'CO-45: Charges exceed your contracted fees',
                        adjustedAmount: 62.50,
                        unpaidReasons: '',
                        unpaidAmount: 0.00
                    }
                ]
            }
        ]
    }
];

const EraPage = () => {
    const [config] = useConfig();
    const dispatch = useAppDispatch();
    
    // Get state from Redux
    const { 
        activeTab, 
        tabs,
        receivedDateFilter,
        receivedDateFrom,
        receivedDateTo,
        checkNumberFilter,
        checkAmountFilter,
        checkDateFilter,
        payerIdFilter,
        npiFilter,
        taxIdFilter,
        eraIdFilter,
        newOnlyFilter
    } = useAppSelector(state => state.eraTabs);

    const handleViewEra = (era: any) => {
        dispatch(openEraTab(era));
    };

    const handleCloseTab = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(closeTab(value));
    };

    const handleSearch = () => {
        console.log("Searching with filters...");
        // Implement search logic here
    };

    const handleClearFilters = () => {
        dispatch(clearAllFilters());
    };

    // KPI calculations
    const totalERAs = MOCK_ERA_DATA.length;
    const totalAmount = MOCK_ERA_DATA.reduce((sum, era) => sum + era.amount, 0);
    const totalPayment = MOCK_ERA_DATA.reduce((sum, era) => sum + era.payment, 0);
    const totalClaims = MOCK_ERA_DATA.reduce((sum, era) => sum + era.claims.length, 0);

    return (
        <div className="min-h-screen">
            <SiteBreadcrumb />

            <Tabs value={activeTab} onValueChange={(value) => dispatch(setActiveTab(value))} className="w-full space-y-2 mt-4">
                {/* Header Section with Tabs */}
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
                                                layoutId="active-tab-pill-era"
                                                className={cn(
                                                    "absolute inset-0 rounded-lg",
                                                    config.headerColor === "light" ? "bg-primary" : `theme-${config.headerColor} bg-header`
                                                )}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}

                                        <span className="relative z-10 flex items-center gap-2 font-medium">
                                            {tab.value === "all-eras" ? (
                                                <LayoutGrid className="w-4 h-4" />
                                            ) : (
                                                <FileText className="w-4 h-4" />
                                            )}
                                            {tab.label}
                                        </span>

                                        {tab.value !== "all-eras" && (
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
                    </div>
                </div>

                {/* All ERAs Tab Content */}
                <TabsContent value="all-eras" className="mt-0 outline-none">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {/* KPI Cards */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card style={{ backgroundColor: "#4098d7" }} className="border-none shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-white">Total ERAs</CardTitle>
                                    <FileCheck className="h-4 w-4 text-white" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-white">{totalERAs}</div>
                                    <p className="text-xs text-white/90">Received this month</p>
                                </CardContent>
                            </Card>

                            <Card style={{ backgroundColor: "#3aa981" }} className="border-none shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-white">Total Payment</CardTitle>
                                    <DollarSign className="h-4 w-4 text-white" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-white">${totalPayment.toFixed(2)}</div>
                                    <p className="text-xs text-white/90">Payment received</p>
                                </CardContent>
                            </Card>

                            <Card style={{ backgroundColor: "#f29857" }} className="border-none shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-white">Total Billed</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-white" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-white">${totalAmount.toFixed(2)}</div>
                                    <p className="text-xs text-white/90">Total charges</p>
                                </CardContent>
                            </Card>

                            <Card style={{ backgroundColor: "#9b87f5" }} className="border-none shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-white">Total Claims</CardTitle>
                                    <Activity className="h-4 w-4 text-white" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-white">{totalClaims}</div>
                                    <p className="text-xs text-white/90">Claims processed</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Filters */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Search className="h-5 w-5" />
                                    Filters
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* ERA Received Date */}
                                    <div className="space-y-2">
                                        <Label>ERA Received Date</Label>
                                        <Select value={receivedDateFilter} onValueChange={(value) => dispatch(setReceivedDateFilter(value))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All</SelectItem>
                                                <SelectItem value="today">Today</SelectItem>
                                                <SelectItem value="range">Date Range</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {receivedDateFilter === "range" && (
                                        <>
                                            <div className="space-y-2">
                                                <Label>From Date</Label>
                                                <Input type="date" value={receivedDateFrom} onChange={(e) => dispatch(setReceivedDateFrom(e.target.value))} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>To Date</Label>
                                                <Input type="date" value={receivedDateTo} onChange={(e) => dispatch(setReceivedDateTo(e.target.value))} />
                                            </div>
                                        </>
                                    )}

                                    {/* Check Number */}
                                    <div className="space-y-2">
                                        <Label>Check Number</Label>
                                        <Input placeholder="Enter check number" value={checkNumberFilter} onChange={(e) => dispatch(setCheckNumberFilter(e.target.value))} />
                                    </div>

                                    {/* Check Amount */}
                                    <div className="space-y-2">
                                        <Label>Check Amount</Label>
                                        <Input type="number" placeholder="Enter amount" value={checkAmountFilter} onChange={(e) => dispatch(setCheckAmountFilter(e.target.value))} />
                                    </div>

                                    {/* Check Date */}
                                    <div className="space-y-2">
                                        <Label>Check Date</Label>
                                        <Input type="date" value={checkDateFilter} onChange={(e) => dispatch(setCheckDateFilter(e.target.value))} />
                                    </div>

                                    {/* Payer ID */}
                                    <div className="space-y-2">
                                        <Label>Payer ID</Label>
                                        <Input placeholder="Enter payer ID" value={payerIdFilter} onChange={(e) => dispatch(setPayerIdFilter(e.target.value))} />
                                    </div>

                                    {/* NPI */}
                                    <div className="space-y-2">
                                        <Label>NPI</Label>
                                        <Input placeholder="Enter NPI" value={npiFilter} onChange={(e) => dispatch(setNpiFilter(e.target.value))} />
                                    </div>

                                    {/* Tax ID */}
                                    <div className="space-y-2">
                                        <Label>Tax ID</Label>
                                        <Input placeholder="Enter tax ID" value={taxIdFilter} onChange={(e) => dispatch(setTaxIdFilter(e.target.value))} />
                                    </div>

                                    {/* ERA ID */}
                                    <div className="space-y-2">
                                        <Label>ERA ID</Label>
                                        <Input placeholder="Enter ERA ID" value={eraIdFilter} onChange={(e) => dispatch(setEraIdFilter(e.target.value))} />
                                    </div>

                                    {/* New Only or All */}
                                    <div className="space-y-2">
                                        <Label>Status</Label>
                                        <Select value={newOnlyFilter} onValueChange={(value) => dispatch(setNewOnlyFilter(value))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All</SelectItem>
                                                <SelectItem value="new">New Only</SelectItem>
                                                <SelectItem value="processed">Processed Only</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 mt-4">
                                    <Button onClick={handleSearch} className="gap-2">
                                        <Search className="h-4 w-4" />
                                        Search
                                    </Button>
                                    <Button variant="outline" onClick={handleClearFilters}>
                                        Clear Filters
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* ERA Table */}
                        <Card>
                            <CardHeader>
                                <CardTitle>ERA List</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Payer</TableHead>
                                            <TableHead>RPT Date</TableHead>
                                            <TableHead>Submitter</TableHead>
                                            <TableHead className="text-right">Checks</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                            <TableHead className="text-right">Payment</TableHead>
                                            <TableHead>Check Date</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {MOCK_ERA_DATA.map((era) => (
                                            <TableRow key={era.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        {era.payer}
                                                        {era.isNew && (
                                                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{era.rptDate}</TableCell>
                                                <TableCell>{era.submitter}</TableCell>
                                                <TableCell className="text-right">{era.checks}</TableCell>
                                                <TableCell className="text-right">${era.amount.toFixed(2)}</TableCell>
                                                <TableCell className="text-right text-emerald-600 font-medium">${era.payment.toFixed(2)}</TableCell>
                                                <TableCell>{era.checkDate}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm" onClick={() => handleViewEra(era)}>
                                                            View
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <FileText className="h-4 w-4" />
                                                            PDF
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* ERA Details Tabs */}
                {tabs.map(tab => {
                    if (tab.value === "all-eras") return null;
                    return (
                        <TabsContent key={tab.value} value={tab.value} className="mt-0 outline-none">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <EraDetails era={tab.era!} />
                            </motion.div>
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    );
};

export default EraPage;
