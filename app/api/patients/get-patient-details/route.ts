import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  if (!session || !session.accessToken || !session.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);

  const PatientID = searchParams.get("PatientID");

  if (!PatientID) {
    return NextResponse.json(
      { error: "Provide PatientID" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/Patients/GetPatientDetail?PatientID=${PatientID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
         cache: 'no-store',
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ message: "Failed to get patient Details" });
    }
    return NextResponse.json( data );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
