
"use client";

import React, { useState } from "react";
import PatientClaimsList, { Claim } from "./patient-claims-list";
import ProfessionalClaimDetails from "./professional-claim-details";
import InstitutionalClaimDetails from "./institutional-claim-details";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Dummy Data moved to Manager for specialized filtering
const CLAIMS_DATA: Claim[] = [
    {
        id: "CLM-2023-001",
        createdDate: "2023-11-15",
        type: "Professional",
        ref: "REF12345",
        status: "Paid",
        totalCharge: 350.00,
        totalPaid: 300.00,
        balance: 50.00,
        renderingProvider: "Dr. John Smith",
        billingProvider: "City Medical Group",
        supervisingProvider: "Dr. Sarah Jones",
        facility: "Main Clinic",
        payerName: "Blue Cross Blue Shield",
        payerId: "BCBS01",
        policyNumber: "POL998877",
        diagnosisCodes: ["E11.9", "I10"],
        lines: [
            { fromDate: "2023-11-15", toDate: "2023-11-15", cpt: "99213", units: 1, price: 150.00, paid: 120.00, dxPointer: "1" },
            { fromDate: "2023-11-15", toDate: "2023-11-15", cpt: "85025", units: 1, price: 200.00, paid: 180.00, dxPointer: "1,2" },
        ]
    },
    {
        id: "CLM-2023-002",
        createdDate: "2023-12-01",
        type: "Institutional",
        ref: "INST98765",
        status: "Pending",
        totalCharge: 5500.00,
        totalPaid: 0.00,
        balance: 5500.00,
        renderingProvider: "General Hospital",
        billingProvider: "General Hospital Billing",
        facility: "General Hospital",
        payerName: "Medicare",
        payerId: "MC01",
        policyNumber: "MED112233",
        patientReason: { code: "R07.9", description: "Chest pain, unspecified" },
        lines: [
            { revCode: "0110", description: "Room & Board - Private", rate: 2000.00, units: 2, charge: 4000.00 },
            { revCode: "0250", description: "Pharmacy", rate: 500.00, units: 3, charge: 1500.00 },
        ],
        otherDiagnosis: [
            { code: "I20.9", description: "Angina pectoris, unspecified" }
        ],
        otherProcedures: [
            { code: "02HV33Z", description: "Insertion of Infusion Device into Superior Vena Cava", date: "2023-12-01" }
        ]
    },
    {
        id: "CLM-2023-003",
        createdDate: "2023-12-10",
        type: "Professional",
        ref: "REF54321",
        status: "Denied",
        totalCharge: 150.00,
        totalPaid: 0.00,
        balance: 150.00,
        renderingProvider: "Dr. Emily White",
        billingProvider: "City Medical Group",
        facility: "Westside Clinic",
        payerName: "Aetna",
        payerId: "AET01",
        policyNumber: "AET445566",
        diagnosisCodes: ["J01.90"],
        lines: [
            { fromDate: "2023-12-10", toDate: "2023-12-10", cpt: "99214", units: 1, price: 150.00, paid: 0.00, dxPointer: "1" },
        ]
    },
    {
        id: "CLM-2023-004",
        createdDate: "2023-12-12",
        type: "Professional",
        ref: "REF88888",
        status: "Paid",
        totalCharge: 120.00,
        totalPaid: 120.00,
        balance: 0.00,
        renderingProvider: "Dr. John Smith",
        billingProvider: "City Medical Group",
        facility: "Main Clinic",
        payerName: "UnitedHealthcare",
        diagnosisCodes: ["Z00.00"],
        lines: []
    }
];

export default function PatientClaimsManager() {
    const [selectedClaim, setSelectedClaim] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("all");

    const handleCloseDetails = () => setSelectedClaim(null);

    const getFilteredClaims = () => {
        if (activeTab === "all") return CLAIMS_DATA;
        if (activeTab === "professional") return CLAIMS_DATA.filter(c => c.type === "Professional");
        if (activeTab === "institutional") return CLAIMS_DATA.filter(c => c.type === "Institutional");
        return CLAIMS_DATA;
    };

    const counts = {
        all: CLAIMS_DATA.length,
        professional: CLAIMS_DATA.filter(c => c.type === "Professional").length,
        institutional: CLAIMS_DATA.filter(c => c.type === "Institutional").length
    };

    return (
        <div className="space-y-6">
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-[500px] mb-6">
                    <TabsTrigger value="all">
                        All Claims
                        <Badge color="secondary" className="ml-2 bg-slate-200 text-slate-700 text-[10px] h-5 px-1.5">{counts.all}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="professional">
                        Professional
                        <Badge color="secondary" className="ml-2 bg-slate-200 text-slate-700 text-[10px] h-5 px-1.5">{counts.professional}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="institutional">
                        Institutional
                        <Badge color="secondary" className="ml-2 bg-slate-200 text-slate-700 text-[10px] h-5 px-1.5">{counts.institutional}</Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                    <PatientClaimsList
                        claims={getFilteredClaims()}
                        onSelectClaim={setSelectedClaim}
                    />
                </TabsContent>
                <TabsContent value="professional" className="mt-0">
                    <PatientClaimsList
                        claims={getFilteredClaims()}
                        onSelectClaim={setSelectedClaim}
                    />
                </TabsContent>
                <TabsContent value="institutional" className="mt-0">
                    <PatientClaimsList
                        claims={getFilteredClaims()}
                        onSelectClaim={setSelectedClaim}
                    />
                </TabsContent>
            </Tabs>

            {selectedClaim?.type === "Professional" && (
                <ProfessionalClaimDetails
                    claim={selectedClaim}
                    isOpen={!!selectedClaim}
                    onClose={handleCloseDetails}
                />
            )}

            {selectedClaim?.type === "Institutional" && (
                <InstitutionalClaimDetails
                    claim={selectedClaim}
                    isOpen={!!selectedClaim}
                    onClose={handleCloseDetails}
                />
            )}
        </div>
    );
}
