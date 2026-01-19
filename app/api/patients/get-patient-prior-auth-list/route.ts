import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const session = await getToken({
        req: req,
        secret: process.env.AUTH_SECRET,
    });

    if (!session || !session.accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get("patientId");

    if (!patientId) {
        return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
    }

    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/api/Patients/GetPatientPriorAuthList?PatientID=${patientId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: "Failed to fetch prior authorization list", error: data },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error fetching patient prior auth list:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
