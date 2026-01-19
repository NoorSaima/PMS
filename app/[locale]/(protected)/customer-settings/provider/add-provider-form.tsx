"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const AddProviderForm = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Provider&apos;s personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="First Name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="middleInitial">Middle Initial</Label>
                            <Input id="middleInitial" placeholder="MI" maxLength={2} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="e.g. MD, DO" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select>
                                <SelectTrigger id="gender">
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="doctor@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="extension">Extension</Label>
                            <Input id="extension" placeholder="Ext." />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Professional Information</CardTitle>
                    <CardDescription>Credentials and practice details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="taxonomyCode">Taxonomy Code</Label>
                            <Input id="taxonomyCode" placeholder="Taxonomy Code" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="npi">NPI</Label>
                            <Input id="npi" placeholder="NPI Number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="eda">EDA (DEA)</Label>
                            <Input id="eda" placeholder="DEA Number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="upin">UPIN</Label>
                            <Input id="upin" placeholder="UPIN" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="providerType">Provider Type</Label>
                            <Select>
                                <SelectTrigger id="providerType">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="individual">Individual</SelectItem>
                                    <SelectItem value="organization">Organization</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="practice">Practice</Label>
                            <Input id="practice" placeholder="Practice Name" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="specialtyLicense">Specialty License</Label>
                            <Input id="specialtyLicense" placeholder="License #" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stateLicense">State License</Label>
                            <Input id="stateLicense" placeholder="License #" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="anesthesiaLicense">Anesthesia License</Label>
                            <Input id="anesthesiaLicense" placeholder="License #" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Billing & Insurance Configuration</CardTitle>
                    <CardDescription>Billing preferences and IDs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="bluecross">Bluecross</Label>
                            <Input id="bluecross" placeholder="Bluecross ID" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="idNo">ID No</Label>
                            <Input id="idNo" placeholder="ID Number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="billAs">Bill As</Label>
                            <Select>
                                <SelectTrigger id="billAs">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="individual">Individual</SelectItem>
                                    <SelectItem value="group">Group</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6 pt-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="billProfessional" />
                            <Label htmlFor="billProfessional">Bill Professional</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="billInstitutional" />
                            <Label htmlFor="billInstitutional">Bill Institutional</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isReferProvider" />
                            <Label htmlFor="isReferProvider">Is Refer Provider</Label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Address & Contact</CardTitle>
                    <CardDescription>Provider&apos;s primary residence/office details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="residenceLine1">Residence Line 1</Label>
                        <Input id="residenceLine1" placeholder="Address Line 1" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="residenceLine2">Residence Line 2</Label>
                        <Input id="residenceLine2" placeholder="Address Line 2 (Optional)" />
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" placeholder="(555) 000-0000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fax">Fax</Label>
                            <Input id="fax" placeholder="(555) 000-0000" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-2 pb-10">
                <Button variant="outline">Cancel</Button>
                <Button>Save Provider</Button>
            </div>
        </div>
    );
};

export default AddProviderForm;
