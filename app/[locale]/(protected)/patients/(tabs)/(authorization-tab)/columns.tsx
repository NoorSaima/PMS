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
import AddAuthorizationDialog from "./add-authorization-dialog";
import { useAppDispatch } from "@/store/hooks";
import { deletePriorAuthorization } from "@/store/slices/patientAuthorizationSlice";
import { useToast } from "@/components/ui/use-toast";

export type AuthDataProps = {
    id: string;
    type: string;
    payerName: string;
    requestedOn: string;
    status: "Active" | "Pending" | "Expired" | "Denied";
    validityPeriod: string;
    priorAuthNumber: string;
    cptCodes: string;

    icdCodes: string;
    patientId?: string | number; // Added for edit context
};

export const columns: ColumnDef<AuthDataProps>[] = [
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <span className="font-medium">{row.getValue("type")}</span>,
    },
    {
        accessorKey: "payerName",
        header: "Payer Name",
        cell: ({ row }) => <span>{row.getValue("payerName")}</span>,
    },
    {
        accessorKey: "requestedOn",
        header: "Requested On",
        cell: ({ row }) => <span>{row.getValue("requestedOn")}</span>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const getStatusColor = (s: string) => {
                switch (s) {
                    case "Active": return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";
                    case "Pending": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400";
                    case "Expired": return "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400";
                    case "Denied": return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";
                    default: return "bg-gray-100 text-gray-700";
                }
            }
            return <Badge className={`border-0 ${getStatusColor(status)}`}>{status}</Badge>;
        },
    },
    {
        accessorKey: "validityPeriod",
        header: "Validity Period",
        cell: ({ row }) => <span>{row.getValue("validityPeriod")}</span>,
    },
    {
        accessorKey: "priorAuthNumber",
        header: "Prior Auth #",
        cell: ({ row }) => <span>{row.getValue("priorAuthNumber")}</span>,
    },
    {
        accessorKey: "cptCodes",
        header: "CPT Codes",
        cell: ({ row }) => <span className="text-xs">{row.getValue("cptCodes")}</span>,
    },
    {
        accessorKey: "icdCodes",
        header: "ICD Codes",
        cell: ({ row }) => <span className="text-xs">{row.getValue("icdCodes")}</span>,
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row, table }) => {
            const auth = row.original;
            const meta = table.options.meta as { refreshData: () => void } | undefined;
            const dispatch = useAppDispatch();
            const { toast } = useToast();

            const handleDelete = async () => {
                if (!confirm("Are you sure you want to delete this prior authorization?")) return;

                try {
                    await dispatch(deletePriorAuthorization({ priorAuthId: auth.id })).unwrap();
                    
                    toast({
                        title: "Success",
                        description: "Prior authorization deleted successfully.",
                    });

                    if (meta?.refreshData) {
                        meta.refreshData();
                    }
                } catch (error) {
                    console.error("Error deleting:", error);
                    toast({
                        title: "Error",
                        description: error instanceof Error ? error.message : "Failed to delete prior authorization",
                        variant: "destructive",
                    });
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="rounded-full bg-primary/10 hover:bg-primary/20 p-2 h-8 w-8 transition-colors duration-200">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4 text-primary" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px] rounded-xl border border-border/50 shadow-lg bg-card/95 backdrop-blur-sm p-1">
                        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-2 py-1.5 uppercase tracking-wider">
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1 bg-border/50" />
                        <DropdownMenuItem
                            className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors focus:bg-primary/10 focus:text-primary mb-1"
                            onClick={() => navigator.clipboard.writeText(auth.priorAuthNumber)}
                        >
                            <span className="flex-1">Copy Auth #</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors focus:bg-primary/10 focus:text-primary mb-1">
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                        </DropdownMenuItem>

                        <AddAuthorizationDialog
                            mode="edit"
                            defaultValues={auth}
                            patientId={auth.patientId}
                            onSuccess={() => meta?.refreshData && meta.refreshData()}
                            trigger={
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors focus:bg-primary/10 focus:text-primary mb-1 outline-none"
                                >
                                    <SquarePen className="h-4 w-4" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                            }
                        />

                        <DropdownMenuItem
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors focus:bg-destructive/10 focus:text-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
