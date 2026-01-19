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

    const payload = {
        PatientId: body.PatientId,
        RefferedToFirstName: body.RefferedToFirstName,
        RefferedToLastName: body.RefferedToLastName,
        RefferedToMiddleName: body.RefferedToMiddleName || "",
        RefferedToSuffix: body.RefferedToSuffix || "",
        ConsultationType: body.ConsultationType,
        ReasonforReferrel: body.ReasonforReferrel,
        RefferedByFirstName: body.RefferedByFirstName,
        RefferedByLastName: body.RefferedByLastName,
        RefferedByMiddleName: body.RefferedByMiddleName || "",
        RefferedBySuffix: body.RefferedBySuffix || "",
        Date: body.Date, // Expecting ISO string or similar valid date format
        AddedBy: session.id,
        RefferType: body.RefferType || 1 // Default to 1 (Incoming?) if not provided
    };

    try {
        const response = await CommonApi(
            `${process.env.API_BASE_URL}/api/Patients/AddPatientReferral`,
            "POST",
            session?.accessToken,
            payload,
            "Referral",
            { cache: 'no-store' }
        );

        const data = response.data;

        console.log(data)

        if (!response.success) {
            return NextResponse.json({ message: response.message || "Failed to add Referral" }, { status: 400 });
        }

        return NextResponse.json({ data });

    } catch (error) {
        console.error("Error adding referral:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
