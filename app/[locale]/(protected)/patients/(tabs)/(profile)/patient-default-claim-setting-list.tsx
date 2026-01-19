"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, FileCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Using Input for consistent look with Profile, but read-only
import PatientDefaultClaimSettingDialog from "./patient-default-claim-setting-dialog";

interface ClaimSetting {
    id: string;
    billingProvider: string;
    renderingProvider: string;
    supervisingProvider: string;
    location: string;
    orderingProvider: string;
    referringProvider: string;
}

const PatientDefaultClaimSettingList = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [setting, setSetting] = useState<ClaimSetting | null>(null);

    const handleSaveSetting = (newSetting: ClaimSetting) => {
        setSetting(newSetting);
    };

    const handleDelete = () => {
        setSetting(null);
    };

    const displayValue = (val?: string) => val || "N/A";

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-base font-medium flex items-center gap-2 text-primary">
                    <FileCheck className="h-4 w-4" />
                    Default Claim Settings
                </CardTitle>
                {!setting && (
                    <Button size="sm" onClick={() => setIsDialogOpen(true)} variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Setting
                    </Button>
                )}
                {setting && (
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsDialogOpen(true)}>
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={handleDelete}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-2">
                        <Label className="text-muted-foreground">Billing Provider</Label>
                        <div className="font-medium">{displayValue(setting?.billingProvider)}</div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-muted-foreground">Rendering Provider</Label>
                        <div className="font-medium">{displayValue(setting?.renderingProvider)}</div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-muted-foreground">Referring Provider</Label>
                        <div className="font-medium">{displayValue(setting?.referringProvider)}</div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-muted-foreground">Location</Label>
                        <div className="font-medium">{displayValue(setting?.location)}</div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-muted-foreground">Ordering Provider</Label>
                        <div className="font-medium">{displayValue(setting?.orderingProvider)}</div>
                    </div>
                </div>
            </CardContent>

            <PatientDefaultClaimSettingDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveSetting}
            />
        </Card>
    );
};

export default PatientDefaultClaimSettingList;
