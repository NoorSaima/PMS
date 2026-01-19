import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { CommonApi } from "@/lib/api/apiHelper";

export async function DELETE(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });

        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { documentId } = body;

        if (!documentId) {
            return NextResponse.json({ success: false, message: "Document ID is required" }, { status: 400 });
        }

        // The external API expects DeleteBy (UserId) as a query parameter
        const deleteBy = token.id as string;

        const apiUrl = `${process.env.API_BASE_URL}/api/Patients/DeletePatientDocuments?DocumentID=${documentId}&DeleteBy=${deleteBy}`;

        const res = await CommonApi(
            apiUrl,
            "DELETE", // Using DELETE as per plan, assuming external API supports it or CommonApi handles it
            token.accessToken
        );

        return NextResponse.json(res);

    } catch (error: any) {
        console.error("Error deleting document:", error);
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}
