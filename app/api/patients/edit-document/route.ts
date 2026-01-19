import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function PUT(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });

        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();

        // Append updatedBy from session
        formData.append("updatedBy", token.id as string);

        const keys = Array.from(formData.keys());
        console.log("Edit Document Payload Keys:", keys);
        console.log("Edit Document ID:", formData.get("documentId"));
        console.log("Edit Document Type:", formData.get("documentType"));

        // Validate required fields (at least ID is needed)
        const documentId = formData.get("documentId");
        if (!documentId) {
            return NextResponse.json({ success: false, message: "Document ID is required" }, { status: 400 });
        }

        const apiUrl = `${process.env.API_BASE_URL}/api/Patients/EditPatientDocument`;

        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token.accessToken}`,
                // Do not set Content-Type header when sending FormData; 
                // fetch will automatically set it with the boundary
            },
            body: formData,
        });

        const text = await response.text();
        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch {
            console.error("Failed to parse external API response", text);
            data = { Success: false, Message: "Invalid response from external API" };
        }

        console.log("External Edit API Response:", data);

        // Check for various success indicators:
        // 1. explicit "Success" boolean (common in some endpoints)
        // 2. "message" containing "successfully" (fallback for endpoints returning just a message)
        const isSuccess = data.Success === true ||
            data.success === true ||
            (data.message && data.message.toLowerCase().includes("successfully"));

        if (!response.ok || !isSuccess) {
            return NextResponse.json({ success: false, message: data.Message || data.message || "Failed to edit document" }, { status: response.status });
        }

        return NextResponse.json({ success: true, data: data.Data || data });

    } catch (error: any) {
        console.error("Error editing document:", error);
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}
