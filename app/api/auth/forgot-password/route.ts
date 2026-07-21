import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import { generateResetToken } from "@/lib/tokens";

const GENERIC_RESPONSE = {
  message:
    "Se existir uma conta com este email, vais receber um link para repor a password.",
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email) {
    return NextResponse.json({ error: "Indica um email." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const { rawToken, tokenHash } = generateResetToken();
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const resetUrl = `${new URL(request.url).origin}/redefinir-password/${rawToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);
  }

  return NextResponse.json(GENERIC_RESPONSE);
}
