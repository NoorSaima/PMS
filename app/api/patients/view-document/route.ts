import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });

        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const documentId = searchParams.get("documentId");

        if (!documentId) {
            return NextResponse.json({ success: false, message: "Document ID is required" }, { status: 400 });
        }

        const apiUrl = `${process.env.API_BASE_URL}/api/Patients/ViewDocument?documentId=${documentId}`;

        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.accessToken}`,
            },
        });

        if (!res.ok) {
            console.error("Failed to fetch document from external API", res.status, res.statusText);
            return NextResponse.json({ success: false, message: "Failed to fetch document" }, { status: res.status });
        }

        const isDownload = searchParams.get("download") === "true";
        const contentDisposition = isDownload ? "attachment" : "inline";

        const headers = new Headers();
        headers.set("Content-Type", res.headers.get("Content-Type") || "application/octet-stream");
        headers.set("Content-Disposition", contentDisposition);
        headers.set("Content-Length", res.headers.get("Content-Length") || "");

        return new NextResponse(res.body, {
            status: 200,
            headers: headers,
        });

    } catch (error: any) {
        console.error("Error viewing document:", error);
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}
