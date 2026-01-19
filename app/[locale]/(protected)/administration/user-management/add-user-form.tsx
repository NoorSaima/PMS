"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RotateCcw } from "lucide-react";

export interface AddUserFormValues {
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    twoFactorEnabled: boolean;
    userType: string;
    practiceList: string;
    provider: string;
}

const defaultValues: AddUserFormValues = {
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    twoFactorEnabled: false,
    userType: "",
    practiceList: "",
    provider: "",
};

const AddUserForm: React.FC = () => {
    const [formData, setFormData] = useState<AddUserFormValues>(defaultValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: keyof AddUserFormValues, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, twoFactorEnabled: checked }));
    };

    const handleClear = () => {
        setFormData(defaultValues);
    };

    const handleSubmit = () => {
        console.log("Submitting new user:", formData);
        // TODO: Implement submission logic
    };

    return (
        <Card className="mt-4 border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <div className="space-y-1">
                    <CardTitle>Add New User</CardTitle>
                    <CardDescription>Enter the details to create a new user account.</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleClear}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear All
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select onValueChange={(val) => handleSelectChange("role", val)} value={formData.role}>
                                <SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Administrator</SelectItem>
                                    <SelectItem value="provider">Provider</SelectItem>
                                    <SelectItem value="staff">Staff</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="userType">User Type</Label>
                            <Select onValueChange={(val) => handleSelectChange("userType", val)} value={formData.userType}>
                                <SelectTrigger><SelectValue placeholder="Select User Type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="type1">Type 1</SelectItem>
                                    <SelectItem value="type2">Type 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="practiceList">Practice List</Label>
                            <Input id="practiceList" name="practiceList" value={formData.practiceList} onChange={handleChange} placeholder="Practice List" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="provider">Provider</Label>
                            <Input id="provider" name="provider" value={formData.provider} onChange={handleChange} placeholder="Provider Name" />
                        </div>
                        <div className="flex items-center space-x-2 pt-8">
                            <Switch id="twoFactorEnabled" checked={formData.twoFactorEnabled} onCheckedChange={handleSwitchChange} />
                            <Label htmlFor="twoFactorEnabled">Two Factor Enabled</Label>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 gap-4 border-t mt-6">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleSubmit}>Create User</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AddUserForm;
