"use client";

import React from "react";
import { DayPicker } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface CalendarSidebarProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    className?: string;
    viewRange?: { start: Date; end: Date } | null;
}

const CalendarSidebar = ({
    date,
    setDate,
    className,
    viewRange,
}: CalendarSidebarProps) => {
    const modifiers: any = viewRange
        ? {
            highlighted: {
                from: viewRange.start,
                to: new Date(viewRange.end.getTime() - 24 * 60 * 60 * 1000), // Subtract 1 day because FullCalendar end is exclusive
            },
        }
        : {};

    return (
        <div className={cn("w-full md:w-[300px] flex-shrink-0 space-y-4", className)}>
            <Card className="border-none shadow-sm bg-background">
                <CardContent className="p-0">
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        modifiers={modifiers}
                        modifiersStyles={{
                            highlighted: {
                                backgroundColor: "hsl(var(--primary))",
                                color: "hsl(var(--primary-foreground))",
                                opacity: 0.9,
                                borderRadius: "0",
                            },
                        }}
                        className="w-full !m-0 p-3"
                        classNames={{
                            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
                            month: "space-y-4 w-full",
                            caption: "flex justify-center pt-1 relative items-center mb-2",
                            caption_label: "text-sm font-medium",
                            nav: "space-x-1 flex items-center",
                            nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity",
                            nav_button_previous: "absolute left-1",
                            nav_button_next: "absolute right-1",
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex w-full",
                            head_cell:
                                "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem]",
                            row: "flex w-full mt-2",
                            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 flex-1 flex items-center justify-center",
                            day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                            day_selected:
                                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-md",
                            day_today: "bg-accent/50 text-accent-foreground font-semibold",
                            day_outside: "text-muted-foreground opacity-30",
                            day_disabled: "text-muted-foreground opacity-50",
                            day_range_middle:
                                "aria-selected:bg-accent aria-selected:text-accent-foreground",
                            day_hidden: "invisible",
                        }}
                    />
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-background">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Facility</Label>
                        <Select defaultValue="all">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Facility" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Facilities</SelectItem>
                                <SelectItem value="main">Main Clinic</SelectItem>
                                <SelectItem value="north">North Wing</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Providers</Label>
                        <RadioGroup defaultValue="all">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="r1" />
                                <Label htmlFor="r1">All Providers</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="specific" id="r2" />
                                <Label htmlFor="r2">Select Provider</Label>
                            </div>
                        </RadioGroup>

                        <Select>
                            <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Choose Provider..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="smith">Dr. Smith</SelectItem>
                                <SelectItem value="jones">Dr. Jones</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CalendarSidebar;
