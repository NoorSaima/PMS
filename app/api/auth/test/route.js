import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Get the full JWT with accessToken, refreshToken, etc.
  const token = await getToken({ 
    req: request,
    secret: process.env.AUTH_SECRET 
  });
  return NextResponse.json(token);
}


// "use client";
// import { useSession } from "next-auth/react";

// export default function Component() {
//   const { data: session } = useSession(); // Returns session object (no tokens)
//   return <div>{session?.user.name}</div>;
// }

// import { auth } from "@/lib/auth";

// export default async function Page() {
//   const session = await auth(); // Returns session object (no tokens)
//   return <div>{session?.user.name}</div>;
// }