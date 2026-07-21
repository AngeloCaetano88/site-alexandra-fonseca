import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe, hasStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!hasStripe) {
    return NextResponse.json(
      { error: "Pagamentos ainda não estão configurados." },
      { status: 503 }
    );
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const programId = typeof body?.programId === "string" ? body.programId : "";
  if (!programId) {
    return NextResponse.json({ error: "Programa inválido." }, { status: 400 });
  }

  const program = await prisma.program.findUnique({ where: { id: programId } });
  if (!program || !program.active) {
    return NextResponse.json({ error: "Programa indisponível." }, { status: 404 });
  }

  const origin = new URL(request.url).origin;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: session.user.email ?? undefined,
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: program.name,
            description: program.description,
          },
          unit_amount: program.priceCents,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: session.user.id,
      programId: program.id,
    },
    success_url: `${origin}/dashboard/programas/sucesso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/dashboard/programas?canceled=1`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
