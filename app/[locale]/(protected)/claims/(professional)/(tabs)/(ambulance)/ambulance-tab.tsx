"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function AmbulanceTab() {
    return (
        <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
                <CardTitle>Ambulance Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Transport & Patient Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="transportReason">Transport Reason</Label>
                        <Select>
                            <SelectTrigger id="transportReason">
                                <SelectValue placeholder="Select Reason" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A">Patient was transported to nearest facility</SelectItem>
                                <SelectItem value="B">Patient was transported for benefit of specialist</SelectItem>
                                <SelectItem value="C">Patient was transported for other reasons</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="transportMiles">Transport Miles</Label>
                        <Input id="transportMiles" placeholder="0.0" type="number" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="patientWeight">Patient Weight (lbs)</Label>
                        <Input id="patientWeight" placeholder="0.0" type="number" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="roundTripReason">Round Trip Reason</Label>
                        <Input id="roundTripReason" placeholder="Reason" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stretcherReason">Stretcher Reason</Label>
                        <Input id="stretcherReason" placeholder="Reason" />
                    </div>
                </div>

                <Separator />

                {/* Condition Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <Checkbox id="stretcherUsed" />
                        <Label htmlFor="stretcherUsed" className="cursor-pointer">Stretcher Used</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <Checkbox id="bedConfinedBefore" />
                        <Label htmlFor="bedConfinedBefore" className="cursor-pointer">Bed Confined (Before)</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <Checkbox id="bedConfinedAfter" />
                        <Label htmlFor="bedConfinedAfter" className="cursor-pointer">Bed Confined (After)</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <Checkbox id="instock" />
                        <Label htmlFor="instock" className="cursor-pointer">Instock</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <Checkbox id="emergency" />
                        <Label htmlFor="emergency" className="cursor-pointer">Emergency</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <Checkbox id="restraintUsed" />
                        <Label htmlFor="restraintUsed" className="cursor-pointer">Restraint Used</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <Checkbox id="visibleHemorrhaging" />
                        <Label htmlFor="visibleHemorrhaging" className="cursor-pointer">Visible Hemorrhaging</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <Checkbox id="patientAdmitted" />
                        <Label htmlFor="patientAdmitted" className="cursor-pointer">Patient Admitted</Label>
                    </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pickup Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            Pickup Information
                        </h3>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="pickupAddress1">Address Line 1</Label>
                                <Input id="pickupAddress1" placeholder="Street Address" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pickupAddress2">Address Line 2</Label>
                                <Input id="pickupAddress2" placeholder="Apt, Suite, etc." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="pickupCity">City</Label>
                                    <Input id="pickupCity" placeholder="City" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pickupState">State</Label>
                                    <Input id="pickupState" placeholder="State" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pickupZip">Zip Code</Label>
                                <Input id="pickupZip" placeholder="Zip Code" />
                            </div>
                        </div>
                    </div>

                    {/* Dropoff Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            Dropoff Information
                        </h3>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dropoffName">Name (Facility / Person)</Label>
                                <Input id="dropoffName" placeholder="Facility or Person Name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dropoffAddress1">Address Line 1</Label>
                                <Input id="dropoffAddress1" placeholder="Street Address" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dropoffAddress2">Address Line 2</Label>
                                <Input id="dropoffAddress2" placeholder="Apt, Suite, etc." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="dropoffCity">City</Label>
                                    <Input id="dropoffCity" placeholder="City" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dropoffState">State</Label>
                                    <Input id="dropoffState" placeholder="State" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dropoffZip">Zip Code</Label>
                                <Input id="dropoffZip" placeholder="Zip Code" />
                            </div>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
};
