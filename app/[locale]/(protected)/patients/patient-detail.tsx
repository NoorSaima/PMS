"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataProps } from "./example2/columns";
import { Plus, X, Search, User, LayoutGrid, LayoutDashboard, Columns, Calendar, Phone, MapPin } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PatientDetailProps {
    patient?: DataProps;
}

import PatientProfileManager from "./(tabs)/(profile)/patient-profile-manager";
import PaymentTabs from "./(tabs)/(payments)/payment-tabs";
import DocumentManager from "./(tabs)/(documents)/document-manager";
import AuthorizationManager from "./(tabs)/(authorization-tab)/authorization-manager";
import ReferralManager from "./(tabs)/(referral)/referral-manager";
import TranscriptManager from "./(tabs)/(transcripts)/transcript-manager";
import PatientClaimsManager from "./(tabs)/(claims)/patient-claims-manager";
import { useConfig } from "@/hooks/use-config";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPatientDetailTab, setPatientDetailLayout } from '@/store/slices/patientsTabsSlice';

// Define icons for tabs
import {
    User as UserIcon,
    CreditCard,
    FileText,
    File,
    ShieldCheck,
    GitBranch,
    FileJson,
    CheckCircle
} from 'lucide-react';

const subTabs = [
    { value: "profile", label: "Profile", icon: UserIcon },
    { value: "payments", label: "Payments", icon: CreditCard },
    { value: "claims", label: "Claims", icon: FileText },
    { value: "document", label: "Document", icon: File },
    { value: "prior-auth", label: "Prior Authorization", icon: ShieldCheck },
    { value: "referral", label: "Referral", icon: GitBranch },
    { value: "transcripts", label: "Patient Transcripts", icon: FileJson },
    { value: "eligibility", label: "Eligibility", icon: CheckCircle },
];

