import { NextRequest, NextResponse } from "next/server";
import { CommonApi } from "@/lib/api/apiHelper";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
    try {
        const session = await getToken({
            req: request,
            secret: process.env.AUTH_SECRET,
        });
        if (!session || !session.accessToken || !session.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const apiUrl = `${process.env.API_BASE_URL}/api/Patients/GetConsultationType`;

        const response = await CommonApi(apiUrl, "GET", session.accessToken, undefined, "ConsultationType");

        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
