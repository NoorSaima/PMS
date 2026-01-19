"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

interface PatientInsuranceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: any) => void;
}

const PatientInsuranceDialog: React.FC<PatientInsuranceDialogProps> = ({
    open,
    onOpenChange,
    onSave,
}) => {
    const [showEmployer, setShowEmployer] = useState(false);

    // Placeholder forms state - normally this would be more robust
    const [activeTab, setActiveTab] = useState("existing");

    // "New Insured" form state placeholder
    const [newInsuredData, setNewInsuredData] = useState({
        relationToInsured: "",
        firstName: "",
        lastName: "",
        mi: "",
        suffix: "",
        gender: "",
        dob: "",
        ssn: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        homePhone: "",
        cellPhone: "",
        workPhone: "",
        email: "",
    });

    const [employerData, setEmployerData] = useState({
        employmentStatus: "",
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    });

    const handleNewInsuredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewInsuredData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEmployerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployerData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSave = () => {
        // Construct the mock data to pass back
        const data = {
            id: Math.random().toString(36).substr(2, 9),
            priority: "Primary", // Mock default
            payer: "Mock Payer",
            memberId: "MOCK-123",
            insured: activeTab === 'existing' ? "Existing Party" : `${newInsuredData.firstName} ${newInsuredData.lastName}`,
            relation: activeTab === 'existing' ? "Self" : newInsuredData.relationToInsured,
            effectiveDate: "2024-01-01",
            terminationDate: "2024-12-31",
            eligibility: "Eligible",
            default: "Yes",
            status: "Active",
            // In a real app, we'd pass all the form data
        };
        onSave(data);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent size="md">
                <DialogHeader>
                    <DialogTitle>Add Insurance</DialogTitle>
                    <DialogDescription>
                        Add a new insurance policy for the patient.
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="existing">Existing Insured Party</TabsTrigger>
                        <TabsTrigger value="new">New Insured Party</TabsTrigger>
                    </TabsList>

                    <TabsContent value="existing" className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Select Insured Party</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="self">Self (Patient)</SelectItem>
                                    <SelectItem value="spouse">Spouse</SelectItem>
                                    <SelectItem value="guarantor">Guarantor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </TabsContent>

                    <TabsContent value="new" className="space-y-4 py-4 max-h-[40vh] overflow-y-scroll">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="relationToInsured">Relation to Insured</Label>
                                <Input id="relationToInsured" name="relationToInsured" value={newInsuredData.relationToInsured} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" name="firstName" value={newInsuredData.firstName} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" name="lastName" value={newInsuredData.lastName} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mi">MI</Label>
                                <Input id="mi" name="mi" value={newInsuredData.mi} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="suffix">Suffix</Label>
                                <Input id="suffix" name="suffix" value={newInsuredData.suffix} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dob">DOB</Label>
                                <Input id="dob" name="dob" type="date" value={newInsuredData.dob} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ssn">SSN</Label>
                                <Input id="ssn" name="ssn" value={newInsuredData.ssn} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" name="address" value={newInsuredData.address} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" name="city" value={newInsuredData.city} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" name="state" value={newInsuredData.state} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input id="zipCode" name="zipCode" value={newInsuredData.zipCode} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="homePhone">Home Phone</Label>
                                <Input id="homePhone" name="homePhone" value={newInsuredData.homePhone} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cellPhone">Cell Phone</Label>
                                <Input id="cellPhone" name="cellPhone" value={newInsuredData.cellPhone} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="workPhone">Work Phone</Label>
                                <Input id="workPhone" name="workPhone" value={newInsuredData.workPhone} onChange={handleNewInsuredChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" value={newInsuredData.email} onChange={handleNewInsuredChange} />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-4 border-t">
                            <Switch id="show-employer" checked={showEmployer} onCheckedChange={setShowEmployer} />
                            <Label htmlFor="show-employer">Show Employer Information</Label>
                        </div>

                        {showEmployer && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t mt-2 bg-muted/20 p-4 rounded-md">
                                <div className="space-y-2">
                                    <Label htmlFor="employmentStatus">Employment Status</Label>
                                    <Input id="employmentStatus" name="employmentStatus" value={employerData.employmentStatus} onChange={handleEmployerChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="empName">Name</Label>
                                    <Input id="empName" name="name" value={employerData.name} onChange={handleEmployerChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="empAddress">Address</Label>
                                    <Input id="empAddress" name="address" value={employerData.address} onChange={handleEmployerChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="empCity">City</Label>
                                    <Input id="empCity" name="city" value={employerData.city} onChange={handleEmployerChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="empState">State</Label>
                                    <Input id="empState" name="state" value={employerData.state} onChange={handleEmployerChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="empZipCode">Zip Code</Label>
                                    <Input id="empZipCode" name="zipCode" value={employerData.zipCode} onChange={handleEmployerChange} />
                                </div>
                            </div>
                        )}

                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PatientInsuranceDialog;
