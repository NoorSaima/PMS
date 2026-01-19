"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, SquarePen, Trash2, Eye } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

// Claim ID, Name, DPB, Claim Type, Total Charge, Total Paid, Total Adjustments, Balance, Provider Name, Payer Name, Facility Name, Action
export type ClaimData = {
    id: string;
    name: string;
    dpb: string;
    type: "Professional" | "Institutional";
    totalCharge: number;
    totalPaid: number;
    totalAdjustments: number;
    balance: number;
    providerName: string;
    payerName: string;
    facilityName: string;
    status: "Paid" | "Pending" | "Denied" | "Rejected" | "Draft";
};

export const getColumns = (
    onViewClaim: (claim: ClaimData) => void
): ColumnDef<ClaimData>[] => [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <div className="xl:w-16">
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "Claim ID",
            cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>,
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => <span>{row.getValue("name")}</span>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const statusColors: Record<string, string> = {
                    Paid: "bg-success/20 text-success",
                    Pending: "bg-warning/20 text-warning",
                    Denied: "bg-destructive/20 text-destructive",
                    Rejected: "bg-destructive/20 text-destructive",
                    Draft: "bg-default-200 text-default-600",
                };
                const status = row.getValue<string>("status");
                const statusStyles = statusColors[status] || "bg-default-200 text-default-600";
                return (
                    <Badge
                        className={cn("rounded-full px-3 py-0.5 text-xs font-semibold shadow-none border-0 box-border block w-max", statusStyles)}
                    >{status}</Badge>
                );
            }
        },
        {
            accessorKey: "dpb",
            header: "DPB",
            cell: ({ row }) => <span>{row.getValue("dpb")}</span>,
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => (
                <Badge className="rounded-md font-normal text-muted-foreground border-slate-300 bg-transparent border">
                    {row.getValue("type")}
                </Badge>
            ),
        },
        {
            accessorKey: "totalCharge",
            header: "Total Charge",
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("totalCharge"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount)
                return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "totalPaid",
            header: "Total Paid",
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("totalPaid"))
                return <div className="text-right">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}</div>
            },
        },
        {
            accessorKey: "totalAdjustments",
            header: "Adjustments",
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("totalAdjustments"))
                return <div className="text-right">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}</div>
            },
        },
        {
            accessorKey: "balance",
            header: "Balance",
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("balance"))
                return <div className="text-right font-bold text-red-500">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}</div>
            },
        },
        {
            accessorKey: "providerName",
            header: "Provider",
        },
        {
            accessorKey: "payerName",
            header: "Payer",
        },
        {
            accessorKey: "facilityName",
            header: "Facility",
        },
        {
            id: "actions",
            enableHiding: false,
            header: "Action",
            cell: ({ row }) => {
                const claim = row.original

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
                            <DropdownMenuItem onClick={() => onViewClaim(claim)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <SquarePen className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
