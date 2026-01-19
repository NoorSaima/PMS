import { ClaimData } from "./columns";

export const data: ClaimData[] = [
    {
        id: "CLM001",
        name: "John Doe",
        dpb: "2024-01-15",
        type: "Professional",
        totalCharge: 1500.00,
        totalPaid: 1000.00,
        totalAdjustments: 200.00,
        balance: 300.00,
        providerName: "Dr. Smith",
        payerName: "Blue Cross",
        facilityName: "General Hospital",
        status: "Paid"
    },
    {
        id: "CLM002",
        name: "Jane Smith",
        dpb: "2024-01-16",
        type: "Institutional",
        totalCharge: 5000.00,
        totalPaid: 0.00,
        totalAdjustments: 0.00,
        balance: 5000.00,
        providerName: "Dr. Adams",
        payerName: "Medicare",
        facilityName: "City Medical Center",
        status: "Pending"
    },
    {
        id: "CLM003",
        name: "Robert Brown",
        dpb: "2024-01-10",
        type: "Professional",
        totalCharge: 250.00,
        totalPaid: 250.00,
        totalAdjustments: 0.00,
        balance: 0.00,
        providerName: "Dr. Lee",
        payerName: "Aetna",
        facilityName: "Downtown Clinic",
        status: "Denied"
    },
    {
        id: "CLM004",
        name: "Emily White",
        dpb: "2024-01-18",
        type: "Institutional",
        totalCharge: 12000.00,
        totalPaid: 5000.00,
        totalAdjustments: 1000.00,
        balance: 6000.00,
        providerName: "Dr. Smith",
        payerName: "UnitedHealthcare",
        facilityName: "General Hospital",
        status: "Paid"
    },
    {
        id: "CLM005",
        name: "Michael Green",
        dpb: "2024-01-20",
        type: "Professional",
        totalCharge: 450.00,
        totalPaid: 0.00,
        totalAdjustments: 0.00,
        balance: 450.00,
        providerName: "Dr. Jones",
        payerName: "Cigna",
        facilityName: "Valley Health",
        status: "Draft"
    },
];
