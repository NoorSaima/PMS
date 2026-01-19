"use client"

import * as React from "react"
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
} from "@tanstack/react-table"
import { getColumns, DataProps } from "./columns"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPractices } from '@/store/slices/practiceSlice';
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { data } from "./data"
import TablePagination from "./table-pagination"

interface PatientListProps {
  onViewPatient: (patient: DataProps) => void;
  searchQuery?: string;
}

const PatientList: React.FC<PatientListProps> = ({ onViewPatient, searchQuery = "" }) => {

  const [patients, setPatients] = React.useState<DataProps[]>([]);
  const [isFetchingPatients, setIsFetchingPatients] = React.useState(false);

  const dispatch = useAppDispatch();
  const { selectedPractice, status } = useAppSelector((state) => state.practice);
  const isLoading = status === 'loading';

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPractices());
    }
  }, [dispatch, status]);

  const fetchPatients = React.useCallback(async () => {
    if (!selectedPractice?.PracticeID) {
      console.log("No practice selected, skipping patient fetch");
      return;
    }

    setIsFetchingPatients(true);
    try {
      const res = await fetch(`/api/patients/get-patient-list?PracticeId=${selectedPractice.PracticeID}`);
      const json = await res.json();
      console.log("Fetched patients:", json);

      // Transform API response to match DataProps structure
      const transformedPatients: DataProps[] = json.map((patient: any) => ({
        ID: patient.PatientUID?.toString() || '',
        Name: `${patient.FirstName} ${patient.MiddleName ? patient.MiddleName + ' ' : ''}${patient.LastName}`.trim(),
        DOB: patient.DOB || '',
        PID: patient.PatientPID || '',
        CellPhone: patient.CellNo || '',
        Gender: patient.Gender === 1 ? 'Male' : patient.Gender === 2 ? 'Female' : 'Other',
        status: patient.Status === 'Active' ? 'Active' : 'In Active',

        // Raw fields
        PatientUID: patient.PatientUID,
        PatientPID: patient.PatientPID,
        LastName: patient.LastName,
        FirstName: patient.FirstName,
        MiddleName: patient.MiddleName,
        Address: patient.Address || '',
        Email: patient.Email,
        CellNo: patient.CellNo || '',
        Suffix: patient.Suffix || '',

        action: null
      }));

      setPatients(transformedPatients);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
      setPatients([]);
    } finally {
      setIsFetchingPatients(false);
    }
  }, [selectedPractice?.PracticeID]);

  const handleDeletePatient = async (patient: DataProps) => {
    if (!confirm(`Are you sure you want to delete patient ${patient.Name}?`)) {
      return;
    }

    try {
      const response = await fetch(
        `/api/patients/delete-patient?PatientPID=${patient.PatientPID}&flag=1`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete patient");
      }

      toast.success("Patient deleted successfully");
      fetchPatients();
    } catch (error: any) {
      console.error("Error deleting patient:", error);
      toast.error(error.message || "Failed to delete patient");
    }
  };

  React.useEffect(() => {
    if (isLoading) return;
    fetchPatients();
  }, [selectedPractice?.PracticeID, isLoading, fetchPatients]);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = React.useMemo(() => getColumns(onViewPatient, handleDeletePatient), [onViewPatient]);

  // Filter data based on search query
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return patients;

    const query = searchQuery.toLowerCase();
    return patients.filter(patient =>
      patient.Name.toLowerCase().includes(query) ||
      patient.PID.toLowerCase().includes(query) ||
      patient.CellPhone.toLowerCase().includes(query)
    );
  }, [searchQuery, patients]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 px-5">
        <div className="flex-1 text-xl font-medium text-default-900">Patient List</div>
        <div className="flex-none">
          <Input
            placeholder="Filter Status..."
            value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("status")?.setFilterValue(event.target.value)
            }
            className="max-w-sm "
          />
        </div>
      </div>

      <Table>
        <TableHeader className="bg-default-200">
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
                )
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
      <TablePagination table={table} />
    </div>
  )
}
export default PatientList;