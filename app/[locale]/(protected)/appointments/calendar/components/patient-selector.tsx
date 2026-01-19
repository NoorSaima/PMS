"use client";

import React, { useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy patient data
const DUMMY_PATIENTS = [
    {
        id: "b5b2c3d4-e5f6-7890-abcd-ef1234567890",
        patientId: "5001",
        name: "Ahmed Ali",
        dob: "1985-03-15",
        address: "123 Main Street, Karachi",
    },
    {
        id: "b8d3d4e5-f6a7-8901-bcde-f12345678901",
        patientId: "5002",
        name: "Laraib Khan",
        dob: "1990-07-22",
        address: "456 Park Avenue, Lahore",
    },
    {
        id: "d9d4e5f6-a7b8-9012-cdef-123456789012",
        patientId: "5003",
        name: "Ali Hassan",
        dob: "1978-11-30",
        address: "789 Garden Road, Islamabad",
    },
    {
        id: "g4e5f6a7-b8c9-0123-def1-234567890123",
        patientId: "5004",
        name: "Ayesha Malik",
        dob: "1995-05-18",
        address: "321 Lake View, Faisalabad",
    },
    {
        id: "h5f6a7b8-c9d0-1234-ef12-345678901234",
        patientId: "5005",
        name: "Usman Raza",
        dob: "1988-09-25",
        address: "654 River Side, Multan",
    },
];

interface PatientSelectorProps {
    value?: string; // Patient name (for display)
    onSelect: (patientId: string, patientName: string) => void;
}

export default function PatientSelector({ value, onSelect }: PatientSelectorProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between hover:bg-accent hover:text-accent-foreground"
                >
                    {value || "Select patient..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search patient..." />
                    <CommandEmpty>No patient found.</CommandEmpty>
                    <CommandGroup className="max-h-[300px] overflow-y-auto">
                        {DUMMY_PATIENTS.map((patient) => (
                            <CommandItem
                                key={patient.id}
                                value={patient.name}
                                onSelect={() => {
                                    onSelect(patient.id, patient.name);
                                    setOpen(false);
                                }}
                                className="cursor-pointer"
                            >
                                <div className="flex flex-col gap-1 flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">{patient.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            ID: {patient.patientId}
                                        </span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        DOB: {patient.dob}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {patient.address}
                                    </div>
                                </div>
                                <Check
                                    className={cn(
                                        "ml-2 h-4 w-4",
                                        value === patient.name ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
