"use client";
import React from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CptCodesPage = () => {
    return (
        <div className="space-y-6">
            <SiteBreadcrumb />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">CPT Codes</h2>
                    <p className="text-muted-foreground">Manage Current Procedural Terminology codes.</p>
                </div>
                <Button>Add CPT Code</Button>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>CPT Library</CardTitle>
                        <Input placeholder="Search CPT codes..." className="max-w-sm" />
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
                                <TableCell className="font-medium">99213</TableCell>
                                <TableCell>Office or other outpatient visit for the evaluation and management of an established patient</TableCell>
                                <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">99203</TableCell>
                                <TableCell>Office or other outpatient visit for the evaluation and management of a new patient</TableCell>
                                <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
export default CptCodesPage;
