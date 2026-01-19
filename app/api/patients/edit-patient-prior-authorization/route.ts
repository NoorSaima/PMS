
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getToken({
        req: req,
        secret: process.env.AUTH_SECRET,
    });

    if (!session || !session.accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        // Ensure UpdateBy is set
        if (!body.UpdateBy) {
            body.UpdateBy = session.id;
        }

        const response = await fetch(
            `${process.env.API_BASE_URL}/api/Patients/EditPatientPriorAuthorization`,
            {
                method: "PUT", // Assuming POST for update based on typical patterns, or PUT. User request implied body payload.
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                body: JSON.stringify(body),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: "Failed to update prior authorization", error: data },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error updating patient prior auth:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
