"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import InsurancePayments from "./insurance-payments";
import PatientPayments from "./patient-payments";

interface PaymentTabsProps {
    patientId: string;
}

export default function PaymentTabs({ patientId }: PaymentTabsProps) {
    return (
        <Tabs defaultValue="patient-payments" className="w-full">
            <TabsList className="mb-4">
                <TabsTrigger value="insurance-payments">Insurance Payments</TabsTrigger>
                <TabsTrigger value="patient-payments">Patient Payments</TabsTrigger>
            </TabsList>
            <TabsContent value="insurance-payments">
                <InsurancePayments />
            </TabsContent>
            <TabsContent value="patient-payments">
                <PatientPayments patientId={patientId} />
            </TabsContent>
        </Tabs>
    );
}
