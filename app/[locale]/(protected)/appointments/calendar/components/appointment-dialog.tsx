"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppointmentStatus, fetchAppointmentTypes } from "@/store/slices/appointmentSlice";
import PatientSelector from "./patient-selector";
import FacilitySelector from "./facility-selector";
import ProviderSelector from "./provider-selector";

interface AppointmentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedDate?: Date | null;
    selectedTime?: string;
    onSave?: (data: any) => void;
}

const AppointmentDialog = ({
    open,
    onOpenChange,
    selectedDate,
    selectedTime,
    onSave,
}: AppointmentDialogProps) => {
    const dispatch = useAppDispatch();
    const appointmentState = useAppSelector((state) => state?.appointment || {});
    const { statuses = [], types = [], status = 'idle', error = null } = appointmentState;
    const [showMore, setShowMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State - Store IDs for backend, names for display
    const [formData, setFormData] = useState({
        date: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
        time: selectedTime || "09:00",
        length: "30",
        patient: "",           // Patient ID (UUID)
        patientName: "",       // Patient Name (for display)
        facility: "",          // Facility ID (UUID)
        facilityName: "",      // Facility Name (for display)
        provider: "",          // Provider ID (UUID)
        providerName: "",      // Provider Name (for display)
        type: "Facility",
        status: "Scheduled",
        allowOverbook: false,
        repeat: false,
        repeatDuration: "0",
        repeatUnit: "Day",
        endOccurrences: "0",
        endDate: "",
        comment: "",
    });

    // Load appointment types and statuses on mount - only once
    useEffect(() => {
        if (!open) return;

        const loadData = async () => {
            setIsLoading(true);
            try {
                const promises = [];
                if (!statuses || statuses.length === 0) {
                    promises.push(dispatch(fetchAppointmentStatus()));
                }
                if (!types || types.length === 0) {
                    promises.push(dispatch(fetchAppointmentTypes()));
                }
                if (promises.length > 0) {
                    await Promise.allSettled(promises);
                }
                console.log("📋 Loaded appointment data:");
                console.log("   Types:", types);
                console.log("   Statuses:", statuses);
            } catch (error) {
                console.error('Error loading lookups:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [open, dispatch]);

    // Map frontend display values to backend TypeID numbers
    const getTypeID = (typeName: string): number => {
        const typeMap: { [key: string]: number } = {
            "Facility": 100,
            "Consultation": 200,
            "Follow-Up": 300,
            "Procedure": 400,
        };
        return typeMap[typeName] || 100; // Default to Facility
    };

    // Map frontend display values to backend StatusID numbers
    const getStatusID = (statusName: string): number => {
        const statusMap: { [key: string]: number } = {
            "Scheduled": 1,
            "Confirmed": 2,
            "Cancelled": 3,
            "Completed": 4,
            "Checked-In": 5,
            "Checked-Out": 6,
            "In-Room": 7,
        };
        return statusMap[statusName] || 1; // Default to Scheduled
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Map display values to backend numeric strings
        const typeMap: { [key: string]: string } = {
            "Facility": "100",
            "Consultation": "200",
            "Follow-Up": "300",
            "Procedure": "400",
        };

        const statusMap: { [key: string]: string } = {
            "Scheduled": "1",
            "Confirmed": "2",
            "Cancelled": "3",
            "Completed": "4",
            "Checked-In": "5",
            "Checked-Out": "6",
            "In-Room": "7",
            "In Room": "7",
        };
        
        // Convert to backend format
        const backendPayload = {
            ...formData,
            type: typeMap[formData.type] || "100",          // e.g., "Consultation" -> "200"
            status: statusMap[formData.status] || "1",       // e.g., "Confirmed" -> "2"
        };
        
        console.log("📝 Frontend display:", { type: formData.type, status: formData.status });
        console.log("📦 Backend payload:", { type: backendPayload.type, status: backendPayload.status });
        
        if (onSave) {
            onSave(backendPayload);
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader className="pb-4 border-b">
                    <DialogTitle className="text-xl font-semibold">Schedule Appointment</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto px-2 py-6">
                        {/* Main Grid - 2 Columns */}
                        <div className="grid grid-cols-2 gap-10">
                            {/* Left Column */}
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="patient">Patient*</Label>
                                    <PatientSelector
                                        value={formData.patientName}
                                        onSelect={(id, name) =>
                                            setFormData({ ...formData, patient: id, patientName: name })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date">Appointment Date*</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData({ ...formData, date: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="time">Appointment Time*</Label>
                                        <Input
                                            id="time"
                                            type="time"
                                            value={formData.time}
                                            onChange={(e) =>
                                                setFormData({ ...formData, time: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="length">Appointment Length (minutes)*</Label>
                                        <Input
                                            id="length"
                                            type="number"
                                            value={formData.length}
                                            onChange={(e) =>
                                                setFormData({ ...formData, length: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="facility">Facility*</Label>
                                    <FacilitySelector
                                        value={formData.facilityName}
                                        onSelect={(id, name) =>
                                            setFormData({ ...formData, facility: id, facilityName: name })
                                        }
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="provider">Provider (Resource)*</Label>
                                    <ProviderSelector
                                        value={formData.providerName}
                                        onSelect={(id, name) =>
                                            setFormData({ ...formData, provider: id, providerName: name })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type">Appointment Type*</Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(val) =>
                                            setFormData({ ...formData, type: val })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Facility">Facility</SelectItem>
                                            <SelectItem value="Consultation">Consultation</SelectItem>
                                            <SelectItem value="Follow-Up">Follow-Up</SelectItem>
                                            <SelectItem value="Procedure">Procedure</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Appointment Status*</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(val) =>
                                            setFormData({ ...formData, status: val })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                            <SelectItem value="Checked-In">Checked In</SelectItem>
                                            <SelectItem value="Checked-Out">Checked Out</SelectItem>
                                            <SelectItem value="In-Room">In Room</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="overbook"
                                            checked={formData.allowOverbook}
                                            onCheckedChange={(checked) =>
                                                setFormData({
                                                    ...formData,
                                                    allowOverbook: checked as boolean,
                                                })
                                            }
                                        />
                                        <Label htmlFor="overbook" className="text-sm font-normal">Allow Overbook</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="repeat"
                                            checked={formData.repeat}
                                            onCheckedChange={(checked) =>
                                                setFormData({
                                                    ...formData,
                                                    repeat: checked as boolean,
                                                })
                                            }
                                        />
                                        <Label htmlFor="repeat" className="text-sm font-normal">Repeat Appointment</Label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Repeat Options */}
                        {formData.repeat && (
                            <div className="mt-6 p-4 border rounded-lg bg-muted/50 space-y-4">
                                <h4 className="font-medium text-sm">Repeat Settings</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-sm">Repeat Duration Days</Label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">Every</span>
                                            <Input
                                                type="number"
                                                className="w-20"
                                                value={formData.repeatDuration}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        repeatDuration: e.target.value,
                                                    })
                                                }
                                            />
                                            <Select
                                                value={formData.repeatUnit}
                                                onValueChange={(val) =>
                                                    setFormData({ ...formData, repeatUnit: val })
                                                }
                                            >
                                                <SelectTrigger className="w-28">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Day">Day</SelectItem>
                                                    <SelectItem value="Week">Week</SelectItem>
                                                    <SelectItem value="Month">Month</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm">End After (occurrences)</Label>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={formData.endOccurrences}
                                            onChange={(e) => setFormData({ ...formData, endOccurrences: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2 col-span-2">
                                        <Label className="text-sm">End On (date)</Label>
                                        <Input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Comment Section */}
                        <div className="mt-6 space-y-2">
                            <Label htmlFor="comment">Comment</Label>
                            <Textarea
                                id="comment"
                                placeholder="Add any additional notes..."
                                className="min-h-[80px]"
                                value={formData.comment}
                                onChange={(e) =>
                                    setFormData({ ...formData, comment: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <DialogFooter className="border-t pt-4 gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AppointmentDialog;
