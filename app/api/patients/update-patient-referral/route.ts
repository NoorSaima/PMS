import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PUT(req: Request) {
    const session = await getToken({
        req: req,
        secret: process.env.AUTH_SECRET,
    });

    if (!session || !session.accessToken || !session.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        // Add UpdateBy from session if not provided
        const payload = {
            ...body,
            UpdateBy: body.UpdateBy || session.id,
        };

        
        const response = await fetch(
            `${process.env.API_BASE_URL}/api/Patients/EditPatientReffer`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                body: JSON.stringify(payload),
                cache: 'no-store',
            }
        );

        const data = await response.json();
        
        console.log(data)
        if (!response.ok) {
            return NextResponse.json(
                { message: "Failed to update patient referral", error: data },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: "An error occurred while updating patient referral", error: error.message },
            { status: 500 }
        );
    }
}
