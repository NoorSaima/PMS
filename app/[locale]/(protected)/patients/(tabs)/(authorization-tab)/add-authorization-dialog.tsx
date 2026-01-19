"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addPriorAuthorization, editPriorAuthorization, fetchPatientAuthorizationList } from "@/store/slices/patientAuthorizationSlice";
import { fetchPatientInsuranceList } from "@/store/slices/patientInsuranceSlice";

interface AddAuthorizationDialogProps {
    patientId?: string | number;
    mode?: 'add' | 'edit';
    defaultValues?: any;
    onSuccess?: () => void;
    trigger?: React.ReactNode;
}

const getInitialFormState = (defaultValues?: any) => ({
    insuranceId: defaultValues?.insuranceId || "",
    refferType: defaultValues?.refferType || "",
    startDate: defaultValues?.startDate ? new Date(defaultValues.startDate).toISOString().split('T')[0] : "",
    endDate: defaultValues?.endDate ? new Date(defaultValues.endDate).toISOString().split('T')[0] : "",
    authorizationNumber: defaultValues?.authorizationNumber || "",
    visitsAuthorized: defaultValues?.visitsAuthorized || "",
    visitsUsed: defaultValues?.visitsUsed || "",
    visitsRemaining: defaultValues?.visitsRemaining || "",
    showAlert: defaultValues?.showAlert || false,
    showAlertDaysBefore: defaultValues?.showAlertDaysBefore || "",
    notes: defaultValues?.notes || "",
    status: defaultValues?.status || "",
    icdCodes: defaultValues?.icdCodes || "",
    cptCodes: defaultValues?.cptCodes || ""
});

