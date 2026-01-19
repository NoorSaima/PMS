
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const session = await getToken({
        req: req,
        secret: process.env.AUTH_SECRET,
    });

    if (!session || !session.accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const priorAuthId = searchParams.get("PriorAuthID");
    const deleteBy = searchParams.get("DeleteBy") || session.id;

    if (!priorAuthId) {
        return NextResponse.json({ message: "PriorAuthID is required" }, { status: 400 });
    }

    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/api/Patients/DeletePatientPriorAuthorization?PriorAuthID=${priorAuthId}&DeleteBy=${deleteBy}`,
            {
                method: "DELETE", // Assuming DELETE method based on naming, but user query had params in URL which usually implies GET or DELETE with params. Standard REST is DELETE.
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            return NextResponse.json(
                { message: "Failed to delete prior authorization", error: errorData },
                { status: response.status }
            );
        }

        // The user provided example shows a JSON response: { "message": "Prior Authorization Deleted successfully." }
        const data = await response.json().catch(() => ({ message: "Prior Authorization Deleted successfully." }));

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error deleting patient prior auth:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
