"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RotateCcw } from "lucide-react";

export interface RoleFormValues {
    roleName: string;
    practice: string;
    permissions: string[];
}

const defaultValues: RoleFormValues = {
    roleName: "",
    practice: "",
    permissions: [],
};

interface RoleFormProps {
    initialData?: RoleFormValues;
    onSubmit?: (data: RoleFormValues) => void;
    onCancel?: (e?: React.MouseEvent) => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<RoleFormValues>(defaultValues);

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

    const handleSelectChange = (name: keyof RoleFormValues, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePermissionChange = (permission: string, checked: boolean) => {
        setFormData((prev) => {
            const newPermissions = checked
                ? [...prev.permissions, permission]
                : prev.permissions.filter((p) => p !== permission);
            return { ...prev, permissions: newPermissions };
        });
    };

    const handleClear = () => {
        setFormData(defaultValues);
    };

    const handleSubmit = () => {
        console.log("Submitting role:", formData);
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const isEditMode = !!initialData;

    return (
        <Card className="mt-4 border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <div className="space-y-1">
                    <CardTitle>{isEditMode ? "Edit Role" : "Create New Role"}</CardTitle>
                    <CardDescription>
                        {isEditMode ? "Update the role details and permissions." : "Define a new role and assign permissions."}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="roleName">Role Name</Label>
                            <Input id="roleName" name="roleName" value={formData.roleName} onChange={handleChange} placeholder="e.g. Office Manager" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="practice">Select Practice</Label>
                            <Select onValueChange={(val) => handleSelectChange("practice", val)} value={formData.practice}>
                                <SelectTrigger><SelectValue placeholder="Select Practice" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="practice-a">Practice A</SelectItem>
                                    <SelectItem value="practice-b">Practice B</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label>Permission Category</Label>
                        <div className="flex flex-col gap-4 p-4 border rounded-lg">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="user-management"
                                    checked={formData.permissions.includes("user-management")}
                                    onCheckedChange={(checked) => handlePermissionChange("user-management", checked as boolean)}
                                />
                                <Label htmlFor="user-management" className="cursor-pointer">User Management</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="role-setup"
                                    checked={formData.permissions.includes("role-setup")}
                                    onCheckedChange={(checked) => handlePermissionChange("role-setup", checked as boolean)}
                                />
                                <Label htmlFor="role-setup" className="cursor-pointer">Role Setup</Label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 gap-4 border-t mt-6">
                        <Button variant="outline" onClick={onCancel}>Cancel</Button>
                        <Button onClick={handleSubmit}>{isEditMode ? "Update Role" : "Create Role"}</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default RoleForm;
