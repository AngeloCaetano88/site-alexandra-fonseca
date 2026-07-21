import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { getOAuthClient } from "@/lib/google-calendar";

export async function GET(request: Request) {
  await requireAdmin();

  const origin = new URL(request.url).origin;
  const oauthClient = getOAuthClient(origin);

  const url = oauthClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
  });

  return NextResponse.redirect(url);
}
