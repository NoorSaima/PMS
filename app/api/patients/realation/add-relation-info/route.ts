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

    interface AddRelationPayload {
        PatientPID: string;
        LastName: string;
        FirstName: string;
        MiddleName: string;
        Address: string;
        City: string;
        State: string;
        Zipcode: string;
        Email: string;
        CellNo: string;
        RelationtoEC: string;
        AddedBy: string;
    }

    const payload: AddRelationPayload = {
        PatientPID: body.PatientPID,
        LastName: body.LastName,
        FirstName: body.FirstName,
        MiddleName: body.MiddleName,
        Address: body.Address,
        City: body.City,
        State: body.State,
        Zipcode: body.Zipcode,
        Email: body.Email,
        CellNo: body.CellNo,
        RelationtoEC: body.RelationtoEC,
        AddedBy: session.id
    }

    try {
        const response = await CommonApi(
            `${process.env.API_BASE_URL}/api/Patients/AddPatientRelations`,
            "POST",
            session?.accessToken,
            payload,
            "Relations"
        );
        const data = response.data;
        console.log(data)
        if (!response.success) {
            return NextResponse.json({ message: "Failed to add Patient Relation" });
        }
        return NextResponse.json({ data });

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
