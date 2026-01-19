import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/getServerSession";
import { CommonApi } from "@/lib/api/apiHelper";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function POST(req: NextRequest) {
    try {
        // Retrieve access token from server-side auth
        const token = await getAccessToken();

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Missing access token' },
                { status: 401 }
            );
        }

        // Parse request body - expecting the full claim submission payload
        const body = await req.json();

        // Validate required fields for professional claim submission
        if (!body.fileid || !body.claim || !Array.isArray(body.claim) || body.claim.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Missing required fields: fileid and claim array'
                },
                { status: 400 }
            );
        }

        // Validate each claim in the array
        for (const claim of body.claim) {
            if (!claim.payerid || !claim.prov_npi || !claim.pat_name_f || !claim.pat_name_l) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'Each claim must have payerid, prov_npi, pat_name_f, and pat_name_l'
                    },
                    { status: 400 }
                );
            }
        }

        // Use the request body as-is since it matches the expected API format
        const requestBody = body;

        // Check if API base URL is configured
        if (!apiBaseUrl) {
            return NextResponse.json(
                { success: false, message: 'API base URL not configured' },
                { status: 500 }
            );
        }

        // Call external API
        const apiUrl = `${apiBaseUrl}/api/ClaimSubmission/SubmitProfessionalClaim`;
        const response = await CommonApi(apiUrl, "POST", token, requestBody, "ClaimSubmission");

        // Return response
        return NextResponse.json(
            {
                success: response.success,
                message: response.message || (response.success ? 'Professional claim submitted successfully' : 'Failed to submit professional claim'),
                data: response.data
            },
            { status: response.success ? 200 : 400 }
        );

    } catch (error: any) {
        console.error('SubmitProfessionalClaim API Error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error',
                error: error.message
            },
            { status: 500 }
        );
    }
}
