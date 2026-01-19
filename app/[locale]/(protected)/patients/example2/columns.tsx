"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  ColumnDef,
} from "@tanstack/react-table"
import { Eye, SquarePen, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";

export type DataProps = {
  ID: string;
  Name: string;
  DOB: string;
  DOD?: string;
  PID: string;
  CellPhone: string;
  Gender: string;
  status: "Active" | "In Active";
  // Raw fields from API
  PatientUID: number;
  PatientPID: string;
  LastName: string;
  FirstName: string;
  MiddleName: string;
  Address: string;
  Email: string | null;
  CellNo: string;
  Suffix: string;

  action: React.ReactNode;
}
export const getColumns = (
  onViewPatient: (patient: DataProps) => void,
  onDeletePatient?: (patient: DataProps) => void
): ColumnDef<DataProps>[] => [
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
      accessorKey: "ID",
      header: "ID",
      cell: ({ row }) => <span>{row.getValue("ID")}</span>,
    },
    {
      accessorKey: "Name",
      header: "Name",
      cell: ({ row }) => <span>{row.getValue("Name")}</span>,
    },
    {
      accessorKey: "DOB",
      header: "DOB",
      cell: ({ row }) => <span>{row.getValue("DOB")}</span>,
    },
    // {
    //   accessorKey: "SSN",
    //   header: "SSN",
    //   cell: ({ row }) => {
    //     return (
    //       <span>{row.getValue("SSN")}</span>
    //     )
    //   }
    // },
    // {
    //   accessorKey: "PID",
    //   header: "PID",
    //   cell: ({ row }) => {
    //     return (
    //       <span>{row.getValue("PID")}</span>
    //     )
    //   }
    // },
    // {
    //   accessorKey: "HomePhone",
    //   header: "Home Phone",
    //   cell: ({ row }) => {
    //     return (
    //       <span>{row.getValue("HomePhone")}</span>
    //     )
    //   }
    // },
    {
      accessorKey: "CellPhone",
      header: "Cell Phone",
      cell: ({ row }) => {
        return (
          <span>{row.getValue("CellPhone")}</span>
        )
      }
    },
    {
      accessorKey: "Gender",
      header: "Gender",
      cell: ({ row }) => {
        return (
          <span>{row.getValue("Gender")}</span>
        )
      }
    },
    {
      accessorKey: "Address",
      header: "Address",
      cell: ({ row }) => {
        return (
          <span className="truncate max-w-[200px] block" title={row.getValue("Address")}>
            {row.getValue("Address")}
          </span>
        )
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusColors: Record<string, string> = {
          Active: "bg-success/20 text-success",
          InActive: "bg-destructive/20 text-destructive",
        };
        const status = row.getValue<string>("status");
        const statusStyles = statusColors[status] || "default";
        return (
          <Badge
            className={cn("rounded-full px-5", statusStyles)}
          >{status} </Badge>
        );
      }
    },
    {
      id: "actions",
      accessorKey: "action",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300  text-default-400"
                    color="secondary"
                    onClick={() => onViewPatient(row.original)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300  text-default-400"
                    color="secondary"
                  >
                    <SquarePen className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300  text-default-400"
                    color="secondary"
                    onClick={() => onDeletePatient?.(row.original)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-destructive text-destructive-foreground">
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )
      }
    }
  ]