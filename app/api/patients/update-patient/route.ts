import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PUT(request: Request) {
  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  if (!session || !session.accessToken || !session.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();

  interface UpdatePatientPayload {
    PatientPID: string;
    LastName: string;
    FirstName: string;
    MiddleName: string;
    Suffix: string;
    Gender: number;
    DOB: string;
    DOD: string | null;
    SSN: string;
    PatientType: string;
    Address: string;
    City: string;
    State: string;
    ZipCode: string;
    CellNo: string;
    HomeCellNo: string;
    Email: string;
    Ethnicity: string;
    Language: string;
    Race: string;
    ImagePath: string | null;
    CompanyID: string;
    UpdateBy: string;
  }

  const payload: UpdatePatientPayload = {
    PatientPID: body.PatientPID,
    LastName: body.LastName,
    FirstName: body.FirstName,
    MiddleName: body.MiddleName,
    Suffix: body.Suffix,
    Gender: body.Gender,
    DOB: body.DOB,
    DOD: body.DOD,
    SSN: body.SSN,
    PatientType: body.PatientType,
    Address: body.Address,
    City: body.City,
    State: body.State,
    ZipCode: body.ZipCode,
    CellNo: body.CellNo,
    HomeCellNo: body.HomeCellNo,
    Email: body.Email,
    Ethnicity: body.Ethnicity,
    Language: body.Language,
    Race: body.Race,
    ImagePath: body.ImagePath || null,
    CompanyID: session.companyId,
    UpdateBy: session.id,
  };

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/Patients/EditPatients`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
      }
    );
    
    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { message: "Failed to update patient", error: errorData },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Patient updated successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
