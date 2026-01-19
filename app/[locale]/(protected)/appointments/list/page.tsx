"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import AppointmentKPICards from "./components/appointment-kpi-cards";
import AppointmentTable from "./components/appointment-table";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppointments,fetchAppointmentStatus, editAppointmentStatus } from "@/store/slices/appointmentSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AppointmentListPage() {
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(new Date('2026-01-12').toISOString().split('T')[0]);
    const [showAllDates, setShowAllDates] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const { data: session, status: sessionStatus } = useSession();
    const { appointments = [], status = 'idle' } = useAppSelector((state) => state?.appointment || {});
    const practiceId = 'a3862b5d-8c74-40b4-b38a-1f5870ef0f09';
  
    // Fetch appointments when date changes
    useEffect(() => {
        if (selectedDate && practiceId) {
            console.log('📅 Fetching appointments for date:', selectedDate);
            dispatch(fetchAppointments({
                appointmentDate: selectedDate,
                practiceId: practiceId,
                resourceIds: ''
            }));
        }
    }, [dispatch, selectedDate, practiceId]);

    // Fetch status once when authenticated - separate from date changes
    useEffect(() => {
        if (sessionStatus === "authenticated") {
            console.log('📊 Fetching appointment statuses...');
            dispatch(fetchAppointmentStatus());
        }
    }, [dispatch, sessionStatus]);

    // Handle status update from table
    const handleStatusChange = async (appointmentId: string, newStatus: string) => {
        // Backend uses 3-digit status codes, not 1-8
        const statusMap: Record<string, number> = {
            "Scheduled": 100,
            "Confirmed": 111,
            "Checked-In": 122,
            "In Room": 133,
            "Checked-Out": 145,
            "Canceled": 155,
            "No Show": 166,
            "Rescheduled": 188,
        };
        const statusId = statusMap[newStatus] || 100;
        try {
            await dispatch(editAppointmentStatus({
                AppointmentId: appointmentId,
                StatusId: statusId,
                updateBy: session?.user?.id || "system",
                IpAddress: "0.0.0.0",
            })).unwrap();
            toast.success("Status updated");
            // refresh current date list
            if (selectedDate) {
                dispatch(fetchAppointments({
                    appointmentDate: selectedDate,
                    practiceId: practiceId,
                    resourceIds: "",
                }));
            }
        } catch (err) {
            toast.error((err as any)?.message || "Failed to update status");
        }
    };
    // Fetch appointments on page load (all appointments) - DISABLED
    // Backend API returning Unauthorized for GET requests
    // User should manually select date to fetch appointments
    /*
    useEffect(() => {
        if (sessionStatus === "authenticated" && session?.user?.companyId) {
            console.log('📥 Fetching all appointments for practice:', session.user.companyId);
            dispatch(fetchAllAppointments(session.user.companyId as any))
                .then((result) => {
                    console.log('✅ Appointments loaded:', result?.payload?.data?.length || 0, 'total');
                })
                .catch((error) => {
                    console.error('❌ Error fetching appointments:', error);
                    toast.error('Failed to load appointments');
                });
        }
    }, [sessionStatus, session?.user?.companyId, dispatch]);
    */

    // Fetch appointments when date changes
    // const handleDateChange = (newDate: string) => {
    //     setSelectedDate(newDate);
    //     setShowAllDates(false);
    //     console.log('📅 Date changed to:',);
    //     if (sessionStatus === "authenticated" && session?.user?.companyId) {
    //         console.log('📅 Fetching appointments for date:', newDate);
    //         dispatch(fetchAppointments({
    //             appointmentDate: newDate,
    //             practiceId: session.user.companyId as string,
    //             resourceIds: ""
    //         }))
    //             .then((result) => {
    //                 console.log('✅ Date appointments loaded:', result?.payload?.data?.length || 0);
    //             })
    //             .catch((error) => {
    //                 console.error('❌ Error fetching date appointments:', error);
    //                 toast.error('Failed to load appointments for this date');
    //             });
    //     }
    // };

    // const handleShowAll = () => {
    //     setShowAllDates(true);
    //     if (sessionStatus === "authenticated" && session?.user?.companyId) {
    //         console.log('📥 Showing all appointments again');
    //         dispatch(fetchAllAppointments(session.user.companyId as any));
    //     }
    // };

    return (
        <div>
            <SiteBreadcrumb />
            <div className="flex items-center justify-between space-y-2 mb-4">
                <h2 className="text-3xl font-bold tracking-tight">Appointment List</h2>
            </div>

            {/* Date Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Select Date</label>
                    <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full"
                    />
                </div>
               
            </div>

            <div className="flex flex-col gap-5">
                <AppointmentKPICards 
                    selectedFilter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                    appointments={appointments}
                />
                <AppointmentTable 
                    selectedFilter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                    appointments={appointments}
                    isLoading={status === 'loading'}
                    onStatusChange={handleStatusChange}
                />
            </div>
        </div>
    );
}
