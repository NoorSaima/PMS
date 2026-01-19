"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, SquarePen, Trash2, Eye } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type PaymentDataProps = {
    id: string;
    patient: string;
    type: string;
    source: string;
    amount: number;
    appliedAmount: number;
    remainingAmount: number;
    copayDOS?: string;
    received: string;
    deposit?: string;
    clearance?: string;
    checkNumber?: string;
    memo?: string;
    addedBy: string;
    action?: React.ReactNode;
};

export const columns: ColumnDef<PaymentDataProps>[] = [
    {
        accessorKey: "patient",
        header: "Patient",
        cell: ({ row }) => <span className="font-medium text-default-900">{row.getValue("patient")}</span>,
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <span>{row.getValue("type")}</span>,
    },
    {
        accessorKey: "source",
        header: "Source",
        cell: ({ row }) => <span>{row.getValue("source")}</span>,
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return <span>{formatted}</span>;
        },
    },
    {
        accessorKey: "appliedAmount",
        header: "Applied Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("appliedAmount"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return <span>{formatted}</span>;
        },
    },
    {
        accessorKey: "remainingAmount",
        header: "Remaining Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("remainingAmount"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return <span>{formatted}</span>;
        },
    },
    {
        accessorKey: "copayDOS",
        header: "Copay DOS",
        cell: ({ row }) => <span>{row.getValue("copayDOS") || "-"}</span>,
    },
    {
        accessorKey: "received",
        header: "Received",
        cell: ({ row }) => <span>{row.getValue("received")}</span>,
    },
    {
        accessorKey: "deposit",
        header: "Deposit",
        cell: ({ row }) => <span>{row.getValue("deposit") || "-"}</span>,
    },
    {
        accessorKey: "clearance",
        header: "Clearance",
        cell: ({ row }) => <span>{row.getValue("clearance") || "-"}</span>,
    },
    {
        accessorKey: "checkNumber",
        header: "Check",
        cell: ({ row }) => <span>{row.getValue("checkNumber") || "-"}</span>,
    },
    {
        accessorKey: "memo",
        header: "Memo",
        cell: ({ row }) => <span className="truncate max-w-[150px] inline-block" title={row.getValue("memo")}>{row.getValue("memo") || "-"}</span>,
    },
    {
        accessorKey: "addedBy",
        header: "Added By",
        cell: ({ row }) => <span>{row.getValue("addedBy")}</span>,
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
            const payment = row.original;

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
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit payment</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
