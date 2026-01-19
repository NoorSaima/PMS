"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Calendar,
    CalendarCheck,
    CheckCircle2,
    LogIn,
    LogOut,
    Trash2,
    UserCheck,
    UserX,
    XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface KPICardProps {
    title: string;
    count: number;
    icon: React.ReactNode;
    bgColor: string;
    className?: string;
    onClick?: () => void;
    isSelected?: boolean;
}

const KPICard = ({ title, count, icon, bgColor, className, onClick, isSelected }: KPICardProps) => {
    return (
        <Card
            style={{ backgroundColor: bgColor }}
            className={cn(
                "relative overflow-hidden border-none shadow-sm hover:shadow-md transition-all group h-full cursor-pointer",
                isSelected && "ring-4 ring-white ring-offset-2 shadow-xl scale-105",
                className
            )}
            onClick={onClick}
        >
            {/* Decorative background element */}
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10 transition-transform group-hover:scale-150 duration-500 ease-out" />

            <CardContent className="p-4 flex items-center justify-between relative z-10">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wide">
                        {title}
                    </span>
                    <span className="text-xl font-bold text-white leading-tight">
                        {count}
                    </span>
                </div>

                <div className="p-2 rounded-lg bg-white/15 text-white backdrop-blur-sm shrink-0">
                    {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
                </div>
            </CardContent>
        </Card>
    );
};

export default function AppointmentKPICards({ 
    selectedFilter, 
    onFilterChange,
    appointments = []
}: { 
    selectedFilter: string | null;
    onFilterChange: (filter: string | null) => void;
    appointments?: any[];
}) {
    // Calculate counts from real appointments data
    const calculateCount = (status: string) => {
        return appointments.filter((apt: any) => {
            // Check appointmentStatusName first (has display text like "Scheduled")
            const aptStatus = apt.appointmentStatusName || apt.AppointmentStatusName || apt.status || "";
            const normalizedAptStatus = aptStatus.replace("-", " ");
            const normalizedStatus = status.replace("-", " ");
            return normalizedAptStatus === normalizedStatus;
        }).length;
    };

    const kpiData = [
        {
            title: "Scheduled",
            count: calculateCount("Scheduled"),
            icon: <Calendar />,
            bgColor: "#4098d7",
        },
        {
            title: "Confirmed",
            count: calculateCount("Confirmed"),
            icon: <CheckCircle2 />,
            bgColor: "#3aa981",
        },
        {
            title: "Checked-In",
            count: calculateCount("Checked-In"),
            icon: <LogIn />,
            bgColor: "#6366f1",
        },
        {
            title: "In Room",
            count: calculateCount("In Room"),
            icon: <UserCheck />,
            bgColor: "#8b5cf6",
        },
        {
            title: "Checked-Out",
            count: calculateCount("Checked-Out"),
            icon: <LogOut />,
            bgColor: "#f29857",
        },
        {
            title: "Canceled",
            count: calculateCount("Canceled"),
            icon: <XCircle />,
            bgColor: "#ef4444",
        },
        {
            title: "No Show",
            count: calculateCount("No Show"),
            icon: <UserX />,
            bgColor: "#d15c89",
        },
        {
            title: "Deleted",
            count: calculateCount("Deleted"),
            icon: <Trash2 />,
            bgColor: "#64748b",
        },
        {
            title: "Rescheduled",
            count: calculateCount("Rescheduled"),
            icon: <CalendarCheck />,
            bgColor: "#f59e0b",
        },
    ];

    const handleCardClick = (status: string) => {
        // If already selected, deselect it (show all)
        if (selectedFilter === status) {
            onFilterChange(null);
        } else {
            onFilterChange(status);
        }
    };

    return (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9">
            {kpiData.map((kpi, index) => (
                <motion.div
                    key={kpi.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="w-full"
                >
                    <KPICard
                        title={kpi.title}
                        count={kpi.count}
                        icon={kpi.icon}
                        bgColor={kpi.bgColor}
                        onClick={() => handleCardClick(kpi.title)}
                        isSelected={selectedFilter === kpi.title}
                    />
                </motion.div>
            ))}
        </div>
    );
}
