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

    interface AddPatientPayload {
        patientId: string;
        FirstName: string;
        MiddleName: string;
        Suffix: string;
        Gender: number;
        DOB: string;
        City: string;
        State: string;
        ZipCode: string;
        CellNo: string;
        Address: string;
        CompanyID: string;
        PracticeId: string;
        AddedBy: string;
    }

    const payload: AddPatientPayload = {
        LastName: body.lastName,
        FirstName: body.firstName,
        MiddleName: body.middleName,
        Suffix: body.mi,
        Gender: body.gender === "male" ? 1 : body.gender === "female" ? 2 : 0,
        DOB: body.birthDate,
        City: body.city,
        State: body.state,
        ZipCode: body.zip,
        CellNo: body.cellPhone,
        Address: body.addressLine1,
        CompanyID: session.companyId,
        PracticeId: body.practiceId,
        AddedBy: session.id
    }

    try {
        const response = await CommonApi(
            `${process.env.API_BASE_URL}/api/Patients/AddPatients`,
            "POST",
            session?.accessToken,
            payload,
            "Patient"
        );
        const data = response.data;
        console.log(data)
        if (!response.success) {
            return NextResponse.json({ message: "Failed to add Patient" });
        }
        return NextResponse.json({ data });

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

