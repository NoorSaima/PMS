import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function DELETE(req: Request) {
    const session = await getToken({
        req: req,
        secret: process.env.AUTH_SECRET,
    });

    if (!session || !session.accessToken || !session.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const patientReferralID = searchParams.get("patientReferralID");

    if (!patientReferralID) {
        return NextResponse.json({ message: "Patient Referral ID is required" }, { status: 400 });
    }

    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/api/Patients/DeletePatientReferral?PatientReferralID=${patientReferralID}&DeleteBy=${session.id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                cache: 'no-store',
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: "Failed to delete patient referral", error: data },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: "An error occurred while deleting patient referral", error: error.message },
            { status: 500 }
        );
    }
}