const PatientDetail: React.FC<PatientDetailProps> = ({ patient }) => {
    // Default empty patient data for creation mode
    const defaultPatient: DataProps = {
        ID: "",
        Name: "",
        DOB: "",
        SSN: "",
        PID: "New",
        HomePhone: "",
        CellPhone: "",
        Gender: "",
        Address: "",
        status: "Active",
        action: null
    };
    const [config] = useConfig();
    const dispatch = useAppDispatch();

    // Get patient-specific tab state from Redux
    const patientId = patient?.PID || 'new-patient';
    const patientDetailState = useAppSelector(
        (state) => state.patientsTabs.patientDetailTabs[patientId]
    );

    // Use Redux state if available, otherwise use defaults
    const activeTab = patientDetailState?.activeSubTab || 'profile';
    const layout = patientDetailState?.layout || 'vertical';

    // Local state to manage form fields, ensuring data persistence when switching tabs
    const [formData, setFormData] = useState<DataProps>(patient || defaultPatient);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [detailsError, setDetailsError] = useState<string | null>(null);

    // Fetch full patient details when component mounts or patient changes
    useEffect(() => {
        const fetchPatientDetails = async () => {
            // Skip if no patient or if it's a new patient
            if (!patient?.ID || patient.PID === 'new-patient' || patient.PID === 'New') {
                return;
            }

            setIsLoadingDetails(true);
            setDetailsError(null);

            try {
                const res = await fetch(`/api/patients/get-patient-details?PatientID=${patient.ID}`);

                if (!res.ok) {
                    throw new Error('Failed to fetch patient details');
                }

                const fullPatientData = await res.json();

                // Transform API response to match DataProps structure
                const transformedData: DataProps = {
                    ID: fullPatientData.PatientUID?.toString() || patient.ID,
                    Name: `${fullPatientData.FirstName || ''} ${fullPatientData.MiddleName ? fullPatientData.MiddleName + ' ' : ''}${fullPatientData.LastName || ''}`.trim() || patient.Name,
                    DOB: fullPatientData.DOB || patient.DOB,
                    SSN: fullPatientData.SSN || patient.SSN,
                    PID: fullPatientData.PatientPID || patient.PID,
                    HomePhone: fullPatientData.HomePhone || patient.HomePhone,
                    CellPhone: fullPatientData.CellNo || patient.CellPhone,
                    Gender: fullPatientData.Gender === 1 ? 'Male' : fullPatientData.Gender === 2 ? 'Female' : fullPatientData.Gender || patient.Gender,
                    Address: fullPatientData.Address || patient.Address,
                    status: fullPatientData.Status || patient.status,
                    PatientPID: fullPatientData.PatientPID || patient.PID, // Ensure field is populated
                    PatientUID: fullPatientData.PatientUID, // Persist UID if needed
                    LastName: fullPatientData.LastName,
                    FirstName: fullPatientData.FirstName,
                    MiddleName: fullPatientData.MiddleName,
                    Suffix: fullPatientData.Suffix,
                    Email: fullPatientData.Email,
                    CellNo: fullPatientData.CellNo,
                    action: null
                };

                setFormData(transformedData);
            } catch (error) {
                console.error('Error fetching patient details:', error);
                setDetailsError('Failed to load patient details');
                // Keep using the list data as fallback
            } finally {
                setIsLoadingDetails(false);
            }
        };

        fetchPatientDetails();
    }, [patient?.ID]);

    const handleTabChange = (value: string) => {
        dispatch(setPatientDetailTab({ patientId, subTab: value }));
    };

    const handleLayoutChange = (newLayout: 'vertical' | 'horizontal') => {
        dispatch(setPatientDetailLayout({ patientId, layout: newLayout }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Card className="mt-4 border-none shadow-none">
            <Card className="mb-6 border-none shadow-md overflow-hidden bg-white/50 backdrop-blur-sm relative group">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3aa981] via-[#4098d7] to-[#d15c89]" />

                {/* Loading Indicator */}
                {isLoadingDetails && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-primary/20 overflow-hidden">
                        <div className="h-full bg-primary animate-[loading_1s_ease-in-out_infinite]"
                            style={{ animation: 'loading 1s ease-in-out infinite' }} />
                    </div>
                )}

                {/* Error Message */}
                {detailsError && (
                    <div className="absolute top-2 right-20 z-20">
                        <div className="bg-destructive/10 text-destructive text-xs px-3 py-1 rounded-md border border-destructive/20">
                            {detailsError}
                        </div>
                    </div>
                )}

                {/* Layout Toggle - Top Right */}
                <div className="absolute top-4 right-4 z-10 transition-opacity opacity-50 group-hover:opacity-100">
                    <div className="flex items-center gap-1 bg-white/80 backdrop-blur border p-1 rounded-lg shadow-sm">
                        <Button
                            variant={layout === "vertical" ? "default" : "ghost"}
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleLayoutChange("vertical")}
                        >
                            <LayoutDashboard className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                            variant={layout === "horizontal" ? "default" : "ghost"}
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleLayoutChange("horizontal")}
                        >
                            <Columns className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>

                <div className={cn("p-6 pt-8 transition-opacity", isLoadingDetails && "opacity-50")}>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Avatar Section */}
                        <div className="flex-shrink-0 relative">
                            <div className={cn(
                                "rounded-full p-1 border-2 border-dashed gap-1",
                                formData.status === 'Active' ? "border-[#3aa981]" : "border-slate-300"
                            )}>
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${formData.Name || "User"}`} />
                                    <AvatarFallback className="text-xl font-bold bg-muted text-muted-foreground">
                                        {formData.Name?.slice(0, 2).toUpperCase() || "PT"}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className={cn(
                                "absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-white",
                                formData.status === 'Active' ? "bg-[#3aa981]" : "bg-slate-400"
                            )} />
                        </div>

                        {/* Info Section */}
                        <div className="flex-grow space-y-5 min-w-0">
                            {/* Name and Badges */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                                        {formData.Name || "New Patient"}
                                    </h2>
                                    <Badge
                                        color="secondary"
                                        className={cn(
                                            "rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize bg-opacity-10 shadow-none",
                                            formData.status === 'Active'
                                                ? "!bg-[#3aa981]/10 !text-[#3aa981] border border-[#3aa981]/20"
                                                : "bg-slate-100 text-slate-500 border border-slate-200"
                                        )}
                                    >
                                        {formData.status || "Active"}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                    <span className="opacity-70">Patient ID:</span>
                                    <span className="font-mono text-[#4098d7] bg-[#4098d7]/5 px-1.5 py-0.5 rounded">{formData.PID}</span>
                                </div>
                            </div>

                            {/* Info Grid - Modern Pills */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {/* DOB */}
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 transition-all hover:shadow-sm group/item">
                                    <div className="h-9 w-9 rounded-lg bg-[#4098d7]/10 flex items-center justify-center text-[#4098d7] group-hover/item:bg-[#4098d7] group-hover/item:text-white transition-colors">
                                        <Calendar className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">DOB</span>
                                        <span className="text-sm font-medium text-slate-700">{formData.DOB || "N/A"}</span>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 transition-all hover:shadow-sm group/item">
                                    <div className="h-9 w-9 rounded-lg bg-[#3aa981]/10 flex items-center justify-center text-[#3aa981] group-hover/item:bg-[#3aa981] group-hover/item:text-white transition-colors">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Phone</span>
                                        <span className="text-sm font-medium text-slate-700">{formData.CellPhone || formData.HomePhone || "N/A"}</span>
                                    </div>
                                </div>

                                {/* SSN */}
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 transition-all hover:shadow-sm group/item">
                                    <div className="h-9 w-9 rounded-lg bg-[#d15c89]/10 flex items-center justify-center text-[#d15c89] group-hover/item:bg-[#d15c89] group-hover/item:text-white transition-colors">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">SSN</span>
                                        <span className="text-sm font-medium text-slate-700 font-mono tracking-tight">{formData.SSN || "N/A"}</span>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 transition-all hover:shadow-sm group/item">
                                    <div className="h-9 w-9 rounded-lg bg-[#f29857]/10 flex items-center justify-center text-[#f29857] group-hover/item:bg-[#f29857] group-hover/item:text-white transition-colors">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Address</span>
                                        <span className="text-sm font-medium text-slate-700 truncate block w-full" title={formData.Address}>
                                            {formData.Address || "No address"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className={layout === "vertical" ? "flex gap-8" : "w-full"}
                orientation={layout === "vertical" ? "vertical" : "horizontal"}
            >
                <div className={layout === "vertical" ? "w-64 flex-shrink-0 pt-0" : "w-full pb-6"}>
                    <div className={cn(
                        "rounded-xl transition-all",
                        layout === "vertical" ? "h-auto" : "flex overflow-x-auto no-scrollbar border-b border-slate-200"
                    )}>
                        <TabsList className={
                            layout === "vertical"
                                ? "flex flex-col h-auto items-stretch bg-transparent p-0 gap-2 w-full"
                                : "flex w-full justify-start h-auto bg-transparent p-0 gap-6"
                        }>
                            {subTabs.map((tab) => {
                                const Icon = tab.icon;
                                const isColorTheme = !["light", "transparent"].includes(config.headerColor);

                                return (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className={
                                            layout === "vertical"
                                                ? cn(
                                                    "justify-start px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                                    "hover:bg-slate-50",
                                                    // Apply theme scope and specific header color classes if a color theme is active
                                                    isColorTheme ? `theme-${config.headerColor} data-[state=active]:bg-header/10 data-[state=active]:text-header`
                                                        : "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                                                    "font-medium text-slate-500"
                                                )
                                                : cn(
                                                    "rounded-none px-2 py-3 transition-all duration-300 flex items-center gap-2 border-b-2 border-transparent",
                                                    "hover:text-slate-800",
                                                    isColorTheme ? `theme-${config.headerColor} data-[state=active]:border-header data-[state=active]:text-header`
                                                        : "data-[state=active]:border-primary data-[state=active]:text-primary",
                                                    "font-medium text-slate-500"
                                                )
                                        }
                                    >
                                        <div className={cn(
                                            "flex items-center justify-center transition-colors duration-300",
                                            layout === "vertical" ? "mr-3" : "mr-1",
                                            // Icon Styling
                                            isColorTheme ? `theme-${config.headerColor} group-data-[state=active]:text-header`
                                                : "group-data-[state=active]:text-primary",
                                            "text-slate-400 group-hover:text-slate-600"
                                        )}>
                                            <Icon className={cn(
                                                layout === "vertical" ? "h-5 w-5" : "h-4 w-4"
                                            )} />
                                        </div>
                                        <span className={cn(
                                            "text-sm tracking-wide",
                                            layout === "vertical" ? "" : ""
                                        )}>{tab.label}</span>

                                        {/* Vertical Active Indicator - Sidebar Style */}
                                        {layout === "vertical" && (
                                            <div className={cn(
                                                "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full opacity-0 transition-all duration-300 group-data-[state=active]:opacity-100 group-data-[state=active]:h-8",
                                                isColorTheme ? `theme-${config.headerColor} bg-header` : "bg-primary"
                                            )} />
                                        )}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>
                </div>

                <div className="flex-1 min-w-0">

                    <TabsContent value="payments" className="mt-0">
                        <PaymentTabs patientId={patientId} />
                    </TabsContent>

                    {/* Claims Tab */}
                    <TabsContent value="claims" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Claims History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PatientClaimsManager />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Patient Info Tab - Contains the Edit Form */}
                    <TabsContent value="profile" className="mt-0">
                        <PatientProfileManager patientId={formData?.PatientPID} initialMode="view" />
                    </TabsContent>

                    {/* Document Tab */}
                    <TabsContent value="document" className="mt-0">
                        <DocumentManager patientId={patientId} />
                    </TabsContent>

                    <TabsContent value="prior-auth" className="mt-0">
                        <AuthorizationManager patientId={patientId} />
                    </TabsContent>

                    <TabsContent value="referral" className="mt-0">
                        <ReferralManager patientId={patientId} />
                    </TabsContent>

                    <TabsContent value="transcripts" className="mt-0">
                        <TranscriptManager />
                    </TabsContent>

                    {/* Other Sections Placeholders */}
                    {subTabs.map(tab => {
                        if (tab.value === "profile" || tab.value === "payments" || tab.value === "claims" || tab.value === "document" || tab.value === "prior-auth" || tab.value === "referral" || tab.value === "transcripts") return null;
                        return (
                            <TabsContent key={tab.value} value={tab.value} className="mt-0">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{tab.label}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                                            <p>No {tab.label.toLowerCase()} data available.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        )
                    })}

                </div>
            </Tabs>
        </Card>
    );
};

export default PatientDetail;
