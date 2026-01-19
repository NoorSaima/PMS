"use client";
import React, { useState } from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, List, Building, User, PlusCircle, X, Receipt } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';
import AddInsurancePayment from './add-insurance-payment';
import PaymentDetails from './payment-details'; // Imported PaymentDetails
import { PaymentsKpiCards } from '@/components/payments/payments-kpi-cards';

interface TabData {
    value: string;
    label: string;
    type?: 'list' | 'form' | 'details'; // Added 'details' type
    paymentData?: any; // Added to store payment data for details view
}

const ViewPaymentsPage = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [config] = useConfig();
    const [tabs, setTabs] = useState<TabData[]>([
        { value: "all", label: "All Payments", type: 'list' },
        { value: "insurance", label: "Insurance Payments", type: 'list' },
        { value: "patient", label: "Patient Payments", type: 'list' }
    ]);

    const handleAddInsurancePayment = () => {
        const newValue = "add-insurance-payment";
        if (!tabs.find(t => t.value === newValue)) {
            setTabs(prev => [...prev, { value: newValue, label: "New Insurance Payment", type: 'form' }]);
        }
        setActiveTab(newValue);
    };

    const handleViewDetails = (payment: any) => {
        const newValue = `payment-details-${payment.id}`;
        // Mocking full details data based on the row data
        const fullPaymentData = {
            id: payment.id,
            patientName: payment.patient,
            providerName: payment.provider,
            payerName: payment.payer,
            amount: payment.amount,
            date: payment.date,
            method: payment.method,
            reference: "CHK-987654321", // Mocked
            checkDate: payment.date,
            depositDate: "Dec 19, 2024", // Mocked
            clearanceDate: "Dec 20, 2024", // Mocked
            source: "Cheque"
        };

        if (!tabs.find(t => t.value === newValue)) {
            setTabs(prev => [...prev, {
                value: newValue,
                label: `Details ${payment.id}`,
                type: 'details',
                paymentData: fullPaymentData
            }]);
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
            <PaymentsKpiCards />
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                                            {tab.value === 'all' && <List className="h-4 w-4" />}
                                            {tab.value === 'insurance' && <Building className="h-4 w-4" />}
                                            {tab.value === 'patient' && <User className="h-4 w-4" />}
                                            {tab.value === 'add-insurance-payment' && <PlusCircle className="h-4 w-4" />}
                                            {tab.type === 'details' && <Receipt className="h-4 w-4" />}
                                            {tab.label}
                                        </span>

                                        {(tab.type === 'form' || tab.type === 'details') && (
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
                            <Button onClick={handleAddInsurancePayment} size="sm" className="hidden md:flex">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Insurance Payment
                            </Button>
                            <div className="relative flex-1 md:w-[200px]">
                                <Input placeholder="Search payments..." className="pl-8" />
                                <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </div>

                {tabs.map(tab => (
                    <TabsContent key={tab.value} value={tab.value} className="mt-0">
                        {tab.value === 'add-insurance-payment' ? (
                            <AddInsurancePayment />
                        ) : tab.type === 'details' ? (
                            <PaymentDetails payment={tab.paymentData} />
                        ) : (
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>{tab.label} Queue</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Payment ID</TableHead>
                                                <TableHead>Patient</TableHead>
                                                <TableHead>Provider</TableHead>
                                                <TableHead>Payer</TableHead>
                                                <TableHead>Method</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[1, 2, 3, 4, 5].map((i) => {
                                                const payment = {
                                                    id: `#PAY-${5000 + i}`,
                                                    patient: i % 2 === 0 ? 'John Doe' : 'Jane Smith',
                                                    provider: 'Dr. Smith',
                                                    payer: 'United Health',
                                                    method: 'Credit Card',
                                                    amount: '$150.00',
                                                    date: 'Dec 18, 2024'
                                                };
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell className="font-medium">{payment.id}</TableCell>
                                                        <TableCell>{payment.patient}</TableCell>
                                                        <TableCell>{payment.provider}</TableCell>
                                                        <TableCell>{payment.payer}</TableCell>
                                                        <TableCell>{payment.method}</TableCell>
                                                        <TableCell>{payment.amount}</TableCell>
                                                        <TableCell>{payment.date}</TableCell>
                                                        <TableCell className="text-right">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleViewDetails(payment)}
                                                            >
                                                                Details
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
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

export default ViewPaymentsPage;
