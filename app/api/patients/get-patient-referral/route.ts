import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    const refferType = searchParams.get("refferType");

    if (!patientId) {
        return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
    }

    if (!refferType) {
        return NextResponse.json({ message: "Referral Type is required" }, { status: 400 });
    }

    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/api/Patients/GetPatientReffer?PatientId=${patientId}&RefferType=${refferType}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                cache: 'no-store',
            }
        );

        const data = await response.json();
        console.log("Patient Referral API Response:", data);

        if (!response.ok) {
            return NextResponse.json(
                { message: "Failed to fetch patient referrals", error: data },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: "An error occurred while fetching patient referrals", error: error.message },
            { status: 500 }
        );
    }
}
