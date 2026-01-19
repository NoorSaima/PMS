import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    try {
        const session = await getToken({ req, secret: process.env.AUTH_SECRET });
        if (!session || !session.accessToken) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const API_BASE_URL = process.env.API_BASE_URL;
        const response = await fetch(`${API_BASE_URL}/api/Claims/GetClaimLineStatus`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            },
        });

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
