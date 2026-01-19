"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataProps } from "../../example2/columns";
import { Pencil, Save, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import PatientProfileView from "./patient-profile-view";
import { CreatePatientFormValues, defaultValues, mapDataToForm, mapApiResponseToForm } from "./schema";

interface PatientProfileManagerProps {
    patientId: string | number;
    initialMode?: "view" | "edit";
}

const PatientProfileManager: React.FC<PatientProfileManagerProps> = ({ patientId, initialMode = "view" }) => {
    const [mode, setMode] = useState<"view" | "edit">(initialMode);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<CreatePatientFormValues>(defaultValues);
    const [originalData, setOriginalData] = useState<CreatePatientFormValues>(defaultValues);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            if (!patientId || patientId === 'new-patient' || patientId === 'New') return;

            setIsLoading(true);
            try {
                const res = await fetch(`/api/patients/get-patient-details?PatientID=${patientId}`);
                if (!res.ok) throw new Error('Failed to fetch details');

                const data = await res.json();
                const mappedData = mapApiResponseToForm(data);
                setFormData(mappedData);
                setOriginalData(mappedData);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatientDetails();
    }, [patientId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: keyof CreatePatientFormValues, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const toggleEdit = () => {
        if (mode === 'view') {
            setMode('edit');
        } else {
            // Cancel edit - reset to original data
            setFormData(originalData);
            setMode('view');
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        
        try {
            // Map form data to API payload
            const payload = {
                PatientPID: patientId,
                LastName: formData.lastName,
                FirstName: formData.firstName,
                MiddleName: formData.middleName,
                Suffix: formData.suffix,
                Gender: formData.gender === "male" ? 1 : formData.gender === "female" ? 2 : 3,
                DOB: formData.birthDate,
                DOD: formData.deathDate || null,
                SSN: formData.ssn,
                PatientType: formData.patientType,
                Address: formData.addressLine1,
                City: formData.city,
                State: formData.state,
                ZipCode: formData.zip,
                CellNo: formData.cellPhone,
                HomeCellNo: formData.homePhone,
                Email: formData.email,
                Ethnicity: formData.ethnicity,
                Language: formData.language,
                Race: formData.race,
                ImagePath: null,
            };

            const response = await fetch("/api/patients/update-patient", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update patient");
            }

            toast.success("Patient updated successfully");
            setOriginalData(formData);
            setMode('view');
        } catch (error: any) {
            console.error("Error updating patient:", error);
            toast.error(error.message || "Failed to update patient");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center">Loading profile...</div>;
    }

    return (
        <Card className="mt-0 border-none shadow-none">
            <CardHeader className="flex flex-row items-center pt-4 justify-between space-y-0 pb-6">
                <div className="space-y-1">
                    <CardTitle>
                        {mode === 'edit' ? "Edit Patient" : "Patient Information"}
                    </CardTitle>
                    <CardDescription>
                        {mode === 'edit' ? "Update patient details." : "View patient details."}
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-1 bg-muted/50 p-1 rounded-lg border">
                    {mode === 'view' ? (
                        <Button variant="ghost" size="sm" onClick={toggleEdit}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    ) : mode === 'edit' && (
                        <div className="flex gap-2 border-l pl-2 ml-2">
                            <Button variant="ghost" size="sm" onClick={toggleEdit} disabled={isSaving}>
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                            <Button variant="soft" size="sm" onClick={handleSave} disabled={isSaving}>
                                {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                {!isSaving && <Save className="h-4 w-4 mr-2" />}
                                Save
                            </Button>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <PatientProfileView
                    formData={formData}
                    mode={mode as "view" | "edit" | "create"} // Cast to satisfy interface
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                    patientId={patientId}
                />
            </CardContent>
        </Card>
    );
};

export default PatientProfileManager;