export default function AddAuthorizationDialog({ patientId, mode = 'add', defaultValues, onSuccess, trigger }: AddAuthorizationDialogProps) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const { isSaving } = useAppSelector((state) => state.patientAuthorization);
    const { policies, isLoading: isLoadingInsurance } = useAppSelector((state) => state.patientInsurance);

    const [formData, setFormData] = useState(getInitialFormState(defaultValues));

    // Reset form when dialog opens or defaultValues change
    useEffect(() => {
        if (open) {
            setFormData(getInitialFormState(defaultValues));
            // Fetch insurance policies when dialog opens
            if (patientId && patientId !== 'new-patient' && patientId !== 'New') {
                dispatch(fetchPatientInsuranceList(patientId));
            }
        }
    }, [open, defaultValues, patientId, dispatch]);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };

            // Auto-calculate visits remaining
            if (field === "visitsAuthorized" || field === "visitsUsed") {
                const authorized = field === "visitsAuthorized" ? value : prev.visitsAuthorized;
                const used = field === "visitsUsed" ? value : prev.visitsUsed;
                updated.visitsRemaining = Math.max(0, authorized - used);
            }

            return updated;
        });
    };

    const handleSubmit = async () => {
        // Validate patientId only if adding (or ensure it's present for edit too if needed, but edit uses PriorAuthID)
        if (mode === 'add' && (!patientId || patientId === 'new-patient' || patientId === 'New')) {
            toast({
                title: "Error",
                description: "Please save the patient profile first before adding prior authorization.",
                variant: "destructive",
            });
            return;
        }

        try {
            // Parse ICD and CPT codes from comma-separated strings to arrays
            const icdCodesArray = formData.icdCodes
                .split(',')
                .map((code: string) => code.trim())
                .filter((code: string) => code.length > 0);

            const cptCodesArray = formData.cptCodes
                .split(',')
                .map((code: string) => code.trim())
                .filter((code: string) => code.length > 0);

            const payload: any = {
                insuranceId: formData.insuranceId,
                refferType: formData.refferType,
                startDate: formData.startDate,
                endDate: formData.endDate,
                authorizationNumber: formData.authorizationNumber,
                visitsAuthorized: Number(formData.visitsAuthorized),
                visitsRemaining: Number(formData.visitsRemaining),
                visitsUsed: Number(formData.visitsUsed),
                showAlert: formData.showAlert,
                showAlertDaysBefore: Number(formData.showAlertDaysBefore),
                notes: formData.notes,
                status: formData.status,
                icdCodes: icdCodesArray,
                cptCodes: cptCodesArray
            };

            let result;
            if (mode === 'add') {
                payload.patientId = patientId?.toString();
                result = await dispatch(addPriorAuthorization(payload)).unwrap();
            } else {
                payload.PriorAuthID = defaultValues?.id;
                payload.PatientId = patientId?.toString();
                result = await dispatch(editPriorAuthorization(payload)).unwrap();
            }

            toast({
                title: "Success",
                description: `Prior Authorization ${mode === 'edit' ? 'updated' : 'added'} successfully.`,
            });

            // Refresh the authorization list
            if (patientId) {
                await dispatch(fetchPatientAuthorizationList(patientId));
            }

            setOpen(false);
            if (onSuccess) onSuccess();

        } catch (error) {
            console.error(`Error ${mode}ing prior authorization:`, error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : `Failed to ${mode} prior authorization`,
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ? trigger : (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Prior Authorization
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent size="lg" className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{mode === 'edit' ? 'Edit' : 'Add'} Prior Authorization</DialogTitle>
                    <DialogDescription>
                        {mode === 'edit' ? 'Update' : 'Enter'} details for the prior authorization request.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="insurance">Insurance</Label>
                            <Select
                                value={formData.insuranceId}
                                onValueChange={(value) => handleInputChange('insuranceId', value)}
                                disabled={isLoadingInsurance}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={isLoadingInsurance ? "Loading insurances..." : policies.length === 0 ? "No insurance policies found" : "Select Insurance"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {policies.length === 0 ? (
                                        <SelectItem value="no-policies" disabled>
                                            No insurance policies available
                                        </SelectItem>
                                    ) : (
                                        policies.map((policy) => (
                                            <SelectItem key={policy.id} value={policy.id}>
                                                {policy.payer} - {policy.memberId}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="referralType">Referral Type</Label>
                            <Input
                                id="referralType"
                                value={formData.refferType}
                                onChange={(e) => handleInputChange('refferType', e.target.value)}
                                placeholder="Referral Type"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                                type="date"
                                id="startDate"
                                value={formData.startDate}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                                type="date"
                                id="endDate"
                                value={formData.endDate}
                                onChange={(e) => handleInputChange('endDate', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="authNumber">Authorization Number</Label>
                        <Input
                            id="authNumber"
                            placeholder="Enter Auth #"
                            value={formData.authorizationNumber}
                            onChange={(e) => handleInputChange('authorizationNumber', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="visitsAuth">Visits Authorized</Label>
                            <Input
                                type="number"
                                id="visitsAuth"
                                placeholder="0"
                                value={formData.visitsAuthorized}
                                onChange={(e) => handleInputChange('visitsAuthorized', Number(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="visitsUsed">Visits Used</Label>
                            <Input
                                type="number"
                                id="visitsUsed"
                                placeholder="0"
                                value={formData.visitsUsed}
                                onChange={(e) => handleInputChange('visitsUsed', Number(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="visitsRemaining">Visits Remaining</Label>
                            <Input
                                type="number"
                                id="visitsRemaining"
                                placeholder="0"
                                readOnly
                                className="bg-muted"
                                value={formData.visitsRemaining}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) => handleInputChange('status', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Approved">Approved</SelectItem>
                                <SelectItem value="Denied">Denied</SelectItem>
                                <SelectItem value="Expired">Expired</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <Checkbox
                            id="showAlert"
                            checked={formData.showAlert}
                            onCheckedChange={(checked) => handleInputChange('showAlert', checked as boolean)}
                        />
                        <label
                            htmlFor="showAlert"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                        >
                            Show Alert
                        </label>
                        {formData.showAlert && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground whitespace-nowrap">Alert days before:</span>
                                <Input
                                    className="h-8 w-20"
                                    type="number"
                                    value={formData.showAlertDaysBefore}
                                    onChange={(e) => handleInputChange('showAlertDaysBefore', Number(e.target.value))}
                                />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="icdCodes">ICD Codes</Label>
                            <Input
                                id="icdCodes"
                                placeholder="e.g. ICD001, ICD002"
                                value={formData.icdCodes}
                                onChange={(e) => handleInputChange('icdCodes', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Comma-separated values</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cptCodes">CPT Codes</Label>
                            <Input
                                id="cptCodes"
                                placeholder="e.g. CPT101, CPT202"
                                value={formData.cptCodes}
                                onChange={(e) => handleInputChange('cptCodes', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Comma-separated values</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            placeholder="Additional notes..."
                            value={formData.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                        />
                    </div>

                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Authorization"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
