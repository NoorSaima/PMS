"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, SquarePen, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ReferralDataProps = {
    id: string;
    referredTo: string;
    consultationType: string;
    reason: string;
    referredBy: string;
    date: string;
    type: string;
    action?: React.ReactNode;
};

export const columns: ColumnDef<ReferralDataProps>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>,
    },
    {
        accessorKey: "referredTo",
        header: "Referred To",
        cell: ({ row }) => <span>{row.getValue("referredTo")}</span>,
    },
    {
        accessorKey: "consultationType",
        header: "Consultation Type",
        cell: ({ row }) => <span>{row.getValue("consultationType")}</span>,
    },
    {
        accessorKey: "reason",
        header: "Reason",
        cell: ({ row }) => <span className="truncate max-w-[200px] inline-block" title={row.getValue("reason")}>{row.getValue("reason")}</span>,
    },
    {
        accessorKey: "referredBy",
        header: "Referred By",
        cell: ({ row }) => <span>{row.getValue("referredBy")}</span>,
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <span>{row.getValue("date")}</span>,
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <Badge color="info" className="border-0 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">{row.getValue("type")}</Badge>,
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row, table }) => {
            const onEdit = (table.options.meta as any)?.onEdit;
            const onDelete = (table.options.meta as any)?.onDelete;
            
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit?.(row.getValue("id"))}>
                            <SquarePen className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => onDelete?.(row.getValue("id"))}
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
