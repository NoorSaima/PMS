"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Mic, RotateCcw } from "lucide-react";
import { CreatePatientFormValues } from "./(tabs)/(profile)/schema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPractices } from "@/store/slices/practiceSlice";

const CreatePatient: React.FC = () => {

    const dispatch = useAppDispatch();
    const { selectedPractice, status } = useAppSelector((state) => state.practice);
    const isLoading = status === 'loading';
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPractices());
        }
    }, [dispatch, status]);

    const initialValues: Partial<CreatePatientFormValues> = {
        firstName: "",
        lastName: "",
        middleName: "",
        mi: "",
        gender: "",
        birthDate: "",
        cellPhone: "",
        addressLine1: "",
        city: "",
        state: "",
        zip: "",
    };
    useEffect(() => {
        if (selectedPractice?.PracticeID) {
            setFormData((prev) => ({
                ...prev,
                practiceId: selectedPractice.PracticeID,
            }));
        }
    }, [selectedPractice]);


    const [formData, setFormData] = useState<Partial<CreatePatientFormValues>>(initialValues);
    const [isRecording, setIsRecording] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: keyof CreatePatientFormValues, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading) return console.log("Loading");
        console.log("Submitting new patient:", formData);
        const response = await fetch("/api/patients/add-patient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log("Response:", data);
    };

    const handleStartRecording = () => {
        setIsRecording(!isRecording);
    };

    const handleClear = () => {
        setFormData(initialValues);
    };

    return (
        <Card className="mt-4 border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <div className="space-y-1">
                    <CardTitle>Register New Patient</CardTitle>
                    <CardDescription>Enter the details for the new patient record.</CardDescription>
                </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="space-y-6">
                        <Card className="border-dashed border-2 bg-muted/20 shadow-none">
                            <CardContent className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-4">
                                    <div className={cn("p-3 rounded-full transition-colors", isRecording ? 'bg-red-100 animate-pulse' : 'bg-primary/10')}>
                                        <Mic className={cn("w-6 h-6", isRecording ? 'text-red-500' : 'text-primary')} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Voice Input</h4>
                                        <p className="text-xs text-muted-foreground">Speak to auto-fill the form</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleStartRecording}
                                        className={cn("w-32 transition-all", isRecording && "border-red-500 text-red-500 hover:text-red-600 hover:bg-red-50")}
                                    >
                                        {isRecording ? "Stop Recording" : "Start Recording"}
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={handleClear}>
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        Clear All
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">New Patient Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="middleName">Middle Name</Label>
                                    <Input id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mi">MI</Label>
                                    <Input id="mi" name="mi" value={formData.mi} onChange={handleChange} maxLength={2} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select onValueChange={(val) => handleSelectChange("gender", val)} value={formData.gender}>
                                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="birthDate">DOB</Label>
                                    <Input id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cellPhone">Cell No</Label>
                                    <Input id="cellPhone" name="cellPhone" value={formData.cellPhone} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="addressLine1">Residence</Label>
                                    <Input id="addressLine1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" value={formData.city} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" name="state" value={formData.state} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">Zipcode</Label>
                                    <Input id="zip" name="zip" value={formData.zip} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 gap-4 border-t mt-6">
                            <Button variant="outline">Cancel</Button>
                            <Button type="submit">Create Patient</Button>
                        </div>
                    </div>
                </CardContent>
            </form>
        </Card>
    );
};

export default CreatePatient;
