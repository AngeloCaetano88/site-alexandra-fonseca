import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

/**
 * Idempotently turns a completed Stripe Checkout Session into an Enrollment +
 * Payment. Called from both the success-page redirect (immediate feedback)
 * and the Stripe webhook (source of truth) — safe to call twice for the
 * same session.
 */
export async function reconcileCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return { status: "not_paid" as const };
  }

  const userId = session.metadata?.userId;
  const programId = session.metadata?.programId;
  if (!userId || !programId) {
    return { status: "missing_metadata" as const };
  }

  const existingPayment = await prisma.payment.findFirst({
    where: { externalRef: session.id },
  });
  if (existingPayment) {
    return { status: "already_reconciled" as const };
  }

  const program = await prisma.program.findUnique({ where: { id: programId } });
  if (!program) {
    return { status: "program_not_found" as const };
  }

  let enrollment = await prisma.enrollment.findFirst({
    where: { userId, programId, status: { in: ["ACTIVE", "COMPLETED"] } },
  });

  if (!enrollment) {
    enrollment = await prisma.enrollment.create({
      data: { userId, programId, startDate: new Date(), status: "ACTIVE" },
    });
  }

  await prisma.payment.create({
    data: {
      enrollmentId: enrollment.id,
      amountCents: session.amount_total ?? program.priceCents,
      currency: (session.currency ?? "eur").toUpperCase(),
      method: "STRIPE",
      status: "PAID",
      externalRef: session.id,
    },
  });

  return { status: "reconciled" as const, enrollmentId: enrollment.id };
}
