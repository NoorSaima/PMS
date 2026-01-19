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

interface PatientDefaultClaimSettingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: any) => void;
}

const PatientDefaultClaimSettingDialog: React.FC<PatientDefaultClaimSettingDialogProps> = ({
    open,
    onOpenChange,
    onSave,
}) => {
    const [formData, setFormData] = useState({
        billingProvider: "",
        renderingProvider: "",
        supervisingProvider: "",
        location: "",
        orderingProvider: "",
        referringProvider: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const data = {
            id: Math.random().toString(36).substr(2, 9),
            ...formData,
        };
        onSave(data);
        onOpenChange(false);
        // Reset form
        setFormData({
            billingProvider: "",
            renderingProvider: "",
            supervisingProvider: "",
            location: "",
            orderingProvider: "",
            referringProvider: "",
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent size="md">
                <DialogHeader>
                    <DialogTitle>Add Default Claim Setting</DialogTitle>
                    <DialogDescription>
                        Add a new default claim setting configuration.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="billingProvider">Billing Provider</Label>
                        <Input id="billingProvider" name="billingProvider" value={formData.billingProvider} onChange={handleChange} placeholder="Billing Provider" />
                    </div>
                    {/* Added Rendering Provider to ensure we have data for the table view */}
                    <div className="space-y-2">
                        <Label htmlFor="renderingProvider">Rendering Provider</Label>
                        <Input id="renderingProvider" name="renderingProvider" value={formData.renderingProvider} onChange={handleChange} placeholder="Rendering Provider" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="supervisingProvider">Supervising Provider</Label>
                        <Input id="supervisingProvider" name="supervisingProvider" value={formData.supervisingProvider} onChange={handleChange} placeholder="Supervising Provider" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="orderingProvider">Ordering Provider</Label>
                        <Input id="orderingProvider" name="orderingProvider" value={formData.orderingProvider} onChange={handleChange} placeholder="Ordering Provider" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="referringProvider">Referring Provider</Label>
                        <Input id="referringProvider" name="referringProvider" value={formData.referringProvider} onChange={handleChange} placeholder="Referring Provider" />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PatientDefaultClaimSettingDialog;
