"use client";
import React from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';

const InsuranceListPage = () => {
    return (
        <div className="space-y-6">
            <SiteBreadcrumb />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Insurance Payers</h2>
                    <p className="text-muted-foreground">Manage insurance payer list and address details.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Payer
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Payers List</CardTitle>
                        <Input placeholder="Search payers..." className="max-w-sm" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Payer Name</TableHead>
                                <TableHead>Payer ID</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3, 4].map((i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">BCBS of State {i}</TableCell>
                                    <TableCell>ABC{100 + i}</TableCell>
                                    <TableCell>Commercial</TableCell>
                                    <TableCell>PO Box {5000 + i}, City, ST</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default InsuranceListPage;
