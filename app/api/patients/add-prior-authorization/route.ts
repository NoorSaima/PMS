import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { CommonApi } from "@/lib/api/apiHelper";

export async function POST(request: Request) {
    const session = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET
    });

    if (!session || !session.accessToken || !session.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const body = await request.json();

    interface AddPriorAuthorizationPayload {
        PatientId: string;
        InsuranceId: string;
        RefferType: string;
        StartDate: string;
        EndDate: string;
        AuthorizationNumber: string;
        VisitsAuthorized: number;
        VisitsRemaining: number;
        VisitsUsed: number;
        ShowAlert: boolean;
        ShowAlertDaysBefore: number;
        Notes: string;
        Status: string;
        AddedBy: string;
        ICDCodes: string[];
        CPTCodes: string[];
    }

    const payload: AddPriorAuthorizationPayload = {
        PatientId: body.patientId,
        InsuranceId: body.insuranceId,
        RefferType: body.refferType,
        StartDate: body.startDate,
        EndDate: body.endDate,
        AuthorizationNumber: body.authorizationNumber,
        VisitsAuthorized: body.visitsAuthorized,
        VisitsRemaining: body.visitsRemaining,
        VisitsUsed: body.visitsUsed,
        ShowAlert: body.showAlert,
        ShowAlertDaysBefore: body.showAlertDaysBefore,
        Notes: body.notes,
        Status: body.status,
        AddedBy: session.id,
        ICDCodes: body.icdCodes,
        CPTCodes: body.cptCodes
    };

    try {
        const response = await CommonApi(
            `${process.env.API_BASE_URL}/api/Patients/AddPatientPriorAuthorization`,
            "POST",
            session?.accessToken,
            payload,
            "Prior Authorization"
        );

        const data = response.data;
        console.log("Prior Authorization Response:", data);

        if (!response.success) {
            return NextResponse.json(
                { message: "Failed to add Prior Authorization" },
                { status: 400 }
            );
        }

        return NextResponse.json({ data });

    } catch (error) {
        console.error("Error adding prior authorization:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
