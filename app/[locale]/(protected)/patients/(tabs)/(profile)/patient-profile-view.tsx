"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, MapPin, Users, Flag, Globe } from "lucide-react";
import { CreatePatientFormValues } from "./schema";
import PatientInsuranceList from "./patient-insurance-list";
import PatientEmergencyContactList from "./patient-emergency-contact-list";
import PatientDefaultClaimSettingList from "./patient-default-claim-setting-list";

interface PatientProfileViewProps {
    formData: CreatePatientFormValues;
    mode: "create" | "view" | "edit";
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (name: keyof CreatePatientFormValues, value: string) => void;
    patientId: string | number;
}

const PatientProfileView: React.FC<PatientProfileViewProps> = ({
    formData,
    mode,
    handleChange,
    handleSelectChange,
    patientId
}) => {
    const isView = mode === 'view';

    return (
        <div className="space-y-6">
            {/* Identification Section */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium flex items-center gap-2 text-primary">
                        <User className="h-4 w-4" />
                        Identification
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-muted-foreground">First Name</Label>
                            <Input disabled={isView} id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="font-medium" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="middleName" className="text-muted-foreground">Middle Name</Label>
                            <Input disabled={isView} id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-muted-foreground">Last Name</Label>
                            <Input disabled={isView} id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="font-medium" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="suffix" className="text-muted-foreground">Suffix</Label>
                            <Input disabled={isView} id="suffix" name="suffix" value={formData.suffix} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birthDate" className="text-muted-foreground">Date of Birth</Label>
                            <Input disabled={isView} id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="deathDate" className="text-muted-foreground">Date of Death</Label>
                            <Input disabled={isView} id="deathDate" name="deathDate" type="date" value={formData.deathDate} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ssn" className="text-muted-foreground">SSN</Label>
                            <Input disabled={isView} id="ssn" name="ssn" value={formData.ssn} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-muted-foreground">Gender</Label>
                            <Select disabled={isView} onValueChange={(val) => handleSelectChange("gender", val)} value={formData.gender}>
                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Contact Section */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium flex items-center gap-2 text-primary">
                        <MapPin className="h-4 w-4" />
                        Address & Contact
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2 md:col-span-3">
                                <Label htmlFor="addressLine1" className="text-muted-foreground">Residence Address</Label>
                                <Input disabled={isView} id="addressLine1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-muted-foreground">City</Label>
                                <Input disabled={isView} id="city" name="city" value={formData.city} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state" className="text-muted-foreground">State</Label>
                                <Input disabled={isView} id="state" name="state" value={formData.state} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zip" className="text-muted-foreground">Zip Code</Label>
                                <Input disabled={isView} id="zip" name="zip" value={formData.zip} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="col-span-full h-px bg-border my-2" />

                        <div className="space-y-2">
                            <Label htmlFor="cellPhone" className="text-muted-foreground">Mobile Phone</Label>
                            <div className="relative">
                                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input disabled={isView} id="cellPhone" name="cellPhone" value={formData.cellPhone} onChange={handleChange} className="pl-8" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="whatsAppNo" className="text-muted-foreground">WhatsApp</Label>
                            <Input disabled={isView} id="whatsAppNo" name="whatsAppNo" value={formData.whatsAppNo} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                            <Input disabled={isView} id="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Demographics Section */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium flex items-center gap-2 text-primary">
                        <Users className="h-4 w-4" />
                        Demographics
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="patientType" className="text-muted-foreground">Patient Type</Label>
                            <Input disabled={isView} id="patientType" name="patientType" value={formData.patientType} onChange={handleChange} placeholder="e.g. Regular" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ethnicity" className="text-muted-foreground">Ethnicity</Label>
                            <div className="relative">
                                <Flag className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input disabled={isView} id="ethnicity" name="ethnicity" value={formData.ethnicity} onChange={handleChange} className="pl-8" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="language" className="text-muted-foreground">Language</Label>
                            <div className="relative">
                                <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input disabled={isView} id="language" name="language" value={formData.language} onChange={handleChange} className="pl-8" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="race" className="text-muted-foreground">Race</Label>
                            <Input disabled={isView} id="race" name="race" value={formData.race} onChange={handleChange} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Insurance Section */}
            <PatientInsuranceList patientId={patientId} />

            {/* Emergency Contact Section */}
            <PatientEmergencyContactList patientId={patientId} />

            {/* Default Claim Setting Section */}
            <PatientDefaultClaimSettingList />
        </div>
    );
};

export default PatientProfileView;
