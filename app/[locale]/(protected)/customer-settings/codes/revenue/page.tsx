"use client";
import React from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const RevenueCodesPage = () => {
    return (
        <div className="space-y-6">
            <SiteBreadcrumb />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Revenue Codes</h2>
                    <p className="text-muted-foreground">Manage UB-04 Revenue Codes.</p>
                </div>
                <Button>Add Rev Code</Button>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Revenue Codes</CardTitle>
                        <Input placeholder="Search codes..." className="max-w-sm" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Code</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">0450</TableCell>
                                <TableCell>Emergency Room - General</TableCell>
                                <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">0300</TableCell>
                                <TableCell>Laboratory - General</TableCell>
                                <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
export default RevenueCodesPage;
