"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RotateCcw } from "lucide-react";

export interface UserFormValues {
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

const defaultValues: UserFormValues = {
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

interface UserFormProps {
    initialData?: UserFormValues;
    onSubmit?: (data: UserFormValues) => void;
    onCancel?: (e?: React.MouseEvent) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<UserFormValues>(defaultValues);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(defaultValues);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: keyof UserFormValues, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, twoFactorEnabled: checked }));
    };

    const handleClear = () => {
        setFormData(defaultValues);
    };

    const handleSubmit = () => {
        console.log("Submitting user:", formData);
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const isEditMode = !!initialData;

    return (
        <Card className="mt-4 border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <div className="space-y-1">
                    <CardTitle>{isEditMode ? "Edit User" : "Add New User"}</CardTitle>
                    <CardDescription>
                        {isEditMode ? "Update the user's details below." : "Enter the details to create a new user account."}
                    </CardDescription>
                </div>
                {!isEditMode && (
                    <Button variant="outline" size="sm" onClick={handleClear}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Clear All
                    </Button>
                )}
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
                                    <SelectItem value="Administrator">Administrator</SelectItem>
                                    <SelectItem value="Provider">Provider</SelectItem>
                                    <SelectItem value="Staff">Staff</SelectItem>
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
                        <Button variant="outline" onClick={onCancel}>Cancel</Button>
                        <Button onClick={handleSubmit}>{isEditMode ? "Update User" : "Create User"}</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserForm;
