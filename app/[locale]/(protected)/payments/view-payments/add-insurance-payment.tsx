"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const AddInsurancePayment = () => {
    const [checkDate, setCheckDate] = React.useState<Date>();
    const [depositDate, setDepositDate] = React.useState<Date>();
    const [clearanceDate, setClearanceDate] = React.useState<Date>();

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Add Insurance Payment</CardTitle>
                <CardDescription>Enter the details for the new insurance payment.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="payment-by">Payment By</Label>
                            <Input id="payment-by" placeholder="e.g. United Healthcare" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-from">Payment From</Label>
                            <Input id="payment-from" placeholder="Payer Name / ID" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="payment-amount">Payment Amount</Label>
                            <Input id="payment-amount" placeholder="$0.00" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reference">Reference / Ref #</Label>
                            <Input id="reference" placeholder="Check #, EFT Ref, etc." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="source">Source</Label>
                            <Select>
                                <SelectTrigger id="source">
                                    <SelectValue placeholder="Select Source" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cheque">Cheque</SelectItem>
                                    <SelectItem value="eft">Electronic Funds Transfer (EFT)</SelectItem>
                                    <SelectItem value="credit-card">Credit Card</SelectItem>
                                    <SelectItem value="cash">Cash</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2 flex flex-col">
                            <Label>Received Check Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !checkDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {checkDate ? format(checkDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={checkDate}
                                        onSelect={setCheckDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2 flex flex-col">
                            <Label>Deposit Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !depositDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {depositDate ? format(depositDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={depositDate}
                                        onSelect={setDepositDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2 flex flex-col">
                            <Label>Clearance Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !clearanceDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {clearanceDate ? format(clearanceDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={clearanceDate}
                                        onSelect={setClearanceDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Payment</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AddInsurancePayment;
