"use client";

import * as React from "react";
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { columns, ReferralDataProps } from "./columns";
import TablePagination from "./table-pagination";
import EditReferralDialog from "./edit-referral-dialog";

interface ReferralListProps {
    patientId: string;
}

interface ApiReferral {
    PatientReferralID: number;
    PatientId: string;
    RefferedToFirstName: string;
    RefferedToLastName: string;
    RefferedToMiddleName: string;
    RefferedToSuffix: string;
    RefferTo: string;
    ConsultationType: string;
    ConsultationTypeID: string;
    ReasonforReferrel: string;
    RefferedByFirstName: string;
    RefferedByLastName: string;
    RefferedByMiddleName: string;
    RefferedBySuffix: string;
    RefferBy: string;
    Date: string;
    AddedBy: string;
    AddedDate: string;
    ReffertypeId: number;
    RefferType: string;
}

export default function ReferralList({ patientId }: ReferralListProps) {
    const [data, setData] = React.useState<ReferralDataProps[]>([]);
    const [rawData, setRawData] = React.useState<ApiReferral[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState("1"); // 1: Incoming, 2: Outgoing, 3: Internal
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [selectedReferral, setSelectedReferral] = React.useState<ApiReferral | null>(null);

    React.useEffect(() => {
        const fetchReferrals = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `/api/patients/get-patient-referral?patientId=${patientId}&refferType=${activeTab}`
                );

    
                if (!response.ok) {
                    throw new Error("Failed to fetch referrals");
                }

                const apiData: ApiReferral[] = await response.json();

                // Store raw data for editing
                setRawData(apiData);

                // Transform API data to table format
                const transformedData: ReferralDataProps[] = apiData.map((item) => ({
                    id: `REF-${item.PatientReferralID}`,
                    referredTo: item.RefferTo,
                    consultationType: item.ConsultationType,
                    reason: item.ReasonforReferrel,
                    referredBy: item.RefferBy,
                    date: new Date(item.Date).toLocaleDateString(),
                    type: item.RefferType,
                }));

                setData(transformedData);
            } catch (error: any) {
                console.error("Error fetching referrals:", error);
                toast.error("Failed to load referrals");
            } finally {
                setIsLoading(false);
            }
        };

        fetchReferrals();
    }, [patientId, activeTab]);

    const handleEdit = (referralId: string) => {
        const id = parseInt(referralId.replace("REF-", ""));
        const referral = rawData.find(r => r.PatientReferralID === id);
        if (referral) {
            setSelectedReferral(referral);
            setEditDialogOpen(true);
        }
    };

    const handleRefresh = () => {
        // Re-fetch data after edit
        const fetchReferrals = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `/api/patients/get-patient-referral?patientId=${patientId}&refferType=${activeTab}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch referrals");
                }

                const apiData: ApiReferral[] = await response.json();
                setRawData(apiData);

                const transformedData: ReferralDataProps[] = apiData.map((item) => ({
                    id: `REF-${item.PatientReferralID}`,
                    referredTo: item.RefferTo,
                    consultationType: item.ConsultationType,
                    reason: item.ReasonforReferrel,
                    referredBy: item.RefferBy,
                    date: new Date(item.Date).toLocaleDateString(),
                    type: item.RefferType,
                }));

                setData(transformedData);
            } catch (error: any) {
                console.error("Error fetching referrals:", error);
                toast.error("Failed to load referrals");
            } finally {
                setIsLoading(false);
            }
        };

        fetchReferrals();
    };

    const handleDelete = async (referralId: string) => {
        const id = parseInt(referralId.replace("REF-", ""));
        
        if (!confirm("Are you sure you want to delete this referral?")) {
            return;
        }

        try {
            const response = await fetch(
                `/api/patients/delete-patient-referral?patientReferralID=${id}`,
                {
                    method: "DELETE",
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to delete referral");
            }

            toast.success("Referral deleted successfully");
            handleRefresh();
        } catch (error: any) {
            console.error("Error deleting referral:", error);
            toast.error(error.message || "Failed to delete referral");
        }
    };

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "includesString",
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
        meta: {
            onEdit: handleEdit,
            onDelete: handleDelete,
        },
    });

    return (
        <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList>
                    <TabsTrigger value="1">Incoming</TabsTrigger>
                    <TabsTrigger value="2">Outgoing</TabsTrigger>
                    <TabsTrigger value="3">Internal</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="space-y-4">
                    <div className="flex items-center py-4">
                        <Input
                            placeholder="Filter referrals..."
                            value={globalFilter ?? ""}
                            onChange={(event) => setGlobalFilter(event.target.value)}
                            className="max-w-sm"
                        />
                    </div>
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination table={table} />
                </TabsContent>
            </Tabs>
            <EditReferralDialog 
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                referralData={selectedReferral}
                onSuccess={handleRefresh}
            />
        </div>
    );
}
