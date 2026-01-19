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

// Dummy facility data
const DUMMY_FACILITIES = [
    {
        id: "2AE20B3F-C476-46A8-9230-B37754897D57",
        name: "Test MEMORIAL HERMANN HEALTH SYST",
        code: "FAC001",
        address: "Houston Medical Center, Texas",
    },
    {
        id: "2AE20B3F-C476-46A8-9230-B37754897D57",
        name: "City General Hospital",
        code: "FAC002",
        address: "Downtown Healthcare District",
    },
    {
        id: "2AE20B3F-C476-46A8-9230-B37754897D57",
        name: "Sunrise Medical Center",
        code: "FAC003",
        address: "North Campus Medical Facility",
    },
];

interface FacilitySelectorProps {
    value?: string; // Facility name (for display)
    onSelect: (facilityId: string, facilityName: string) => void;
}

export default function FacilitySelector({ value, onSelect }: FacilitySelectorProps) {
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
                    {value || "Select facility..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search facility..." />
                    <CommandEmpty>No facility found.</CommandEmpty>
                    <CommandGroup className="max-h-[300px] overflow-y-auto">
                        {DUMMY_FACILITIES.map((facility) => (
                            <CommandItem
                                key={facility.id}
                                value={facility.name}
                                onSelect={() => {
                                    onSelect(facility.id, facility.name);
                                    setOpen(false);
                                }}
                                className="cursor-pointer"
                            >
                                <div className="flex flex-col gap-1 flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">{facility.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {facility.code}
                                        </span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {facility.address}
                                    </div>
                                </div>
                                <Check
                                    className={cn(
                                        "ml-2 h-4 w-4",
                                        value === facility.name ? "opacity-100" : "opacity-0"
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
