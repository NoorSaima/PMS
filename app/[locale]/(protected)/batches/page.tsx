"use client";
import React from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Layers, FileText, CheckCircle, XCircle } from 'lucide-react';

const BatchesPage = () => {
    return (
        <div className="space-y-6">
            <SiteBreadcrumb />

            {/* KPI Section */}
            <div className="grid gap-4 md:grid-cols-3">
                {[
                    {
                        title: "Today's Batches",
                        value: "24",
                        icon: Layers,
                        color: "#4098d7" // Blue
                    },
                    {
                        title: "Claims Processed",
                        value: "842",
                        icon: FileText,
                        color: "#f29857" // Orange
                    },
                    {
                        title: "Success Rate",
                        value: "98.5%",
                        icon: CheckCircle,
                        color: "#3aa981" // Green
                    }
                ].map((kpi, index) => (
                    <Card key={index} style={{ backgroundColor: kpi.color }} className="border-none shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white">{kpi.title}</CardTitle>
                            <kpi.icon className="h-4 w-4 text-white" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{kpi.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Batch History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Layers className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Batch #BATCH-{202400 + i}</p>
                                        <p className="text-sm text-muted-foreground">Created by Admin • 2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden md:block">
                                        <p className="text-sm font-medium">145 Claims</p>
                                        <p className="text-xs text-muted-foreground">$45,230.00</p>
                                    </div>
                                    <Badge color="success" className="bg-green-500/10 text-green-600 border-green-200">
                                        Processed
                                    </Badge>
                                    <Button variant="ghost" size="sm">View</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BatchesPage;
