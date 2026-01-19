"use client";
import React from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const FeeSchedulesPage = () => {
    return (
        <div className="space-y-6">
            <SiteBreadcrumb />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Fee Schedules</h2>
                    <p className="text-muted-foreground">Manage fee schedules for different payers.</p>
                </div>
                <Button>Add Schedule</Button>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Fee Schedules</CardTitle>
                        <Input placeholder="Search schedules..." className="max-w-sm" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Effective Date</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Standard Commercial</TableCell>
                                <TableCell>Jan 1, 2024</TableCell>
                                <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Medicare 2024</TableCell>
                                <TableCell>Jan 1, 2024</TableCell>
                                <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
export default FeeSchedulesPage;
