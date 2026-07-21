import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  if (!resend) {
    console.log(`[email] RESEND_API_KEY não definido — link de reset para ${to}: ${resetUrl}`);
    return;
  }

  await resend.emails.send({
    from: "Alexandra Fonseca <geral@alexandrafonseca.pt>",
    to,
    subject: "Repõe a tua password",
    html: `
      <p>Recebemos um pedido para repor a tua password.</p>
      <p><a href="${resetUrl}">Clica aqui para escolher uma nova password</a>. Este link expira em 1 hora.</p>
      <p>Se não pediste isto, podes ignorar este email.</p>
    `,
  });
}
