import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { CommonApi } from "@/lib/api/apiHelper";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });

        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const patientId = searchParams.get("patientId");
        const documentType = searchParams.get("documentType");

        if (!patientId) {
            return NextResponse.json({ success: false, message: "Patient ID is required" }, { status: 400 });
        }

        let apiUrl = `${process.env.API_BASE_URL}/api/Patients/GetPatientDocumentList?PatientId=${patientId}`;

        if (documentType && documentType !== "all") {
            apiUrl += `&DocumentType=${documentType}`;
        } else {
            // Fallback for "all" or specific handling if needed
        }

        const res = await CommonApi(
            apiUrl,
            "GET",
            token.accessToken,
            undefined,
            "Document List",
            { cache: 'no-store' }
        );


        console.log("External API Response:", JSON.stringify(res));
        return NextResponse.json(res);

    } catch (error: any) {
        console.error("Error fetching patient documents:", error);
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}
