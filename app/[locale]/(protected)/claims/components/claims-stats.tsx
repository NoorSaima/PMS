import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle, AlertCircle, DollarSign, Clock, XCircle, RotateCcw, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    bgColor: string;
    className?: string;
}

const StatsCard = ({ title, value, icon, bgColor, className }: StatsCardProps) => {
    return (
        <Card style={{ backgroundColor: bgColor }} className={cn("relative overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group h-full", className)}>
            {/* Decorative background element */}
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10 transition-transform group-hover:scale-150 duration-500 ease-out" />

            <CardContent className="p-4 flex items-center justify-between relative z-10">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wide">{title}</span>
                    <span className="text-xl font-bold text-white leading-tight">{value}</span>
                </div>

                <div className="p-2 rounded-lg bg-white/15 text-white backdrop-blur-sm shrink-0">
                    {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
                </div>
            </CardContent>
        </Card>
    );
};

export default function ClaimsStats() {
    const stats = [
        {
            title: "Total Claims",
            value: "1,245",
            icon: <FileText />,
            bgColor: "#3aa981", // Softer Green
        },
        {
            title: "Paid",
            value: "$450k",
            icon: <DollarSign />,
            bgColor: "#4098d7", // Softer Blue
        },
        {
            title: "Pending",
            value: "145",
            icon: <Clock />,
            bgColor: "#f29857", // Softer Orange
        },
        {
            title: "Denied",
            value: "32",
            icon: <XCircle />,
            bgColor: "#ef4444", // Red
        },
        {
            title: "Re-submitted",
            value: "15",
            icon: <RotateCcw />,
            bgColor: "#8b5cf6", // Violet
        },
        {
            title: "Professional",
            value: "850",
            icon: <CheckCircle />,
            bgColor: "#6366f1", // Indigo
        },
        {
            title: "Institutional",
            value: "395",
            icon: <Building2 />,
            bgColor: "#d15c89", // Softer Pink
        },
        {
            title: "Rejected",
            value: "12",
            icon: <AlertCircle />,
            bgColor: "#f59e0b", // Amber
        },
        {
            title: "Draft",
            value: "45",
            icon: <FileText />,
            bgColor: "#64748b", // Slate
        }
    ];

    return (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="w-full"
                >
                    <StatsCard {...stat} />
                </motion.div>
            ))}
        </div>
    );
}
