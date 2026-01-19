"use client";
import React from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const IcdCodesPage = () => {
    return (
        <div className="space-y-6">
            <SiteBreadcrumb />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">ICD Codes</h2>
                    <p className="text-muted-foreground">Manage International Classification of Diseases codes.</p>
                </div>
                <Button>Add ICD Code</Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>ICD Library</CardTitle>
                        <Input placeholder="Search ICD codes..." className="max-w-sm" />
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
                                <TableCell className="font-medium">A00.0</TableCell>
                                <TableCell>Cholera due to Vibrio cholerae 01, biovar cholerae</TableCell>
                                <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">J01.90</TableCell>
                                <TableCell>Acute sinusitis, unspecified</TableCell>
                                <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">E11.9</TableCell>
                                <TableCell>Type 2 diabetes mellitus without complications</TableCell>
                                <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
export default IcdCodesPage;
