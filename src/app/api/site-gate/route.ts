import { NextResponse } from "next/server";
import { SITE_GATE_COOKIE, safeEqual, siteAccessToken } from "@/lib/site-gate";

/** Unlock the site for 30 days after the correct password. */
export async function POST(request: Request) {
  let password = "";
  try {
    const body = await request.json();
    if (typeof body?.password === "string") password = body.password;
  } catch {
    password = "";
  }

  const expected = await siteAccessToken();
  const given = await siteAccessToken(password);
  if (!safeEqual(expected, given)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SITE_GATE_COOKIE, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
