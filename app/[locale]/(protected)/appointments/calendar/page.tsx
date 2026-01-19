"use client";

import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import CalendarSidebar from "./components/calendar-sidebar";
import AppointmentDialog from "./components/appointment-dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAppointment, fetchAppointments } from "@/store/slices/appointmentSlice";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CalendarPage() {
    const dispatch = useAppDispatch();
    const { data: session, status: sessionStatus } = useSession();
    const appointmentState = useAppSelector((state) => state?.appointment || {});
    const { appointments = [], status = 'idle', error = null } = appointmentState;
    const practiceId = 'a3862b5d-8c74-40b4-b38a-1f5870ef0f09';
    
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);
    const calendarRef = useRef<FullCalendar>(null);
    const [view, setView] = useState("dayGridMonth");
    const [selectedDateForFilter, setSelectedDateForFilter] = useState<string>(new Date().toISOString().split('T')[0]);

    // Sync state
    const [calendarTitle, setCalendarTitle] = useState("");
    const [viewRange, setViewRange] = useState<{ start: Date; end: Date } | null>(null);

    // Sync small calendar with FullCalendar
    useEffect(() => {
        if (date && calendarRef.current) {
            calendarRef.current.getApi().gotoDate(date);
        }
    }, [date]);

    const handleDateClick = (arg: any) => {
        const clickDate = new Date(arg.dateStr);
        const time = arg.date.toTimeString().substring(0, 5);
        setDate(clickDate);
        setSelectedSlot({ date: clickDate, time });
        setIsDialogOpen(true);
    };

    const handleViewChange = (newView: string) => {
        setView(newView);
        if (calendarRef.current) {
            calendarRef.current.getApi().changeView(newView);
        }
    };

    const handleDatesSet = (arg: any) => {
        setCalendarTitle(arg.view.title);
        setViewRange({
            start: arg.start,
            end: arg.end,
        });
        
        // Fetch appointments for the visible range
        if (session?.user?.companyId) {
            console.log('📅 Calendar view range:', arg.start.toISOString().split('T')[0], 'to', arg.end.toISOString().split('T')[0]);
            // Optional: Fetch appointments for the date range
            // dispatch(fetchAppointments({ appointmentDate: arg.start.toISOString().split('T')[0], practiceId: session.user.companyId }));
        }
    };

    // Handle date filter change
    const handleDateFilterChange = (newDate: string) => {
        setSelectedDateForFilter(newDate);
        
        if (sessionStatus === "authenticated" && session?.user?.companyId) {
            console.log('📅 Fetching calendar appointments for date:', newDate);
            dispatch(fetchAppointments({
                appointmentDate: newDate,
                practiceId: session.user.companyId as string,
                resourceIds: ""
            }))
                .then((result) => {
                    console.log('✅ Calendar date appointments loaded:', result?.payload?.data?.length || 0);
                })
                .catch((error) => {
                    console.error('❌ Error fetching calendar date appointments:', error);
                    toast.error('Failed to load appointments for this date');
                });
        }
    };

    // Handle show all appointments
    const handleShowAllCalendarAppointments = () => {
        const today = new Date().toISOString().split('T')[0];
        console.log('📅 Showing today\'s calendar appointments');
        dispatch(fetchAppointments({
            appointmentDate: today,
            practiceId: practiceId,
            resourceIds: ""
        }));
    };

    const handleSaveAppointment = async (data: any) => {
        // Check if session is still loading
        if (sessionStatus === "loading") {
            toast.info("Loading session, please wait...");
            return;
        }

        // Only show error if session is authenticated but user data is missing
        if (sessionStatus === "authenticated" && !session?.user?.id) {
            toast.error("Session data incomplete. Please try logging out and back in.");
            return;
        }

        // If not authenticated at all, redirect to login
        if (sessionStatus === "unauthenticated") {
            toast.error("Session expired. Redirecting to login...");
            window.location.href = '/auth/login';
            return;
        }

        try {
            // Validate required fields
            if (!data.patient || data.patient.trim() === "") {
                toast.error("❌ Patient is required - please select from patient selector");
                console.error("Patient validation failed:", data.patient);
                return;
            }

            if (!data.facility || data.facility.trim() === "") {
                toast.error("❌ Facility is required - please select from facility selector");
                console.error("Facility validation failed:", data.facility);
                return;
            }   

            if (!data.provider || data.provider.trim() === "") {
                toast.error("❌ Provider/Resource is required - please select from provider selector");
                console.error("Provider validation failed:", data.provider);
                return;
            }

            if (!data.date) {
                toast.error("Please select appointment date");
                return;
            }

            if (!data.type) {
                toast.error("Please select appointment type");
                return;
            }

            if (!data.status) {
                toast.error("Please select appointment status");
                return;
            }

            // Format time with seconds (HH:mm:ss)
            const timeWithSeconds = data.time ? `${data.time}:00` : "09:00:00";

            const payload = {
                PatientID: data.patient,
                AppointmentDate: data.date,
                AppointmentTime: timeWithSeconds,
                AppointmentLength: parseInt(data.length) || 30,
                AppointmentType: String(data.type), // Convert to STRING: "200" not 200
                ResourceID: data.provider,
                FacilityID: data.facility,
                AppointmentStatus: String(data.status), // Convert to STRING: "2" not 2
                AllowAppointmenttoOverBook: data.allowOverbook ? 1 : 0,
                Comment: data.comment || "",
                RepeatAppointment: data.repeat ? 1 : 0,
                RepeatDurationDays: parseInt(data.repeatDuration) || 0,
                RepeatDurationDuration: data.repeatUnit || "Day",
                EndAfter: data.endDecor === "occurrences" ? parseInt(data.endOccurrences) || 0 : 0,
                EndOn: data.endDate || "",
                PracticeId: "a3862b5d-8c74-40b4-b38a-1f5870ef0f09",
                pr: "appointment", // Required field for backend
            };

            console.log("📤 Submitting appointment:", payload);
            console.log("📤 Form data received:", data);
            console.log("🔍 Payload validation:", {
                PatientID: payload.PatientID ? "✓" : "✗ MISSING",
                AppointmentDate: payload.AppointmentDate ? "✓" : "✗ MISSING",
                AppointmentTime: payload.AppointmentTime ? "✓" : "✗ MISSING",
                AppointmentLength: payload.AppointmentLength ? "✓" : "✗ MISSING",
                AppointmentType: payload.AppointmentType ? "✓" : "✗ MISSING",
                ResourceID: payload.ResourceID ? "✓" : "✗ MISSING",
                FacilityID: payload.FacilityID ? "✓" : "✗ MISSING",
                AppointmentStatus: payload.AppointmentStatus ? "✓" : "✗ MISSING",
                PracticeId: payload.PracticeId ? "✓" : "✗ MISSING",
            });
            const result = await dispatch(addAppointment(payload)).unwrap();
            toast.success("✅ Appointment added successfully!");
            
            // Refresh appointments on calendar after creation
            console.log('🔄 Refreshing calendar appointments...');
            dispatch(fetchAppointments({
                appointmentDate: data.date,
                practiceId: practiceId,
                resourceIds: ""
            }));
        } catch (error: any) {
            console.error("❌ Error saving appointment:", error);
            toast.error(error?.toString() || "Failed to add appointment. Please check console for details.");
        }
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            <SiteBreadcrumb />

            <div className="flex flex-col lg:flex-row gap-6 h-full">
                {/* Left Sidebar */}
                <CalendarSidebar
                    date={date}
                    setDate={setDate}
                    viewRange={viewRange}
                />

                {/* Main Calendar Area */}
                <div className="flex-1 flex flex-col space-y-4 min-h-[calc(100vh-200px)]">
                    <Card className="p-4 flex flex-col gap-4">
                        {/* Toolbar */}
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <h2 className="text-2xl font-semibold text-foreground">
                                    {calendarTitle}
                                </h2>
                                <div className="flex items-center gap-2">
                                    <Select defaultValue="30">
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Time Scale" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="15">15 Mins</SelectItem>
                                            <SelectItem value="30">30 Mins</SelectItem>
                                            <SelectItem value="60">1 Hour</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Button onClick={() => {
                                        try {
                                            console.log('Opening appointment dialog...');
                                            setSelectedSlot(null);
                                            setIsDialogOpen(true);
                                        } catch (error) {
                                            console.error('Error opening dialog:', error);
                                            toast.error('Failed to open appointment form');
                                        }
                                    }} className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        New Appointment
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto border-b pb-2">
                                <Tabs value={view} onValueChange={handleViewChange} className="w-full">
                                    <TabsList className="grid w-full grid-cols-4 md:w-auto">
                                        <TabsTrigger value="dayGridMonth">Month</TabsTrigger>
                                        <TabsTrigger value="timeGridWeek">Week</TabsTrigger>
                                        <TabsTrigger value="timeGridDay">Day</TabsTrigger>
                                        <TabsTrigger value="listWeek">List</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="flex-1 calendar-container [&_.fc]:font-inter [&_.fc-theme-standard_td]:border-default-200 [&_.fc-theme-standard_th]:border-default-200">
                            <style jsx global>{`
                 .calendar-container {
                   --fc-border-color: hsl(var(--border));
                   --fc-button-text-color: hsl(var(--primary-foreground));
                   --fc-button-bg-color: hsl(var(--primary));
                   --fc-button-border-color: hsl(var(--primary));
                   --fc-button-hover-bg-color: hsl(var(--primary) / 0.9);
                   --fc-button-hover-border-color: hsl(var(--primary) / 0.9);
                   --fc-button-active-bg-color: hsl(var(--primary) / 0.8);
                   --fc-button-active-border-color: hsl(var(--primary) / 0.8);
                   --fc-event-bg-color: hsl(var(--primary));
                   --fc-event-border-color: hsl(var(--primary));
                   --fc-page-bg-color: transparent;
                   --fc-neutral-bg-color: hsl(var(--secondary));
                   --fc-list-event-hover-bg-color: hsl(var(--secondary));
                   --fc-today-bg-color: hsl(var(--accent) / 0.1);
                 }
                 .fc .fc-col-header-cell-cushion {
                   color: hsl(var(--foreground));
                   text-transform: uppercase;
                   font-size: 0.875rem;
                   font-weight: 500;
                   padding-top: 8px;
                   padding-bottom: 8px;
                 }
                 .fc-timegrid-slot-label-cushion {
                    color: hsl(var(--muted-foreground));
                    font-size: 0.75rem;
                 }
                 .fc .fc-list-day-cushion {
                    background-color: hsl(var(--secondary));
                 }
               `}</style>
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                                initialView="dayGridMonth"
                                headerToolbar={false}
                                dayHeaderFormat={{ weekday: 'short' }}
                                editable={true}
                                selectable={true}
                                selectMirror={true}
                                dayMaxEvents={true}
                                height="auto"
                                dateClick={handleDateClick}
                                datesSet={handleDatesSet}
                                events={appointments.map((apt: any) => {
                                    // Determine color based on status
                                    let backgroundColor = '#3b82f6'; // Default: blue (Scheduled)
                                    if (apt.AppointmentStatus === 'Confirmed') backgroundColor = '#10b981'; // Green
                                    else if (apt.AppointmentStatus === 'Canceled') backgroundColor = '#ef4444'; // Red
                                    else if (apt.AppointmentStatus === 'Checked In') backgroundColor = '#f59e0b'; // Amber
                                    else if (apt.AppointmentStatus === 'In Room') backgroundColor = '#a855f7'; // Purple
                                    else if (apt.AppointmentStatus === 'Checked Out') backgroundColor = '#6b7280'; // Gray
                                    
                                    return {
                                        title: `${apt.ResourceName || 'Provider'} - ${apt.AppointmentStatus || 'Scheduled'}`,
                                        date: apt.AppointmentDate,
                                        start: `${apt.AppointmentDate}T${apt.AppointmentTime}`,
                                        backgroundColor: backgroundColor,
                                        borderColor: backgroundColor,
                                        extendedProps: {
                                            patientId: apt.PatientID,
                                            appointmentId: apt.AppointmentID,
                                            status: apt.AppointmentStatus
                                        }
                                    };
                                }) || []}
                                eventClassNames="rounded-md text-xs font-semibold px-2 py-1 shadow-sm"
                            />
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 pt-4 border-t text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span>Scheduled</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span>Confirmed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <span>Checked-In</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                <span>In Room</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                                <span>Checked-Out</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span>Canceled</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <AppointmentDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                selectedDate={selectedSlot ? selectedSlot.date : date}
                selectedTime={selectedSlot ? selectedSlot.time : undefined}
                onSave={handleSaveAppointment}
            />
        </div>
    );
}
