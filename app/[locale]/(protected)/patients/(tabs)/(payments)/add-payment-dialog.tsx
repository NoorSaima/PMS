"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddPaymentDialogProps {
    patientId: string;
}

export default function AddPaymentDialog({ patientId }: AddPaymentDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [amount, setAmount] = useState("");
    const [paymentType, setPaymentType] = useState("Payment"); // Capitalized to match example if needed, but example has "Copay"
    const [source, setSource] = useState("Credit Card");
    const [checkNumber, setCheckNumber] = useState("");
    const [receivedDate, setReceivedDate] = useState(new Date().toISOString().split('T')[0]);
    const [depositDate, setDepositDate] = useState("");
    const [clearanceDate, setClearanceDate] = useState("");
    const [copayDos, setCopayDos] = useState("");
    const [memo, setMemo] = useState("");
    const [remarks, setRemarks] = useState("");
    const [sendReceipt, setSendReceipt] = useState(true);

    const handleSave = async () => {
        if (!amount || !source || !paymentType) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsLoading(true);

        const payload = {
            PatientID: patientId,
            PaymentCategory: "1",
            PaymentType: paymentType,
            CopayDOS: paymentType === "Copay" ? copayDos : null,
            PaymentSource: source,
            CheckNumber: source === "Check" ? checkNumber : "",
            PaymentAmount: amount, // API route handles parsing
            ReceivedDate: receivedDate,
            DepositDate: depositDate || null,
            ClearanceDate: clearanceDate || null,
            Memo: memo,
            SendReceipt: sendReceipt,
            Remarks: remarks,
            PracticeId: "", // Default as per requirement
            CompanyId: ""   // Default as per requirement
        };

        try {
            const response = await fetch("/api/patients/payment/add-patient-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to add payment");
            }

            toast.success("Payment added successfully");
            setOpen(false);
            // Optionally refresh list here if parent allows or via global state
            resetForm();

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setAmount("");
        setPaymentType("Payment");
        setSource("Credit Card");
        setCheckNumber("");
        setReceivedDate(new Date().toISOString().split('T')[0]);
        setDepositDate("");
        setClearanceDate("");
        setCopayDos("");
        setMemo("");
        setRemarks("");
        setSendReceipt(true);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Payment
                </Button>
            </DialogTrigger>
            <DialogContent size="lg" className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Add Payment</DialogTitle>
                    <DialogDescription>
                        Enter the payment details below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    {/* Top Row: Amount & Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Amount *</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="receivedDate">Received Date</Label>
                            <Input
                                id="receivedDate"
                                type="date"
                                value={receivedDate}
                                onChange={(e) => setReceivedDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Second Row: Payment Type & Source */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Payment Type</Label>
                            <RadioGroup
                                value={paymentType}
                                onValueChange={setPaymentType}
                                className="flex gap-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Payment" id="type-payment" />
                                    <Label htmlFor="type-payment">Payment</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Copay" id="type-copay" />
                                    <Label htmlFor="type-copay">Copay</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="grid gap-2">
                            <Label>Source</Label>
                            <RadioGroup
                                value={source}
                                onValueChange={setSource}
                                className="flex gap-4 flex-wrap"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Credit Card" id="source-credit" />
                                    <Label htmlFor="source-credit">Credit Card</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Check" id="source-check" />
                                    <Label htmlFor="source-check">Check</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Cash" id="source-cash" />
                                    <Label htmlFor="source-cash">Cash</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Conditional Fields */}
                    {paymentType === "Copay" && (
                        <div className="grid gap-2">
                            <Label htmlFor="copayDos">Copay DOS</Label>
                            <Input
                                id="copayDos"
                                type="date"
                                value={copayDos}
                                onChange={(e) => setCopayDos(e.target.value)}
                            />
                        </div>
                    )}

                    {source === "Check" && (
                        <div className="grid gap-2">
                            <Label htmlFor="checkNumber">Check Number</Label>
                            <Input
                                id="checkNumber"
                                placeholder="Check Number"
                                value={checkNumber}
                                onChange={(e) => setCheckNumber(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Additional Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="depositDate">Deposit Date</Label>
                            <Input
                                id="depositDate"
                                type="date"
                                value={depositDate}
                                onChange={(e) => setDepositDate(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="clearanceDate">Clearance Date</Label>
                            <Input
                                id="clearanceDate"
                                type="date"
                                value={clearanceDate}
                                onChange={(e) => setClearanceDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Memo & Remarks */}
                    <div className="grid gap-2">
                        <Label htmlFor="memo">Memo</Label>
                        <Textarea
                            id="memo"
                            placeholder="Add a note..."
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="remarks">Remarks</Label>
                        <Textarea
                            id="remarks"
                            placeholder="Additional remarks..."
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </div>

                    {/* Send Receipt */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="sendReceipt"
                            checked={sendReceipt}
                            onCheckedChange={(checked: boolean) => setSendReceipt(checked as boolean)}
                        />
                        <label
                            htmlFor="sendReceipt"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Email receipt to patient
                        </label>
                    </div>

                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Payment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
