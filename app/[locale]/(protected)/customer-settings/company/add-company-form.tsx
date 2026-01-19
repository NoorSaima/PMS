"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AddCompanyForm = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>Basic details about the company.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" placeholder="Enter company name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" placeholder="Short description" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Contact Person</CardTitle>
                    <CardDescription>Primary contact details for this company.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="First Name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="middleName">Middle Name</Label>
                            <Input id="middleName" placeholder="Middle Name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="contact@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="primaryPhone">Primary Phone</Label>
                            <Input id="primaryPhone" placeholder="(555) 000-0000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="secondaryPhone">Secondary Phone</Label>
                            <Input id="secondaryPhone" placeholder="(555) 000-0000" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Address Details</CardTitle>
                    <CardDescription>Physical location of the company.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="address">Company Address</Label>
                        <Input id="address" placeholder="123 Street Name" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="City" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" placeholder="State" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <Input id="zipCode" placeholder="Zip Code" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="countryCode">Country Code</Label>
                            <Input id="countryCode" placeholder="US" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Branding & customization</CardTitle>
                    <CardDescription>Header and footer information for reports and documents.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="companyHeader">Company Header</Label>
                        <Input id="companyHeader" placeholder="Header text" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="headerDetail">Header Detail</Label>
                        <Textarea id="headerDetail" placeholder="Additional header details..." className="h-20" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="footer1">Footer 1</Label>
                            <Textarea id="footer1" placeholder="Footer line 1..." className="h-20" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="footer2">Footer 2</Label>
                            <Textarea id="footer2" placeholder="Footer line 2..." className="h-20" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-2 pb-10">
                <Button variant="outline">Cancel</Button>
                <Button>Save Company</Button>
            </div>
        </div>
    );
};

export default AddCompanyForm;
