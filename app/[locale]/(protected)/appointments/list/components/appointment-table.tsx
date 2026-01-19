"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

interface Appointment {
    id: string;
    patient: {
        name: string;
        image?: string;
        initials: string;
    };
    date: string;
    time: string;
    provider: {
        name: string;
        image?: string;
    };
    mobile: string;
    whatsapp: string;
    status:
    | "Scheduled"
    | "Confirmed"
    | "Checked In"
    | "In Room"
    | "Checked Out"
    | "Canceled"
    | "No Show"
    | "Rescheduled";
}

const mockAppointments: Appointment[] = [
    {
        id: "1",
        patient: {
            name: "John Doe",
            initials: "JD",
            image: "https://github.com/shadcn.png",
        },
        date: "2024-05-20",
        time: "09:00 AM",
        provider: {
            name: "Dr. Smith",
        },
        mobile: "+1234567890",
        whatsapp: "+1234567890",
        status: "Scheduled",
    },
    {
        id: "2",
        patient: {
            name: "Jane Smith",
            initials: "JS",
        },
        date: "2024-05-20",
        time: "10:30 AM",
        provider: {
            name: "Dr. Jones",
        },
        mobile: "+1987654321",
        whatsapp: "+1987654321",
        status: "Confirmed",
    },
    {
        id: "3",
        patient: {
            name: "Robert Brown",
            initials: "RB",
        },
        date: "2024-05-20",
        time: "11:15 AM",
        provider: {
            name: "Dr. Smith",
        },
        mobile: "+1122334455",
        whatsapp: "+1122334455",
        status: "Checked In",
    },
    {
        id: "4",
        patient: {
            name: "Emily Davis",
            initials: "ED",
        },
        date: "2024-05-20",
        time: "02:00 PM",
        provider: {
            name: "Dr. Jones",
        },
        mobile: "+1555666777",
        whatsapp: "+1555666777",
        status: "Canceled",
    },
    {
        id: "5",
        patient: {
            name: "Michael Wilson",
            initials: "MW",
        },
        date: "2024-05-21",
        time: "09:30 AM",
        provider: {
            name: "Dr. Smith",
        },
        mobile: "+1999888777",
        whatsapp: "+1999888777",
        status: "Scheduled",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Scheduled":
            return "default";
        case "Confirmed":
            return "success";
        case "Checked In":
        case "Checked-In":
            return "info";
        case "In Room":
            return "warning";
        case "Checked Out":
        case "Checked-Out":
            return "secondary";
        case "Canceled":
            return "destructive";
        case "No Show":
            return "destructive";
        case "Rescheduled":
            return "warning";
        default:
            return "default";
    }
};

export default function AppointmentTable({ 
    selectedFilter,
    onFilterChange,
    appointments = [],
    isLoading = false,
    onStatusChange,
}: { 
    selectedFilter: string | null;
    onFilterChange?: (filter: string | null) => void;
    appointments?: any[];
    isLoading?: boolean;
    onStatusChange?: (appointmentId: string, newStatus: string) => void;
}) {
    // Transform backend data to match table structure
    const transformedAppointments = appointments.map((apt: any) => ({
        id: apt.appointmentID || apt.AppointmentID || apt.id || "",
        patient: {
            name: apt.patientName || apt.PatientName || apt.patient?.name || "Unknown",
            image: apt.patient?.image,
            initials: (apt.patientName || apt.PatientName || apt.patient?.name || "U").split(" ").map((n: string) => n[0]).join(""),
        },
        date: apt.appointmentDate || apt.AppointmentDate || apt.date || "",
        time: apt.appointmentTime ? apt.appointmentTime.substring(0, 5) : apt.AppointmentTime ? apt.AppointmentTime.substring(0, 5) : apt.time || "",
        provider: {
            name: apt.resourceName || apt.ResourceName || apt.provider?.name || "Unknown",
            image: apt.provider?.image,
        },
        mobile: apt.cellNo || apt.PatientMobile || apt.mobile || "N/A",
        whatsapp: apt.cellNo || apt.PatientWhatsApp || apt.whatsapp || "N/A",
        status: apt.appointmentStatusName || apt.AppointmentStatusName || apt.AppointmentStatus || apt.status || "Scheduled",
    }));

    // Filter appointments based on selected status
    const filteredAppointments = selectedFilter
        ? transformedAppointments.filter((appointment) => {
            const normalizedAppointmentStatus = appointment.status.replace("-", " ");
            const normalizedFilter = selectedFilter.replace("-", " ");
            return normalizedAppointmentStatus === normalizedFilter;
        })
        : transformedAppointments;

    return (
        <div className="w-full bg-white rounded-lg p-4">
            <div className="flex items-center justify-between py-4">
                <div className="flex-1 text-xl font-medium text-default-900">
                    {selectedFilter 
                        ? `${selectedFilter} Appointments (${filteredAppointments.length})` 
                        : `All Appointments (${filteredAppointments.length})`}
                </div>
                {selectedFilter && onFilterChange && (
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onFilterChange(null)}
                        className="text-xs"
                    >
                        Clear Filter
                    </Button>
                )}
            </div>
            <Table>
                <TableHeader className="bg-default-200">
                    <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Provider Name</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>WhatsApp</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Update Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAppointments.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                No appointments found {selectedFilter && `with status "${selectedFilter}"`}
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={appointment.patient.image} />
                                        <AvatarFallback>{appointment.patient.initials}</AvatarFallback>
                                    </Avatar>
                                    <span>{appointment.patient.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback>
                                            {appointment.provider.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm text-muted-foreground">{appointment.provider.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-sm">{appointment.mobile}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <MessageCircle className="h-3 w-3 text-green-500" />
                                    <span className="text-sm">{appointment.whatsapp}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge color={getStatusColor(appointment.status) as any}>
                                    {appointment.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={appointment.status}
                                    onValueChange={(val) => onStatusChange?.(appointment.id, val)}
                                >
                                    <SelectTrigger className="w-[140px] h-8 text-xs">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                                        <SelectItem value="Checked-In">Checked-In</SelectItem>
                                        <SelectItem value="In Room">In Room</SelectItem>
                                        <SelectItem value="Checked-Out">Checked-Out</SelectItem>
                                        <SelectItem value="Canceled">Canceled</SelectItem>
                                        <SelectItem value="No Show">No Show</SelectItem>
                                        <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
