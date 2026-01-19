import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { CommonApi } from "@/lib/api/apiHelper";

export async function POST(request: Request) {
    const session = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET
    });

    if (!session || !session.accessToken || !session.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const body = await request.json();

    // Construct the payload matching the user's requirements
    const payload = {
        PatientID: body.PatientID,
        PaymentCategory: body.PaymentCategory || "1",
        PaymentType: body.PaymentType,
        CopayDOS: body.CopayDOS || null,
        PaymentSource: body.PaymentSource,
        CheckNumber: body.CheckNumber || "",
        PaymentAmount: parseFloat(body.PaymentAmount),
        ReceivedDate: body.ReceivedDate,
        DepositDate: body.DepositDate,
        ClearanceDate: body.ClearanceDate,
        Memo: body.Memo,
        SendReceipt: body.SendReceipt,
        AddedBy: session.id, // Overwrite with session ID for security/accuracy
        IpAddress: request.headers.get("x-forwarded-for") || "127.0.0.1", // Attempt to get IP
        Remarks: body.Remarks || "",
        PracticeId: body.PracticeId || "",
        CompanyId: body.CompanyId || ""
    };

    try {
        const response = await CommonApi(
            `${process.env.API_BASE_URL}/api/Payment/AddPatientPayment`,
            "POST",
            session?.accessToken,
            payload,
            "Payment"
        );

        const data = response.data;

        if (!response.success) {
            return NextResponse.json({ message: response.message || "Failed to add Payment" }, { status: 400 });
        }

        return NextResponse.json({ data });

    } catch (error) {
        console.error("Error adding payment:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
