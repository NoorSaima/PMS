import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    try {
        const session = await getToken({
            req: req,
            secret: process.env.AUTH_SECRET,
        });

        if (!session || !session.accessToken || !session.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();

        // Append the user ID as 'addedBy' if not already present (or override it to be safe)
        // User instruction: "addedBy (in api use that id)" - likely means usage of session user id.
        formData.append("addedBy", session.id as string);

        // Verify required fields
        const requiredFields = ['file', 'practiceId', 'patientUID', 'documentType'];
        for (const field of requiredFields) {
            if (!formData.has(field)) {
                return NextResponse.json({
                    success: false,
                    message: `Missing required field: ${field}`
                }, { status: 400 });
            }
        }

        const apiUrl = `${process.env.API_BASE_URL}/api/Patients/AddPatientDocument`;

        // We use fetch directly because CommonApi forces Content-Type: application/json
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                // Do NOT set Content-Type header when sending FormData; 
                // fetch/browser will set it with the boundary automatically.
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("AddPatientDocument failed:", data);
            return NextResponse.json({
                success: false,
                message: data.message || "Failed to upload document",
                debug: {
                    status: response.status,
                    apiUrl,
                    response: data
                }
            }, { status: response.status });
        }

        return NextResponse.json({
            success: true,
            data: data,
            message: "Document uploaded successfully"
        });

    } catch (error: any) {
        console.error("Add document API Error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
