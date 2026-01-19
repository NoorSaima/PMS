import { CommonApi } from "@/lib/api/apiHelper";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function DELETE(request: Request) {
  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  if (!session || !session.accessToken || !session.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);

  const PatientPID = searchParams.get("PatientPID");
  const flag = searchParams.get("flag") || "1";

  if (!PatientPID) {
    return NextResponse.json(
      { error: "Provide PatientPID" },
      { status: 400 }
    );
  }

  try {
    // Get client IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "172.16.16.33";

    const response = await fetch(
      `${process.env.API_BASE_URL}/api/Patients/DeletePatient?PatientPID=${PatientPID}&DeleteBy=${session.id}&IpAddress=${ip}&Flag=${flag}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { message: "Failed to delete patient", error: errorData },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Patient deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
