"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const AddFacilityForm = () => {
    const [date, setDate] = React.useState<Date>();

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>Basic facility identification details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="facilityName">Facility Name</Label>
                            <Input id="facilityName" placeholder="Facility Name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="practice">Practice</Label>
                            <Input id="practice" placeholder="Practice Name" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="npi">NPI</Label>
                            <Input id="npi" placeholder="NPI Number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="taxId">Tax ID</Label>
                            <Input id="taxId" placeholder="Tax ID" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="taxonomySpeciality">Taxonomy Speciality</Label>
                            <Input id="taxonomySpeciality" placeholder="Taxonomy Speciality" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="placeOfService">Place of Service</Label>
                        <Select>
                            <SelectTrigger id="placeOfService">
                                <SelectValue placeholder="Select Place of Service" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="11">Office (11)</SelectItem>
                                <SelectItem value="21">Inpatient Hospital (21)</SelectItem>
                                <SelectItem value="22">Outpatient Hospital (22)</SelectItem>
                                <SelectItem value="23">Emergency Room - Hospital (23)</SelectItem>
                                <SelectItem value="24">Ambulatory Surgical Center (24)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>CLIA Information</CardTitle>
                    <CardDescription>Clinical Laboratory Improvement Amendments details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cliaNumber">CLIA Number</Label>
                            <Input id="cliaNumber" placeholder="CLIA Number" />
                        </div>
                        <div className="space-y-2">
                            <Label>CLIA Expiry</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Address & Contact</CardTitle>
                    <CardDescription>Physical location and contact methods.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="location">Location (Line 1)</Label>
                        <Input id="location" placeholder="Address Line 1" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location2">Location 2</Label>
                        <Input id="location2" placeholder="Address Line 2 (Optional)" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" placeholder="(555) 000-0000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fax">Fax</Label>
                            <Input id="fax" placeholder="(555) 000-0000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="facility@example.com" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-2 pb-10">
                <Button variant="outline">Cancel</Button>
                <Button>Save Facility</Button>
            </div>
        </div>
    );
};

export default AddFacilityForm;
