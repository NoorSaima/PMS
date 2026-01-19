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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { columns, PaymentDataProps } from "./columns";
import AddPaymentDialog from "./add-payment-dialog";
import TablePagination from "./table-pagination";

const data: PaymentDataProps[] = [
    {
        id: "PAY-1001",
        patient: "John Doe",
        type: "payment",
        source: "credit-card",
        amount: 150.00,
        appliedAmount: 100.00,
        remainingAmount: 50.00,
        received: "2024-05-10",
        checkNumber: "Visa-4242",
        memo: "Office visit copay",
        addedBy: "Admin",
    },
    {
        id: "PAY-1002",
        patient: "Jane Smith",
        type: "copay",
        source: "cash",
        amount: 25.00,
        appliedAmount: 25.00,
        remainingAmount: 0.00,
        copayDOS: "2024-05-12",
        received: "2024-05-12",
        deposit: "2024-05-13",
        clearance: "2024-05-14",
        memo: "Immediate copay",
        addedBy: "Receptionist",
    },
    {
        id: "PAY-1003",
        patient: "Robert Brown",
        type: "payment",
        source: "check",
        amount: 500.00,
        appliedAmount: 0.00,
        remainingAmount: 500.00,
        received: "2024-05-15",
        checkNumber: "CHK-9988",
        addedBy: "Admin",
    },
];

export default function PatientPayments({ patientId }: { patientId: string }) {
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
    });

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="px-0 pt-0 pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle>Patient Payments</CardTitle>
                    <AddPaymentDialog patientId={patientId} />
                </div>
            </CardHeader>
            <CardContent className="px-0">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter payments..."
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
                            {table.getRowModel().rows?.length ? (
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
                <div className="py-4">
                    <TablePagination table={table} />
                </div>
            </CardContent>
        </Card>
    );
}
