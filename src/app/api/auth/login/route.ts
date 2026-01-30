import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { SESSION_COOKIE_MAX_AGE, SESSION_COOKIE_NAME } from "@/lib/auth/cookies";

export async function POST(request: Request) {
  console.log("ADMIN ENV", {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    hasKey: !!process.env.FIREBASE_PRIVATE_KEY
  });
  const { idToken } = (await request.json()) as { idToken?: string };
  if (!idToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const expiresIn = SESSION_COOKIE_MAX_AGE * 1000;
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_COOKIE_MAX_AGE
  });
  return response;
}
