import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { subscribeToNewsletter } from "@/lib/mailchimp";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Indica um email válido." }, { status: 400 });
  }

  const session = await auth();

  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: {},
    create: { email, userId: session?.user?.id },
  });

  try {
    await subscribeToNewsletter(email);
  } catch (error) {
    // Member may already exist on Mailchimp's side, or the sync may fail —
    // the subscription is already saved locally either way.
    console.error("Failed to sync newsletter subscriber to Mailchimp", error);
  }

  return NextResponse.json({ message: "Subscrição confirmada!" });
}
