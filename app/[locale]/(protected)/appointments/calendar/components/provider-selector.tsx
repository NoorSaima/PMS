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

// Dummy provider/resource data
const DUMMY_PROVIDERS = [
    {
        id: "D1A09E04-50EA-40E1-9D17-635593CF8C31",
        name: "DUSTIN YOUNGG",
        specialty: "Cardiologist",
        code: "DOC001",
    },
    {
        id: "D1A09E04-50EA-40E1-9D17-635593CF8C31",
        name: "Dr. Sarah Johnson",
        specialty: "Pediatrician",
        code: "DOC002",
    },
    {
        id: "D1A09E04-50EA-40E1-9D17-635593CF8C31",
        name: "Dr. Ahmed Khan",
        specialty: "Orthopedic Surgeon",
        code: "DOC003",
    },
    {
        id: "D1A09E04-50EA-40E1-9D17-635593CF8C31",
        name: "Dr. Maria Garcia",
        specialty: "Dermatologist",
        code: "DOC004",
    },
];

interface ProviderSelectorProps {
    value?: string; // Provider name (for display)
    onSelect: (providerId: string, providerName: string) => void;
}

export default function ProviderSelector({ value, onSelect }: ProviderSelectorProps) {
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
                    {value || "Select provider..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search provider..." />
                    <CommandEmpty>No provider found.</CommandEmpty>
                    <CommandGroup className="max-h-[300px] overflow-y-auto">
                        {DUMMY_PROVIDERS.map((provider) => (
                            <CommandItem
                                key={provider.id}
                                value={provider.name}
                                onSelect={() => {
                                    onSelect(provider.id, provider.name);
                                    setOpen(false);
                                }}
                                className="cursor-pointer"
                            >
                                <div className="flex flex-col gap-1 flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">{provider.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {provider.code}
                                        </span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {provider.specialty}
                                    </div>
                                </div>
                                <Check
                                    className={cn(
                                        "ml-2 h-4 w-4",
                                        value === provider.name ? "opacity-100" : "opacity-0"
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
