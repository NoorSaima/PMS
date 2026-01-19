import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Get the full JWT with accessToken, refreshToken, etc.
    const session = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET
    });

    const API_BASE_URL = process.env.API_BASE_URL;
    const response = await fetch(`${API_BASE_URL}/api/Users/GetUserPracticeList?UserId=573fe460-06ab-44fd-a3f4-f9a70ccfd5ad`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.accessToken}`
        },
    });
    const data = await response.json();
    return NextResponse.json(data);
}
