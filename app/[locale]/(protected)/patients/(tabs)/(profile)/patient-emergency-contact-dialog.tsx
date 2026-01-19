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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PatientEmergencyContactDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: any) => void;
    mode?: 'add' | 'view';
    initialData?: any;
}

const PatientEmergencyContactDialog: React.FC<PatientEmergencyContactDialogProps> = ({
    open,
    onOpenChange,
    onSave,
    mode = 'add',
    initialData
}) => {
    const defaultData = {
        firstName: "",
        middleName: "",
        lastName: "",
        relation: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        email: "",
        cellNumber: "",
    };

    const [formData, setFormData] = useState(defaultData);

    React.useEffect(() => {
        if (open) {
            if (mode === 'view' && initialData) {
                setFormData({
                    firstName: initialData.FirstName || "",
                    middleName: initialData.MiddleName || "",
                    lastName: initialData.LastName || "",
                    relation: initialData.RelationtoPatient || "",
                    address: initialData.Address || "",
                    city: initialData.City || "",
                    state: initialData.State || "",
                    zipCode: initialData.Zipcode || "",
                    email: initialData.Email || "",
                    cellNumber: initialData.CellNo || "",
                });
            } else {
                setFormData(defaultData);
            }
        }
    }, [open, mode, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const data = {
            id: Math.random().toString(36).substr(2, 9),
            ...formData,
            personName: `${formData.firstName} ${formData.lastName}`.trim(),
        };
        onSave(data);
        setFormData(defaultData);
        onOpenChange(false);
    };

    const isView = mode === 'view';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent size="md">
                <DialogHeader>
                    <DialogTitle>{isView ? 'Emergency Contact Details' : 'Add Emergency Contact'}</DialogTitle>
                    <DialogDescription>
                        {isView ? 'View emergency contact details.' : 'Add details for a new emergency contact person.'}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="middleName">Middle Name</Label>
                        <Input id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="relation">Relation to Patient</Label>
                        <Input id="relation" name="relation" value={formData.relation} onChange={handleChange} placeholder="e.g. Spouse, Parent" disabled={isView} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cellNumber">Cell Number</Label>
                        <Input id="cellNumber" name="cellNumber" value={formData.cellNumber} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" value={formData.email} onChange={handleChange} disabled={isView} />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleChange} disabled={isView} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" value={formData.state} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} disabled={isView} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>{isView ? 'Close' : 'Cancel'}</Button>
                    {!isView && <Button onClick={handleSave}>Save</Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PatientEmergencyContactDialog;
