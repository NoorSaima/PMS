"use client";

import React, { useState } from "react";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon, Clock, Filter } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { toast } from "sonner"; // Assuming sonner is used for toasts based on package.json

// Mock Data
const FACILITIES = [
    { id: "1", name: "Main Hospital" },
    { id: "2", name: "Downtown Clinic" },
    { id: "3", name: "Westside Center" },
];

const PROVIDERS = [
    { id: "1", name: "Dr. Smith" },
    { id: "2", name: "Dr. Johnson" },
    { id: "3", name: "Dr. Williams" },
];

interface ScheduleEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    extendedProps: {
        facilityId: string;
        providerId: string;
        allowWithoutSlot: boolean;
    };
    backgroundColor?: string;
    borderColor?: string;
}

export default function ProviderSlotsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [events, setEvents] = useState<ScheduleEvent[]>([
        {
            id: '1',
            title: 'Dr. Smith - Main Hospital',
            start: new Date(new Date().setHours(9, 0, 0, 0)),
            end: new Date(new Date().setHours(17, 0, 0, 0)),
            extendedProps: {
                facilityId: '1',
                providerId: '1',
                allowWithoutSlot: false
            },
            backgroundColor: '#3b82f6',
            borderColor: '#2563eb'
        }
    ]);

    // Form State
    const [selectedFacility, setSelectedFacility] = useState("");
    const [selectedProvider, setSelectedProvider] = useState("");
    const [slotFrom, setSlotFrom] = useState("");
    const [slotTo, setSlotTo] = useState("");
    const [allowWithoutSlot, setAllowWithoutSlot] = useState(false);

    const handleSaveSchedule = () => {
        if (!selectedFacility || !selectedProvider || !slotFrom || !slotTo) {
            toast.error("Please fill in all required fields");
            return;
        }

        const start = new Date(slotFrom);
        const end = new Date(slotTo);

        if (start >= end) {
            toast.error("End time must be after start time");
            return;
        }

        const provider = PROVIDERS.find(p => p.id === selectedProvider);
        const facility = FACILITIES.find(f => f.id === selectedFacility);

        const newEvent: ScheduleEvent = {
            id: Math.random().toString(36).substr(2, 9),
            title: `${provider?.name} - ${facility?.name}`,
            start,
            end,
            extendedProps: {
                facilityId: selectedFacility,
                providerId: selectedProvider,
                allowWithoutSlot
            },
            backgroundColor: allowWithoutSlot ? '#10b981' : '#3b82f6', // Green if allowed without slot, Blue otherwise
            borderColor: allowWithoutSlot ? '#059669' : '#2563eb'
        };

        setEvents([...events, newEvent]);
        setIsDialogOpen(false);
        resetForm();
        toast.success("Schedule added successfully");
    };

    const resetForm = () => {
        setSelectedFacility("");
        setSelectedProvider("");
        setSlotFrom("");
        setSlotTo("");
        setAllowWithoutSlot(false);
    };

    return (
        <div className="space-y-6">
            <SiteBreadcrumb />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Provider Slots</h2>
                    <p className="text-muted-foreground">Manage provider schedules and availability slots.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="shadow-sm">
                            <Plus className="h-4 w-4 mr-2" /> New Schedule
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add New Schedule</DialogTitle>
                            <DialogDescription>
                                Create a new schedule slot for a provider at a specific facility.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            {/* Facility */}
                            <div className="grid gap-2">
                                <Label htmlFor="facility">Facility <span className="text-red-500">*</span></Label>
                                <Select value={selectedFacility} onValueChange={setSelectedFacility}>
                                    <SelectTrigger id="facility">
                                        <SelectValue placeholder="Select facility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FACILITIES.map(facility => (
                                            <SelectItem key={facility.id} value={facility.id}>
                                                {facility.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Provider */}
                            <div className="grid gap-2">
                                <Label htmlFor="provider">Provider <span className="text-red-500">*</span></Label>
                                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                                    <SelectTrigger id="provider">
                                        <SelectValue placeholder="Select provider" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PROVIDERS.map(provider => (
                                            <SelectItem key={provider.id} value={provider.id}>
                                                {provider.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Slots */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="slotFrom">Slot From <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="slotFrom"
                                        type="datetime-local"
                                        value={slotFrom}
                                        onChange={(e) => setSlotFrom(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="slotTo">Slot To <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="slotTo"
                                        type="datetime-local"
                                        value={slotTo}
                                        onChange={(e) => setSlotTo(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Allow without slot */}
                            <div className="flex items-center space-x-2 pt-2">
                                <Checkbox
                                    id="allowWithoutSlot"
                                    checked={allowWithoutSlot}
                                    onCheckedChange={(checked) => setAllowWithoutSlot(checked as boolean)}
                                />
                                <Label
                                    htmlFor="allowWithoutSlot"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Allow schedule without slot
                                </Label>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSaveSchedule}>Save Schedule</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                    <div className="p-4 bg-white rounded-lg">
                        <style jsx global>{`
                            .fc-theme-standard td, .fc-theme-standard th { border-color: #e2e8f0; }
                            .fc .fc-toolbar-title { font-size: 1.25rem; font-weight: 600; color: #1e293b; }
                            .fc .fc-button-primary { background-color: #ffffff; color: #0f172a; border-color: #e2e8f0; }
                            .fc .fc-button-primary:hover { background-color: #f8fafc; border-color: #cbd5e1; color: #0f172a; }
                            .fc .fc-button-primary:not(:disabled).fc-button-active, .fc .fc-button-primary:not(:disabled):active { background-color: #eff6ff; border-color: #bfdbfe; color: #2563eb; }
                            .fc-event { border-radius: 4px; padding: 2px; cursor: pointer; border: none; }
                            .fc-daygrid-event-dot { border-color: currentColor; }
                            .fc-timegrid-event .fc-event-time { font-size: 0.75rem; }
                            .fc-timegrid-event .fc-event-title { font-weight: 600; }
                        `}</style>
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                            initialView="timeGridWeek"
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                            }}
                            events={events}
                            height="auto"
                            aspectRatio={1.8}
                            slotMinTime="06:00:00"
                            slotMaxTime="22:00:00"
                            allDaySlot={false}
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            nowIndicator={true}
                            eventContent={(eventInfo) => {
                                const isAllowed = eventInfo.event.extendedProps.allowWithoutSlot;
                                return (
                                    <div className="flex flex-col overflow-hidden text-xs">
                                        <div className="font-semibold text-white/90 truncate">
                                            {eventInfo.timeText}
                                        </div>
                                        <div className="font-bold text-white truncate">
                                            {eventInfo.event.title}
                                        </div>
                                        {isAllowed && (
                                            <div className="mt-0.5 text-[10px] bg-white/20 px-1 rounded w-fit">
                                                Allowed w/o slot
                                            </div>
                                        )}
                                    </div>
                                );
                            }}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
