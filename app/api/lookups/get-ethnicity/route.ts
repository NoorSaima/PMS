import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { CommonApi } from "@/lib/api/apiHelper";

export async function GET(request: Request) {
  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  if (!session || !session.accessToken || !session.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {

    const response = await CommonApi(
      `${process.env.API_BASE_URL}/api/Patients/GetEthnicity`,
      "GET",
      session?.accessToken,
      undefined,
      "Ethnicity"
    );
    const data = response.data;
    if (!response.success) {
      return NextResponse.json({ message: "Failed to get ethnicity list" });
    }
    return NextResponse.json( data );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
