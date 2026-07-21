import { requireAdmin } from "@/lib/require-admin";
import { getOAuthClient } from "@/lib/google-calendar";

function htmlPage(title: string, body: string) {
  return new Response(
    `<!doctype html><html lang="pt"><head><meta charset="utf-8"><title>${title}</title>
    <style>body{font-family:system-ui,sans-serif;max-width:640px;margin:80px auto;padding:0 24px;color:#0B1F3A;line-height:1.6}
    code{background:#F4F6F8;padding:2px 8px;border-radius:6px;word-break:break-all;display:inline-block;margin:8px 0}
    a{color:#1565C0}</style></head>
    <body><h1>${title}</h1>${body}</body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function GET(request: Request) {
  await requireAdmin();

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return htmlPage(
      "Autorização cancelada",
      `<p>O Google devolveu o erro: <code>${error}</code>.</p>
       <p><a href="/admin/configuracoes">Voltar às configurações</a></p>`
    );
  }

  if (!code) {
    return htmlPage(
      "Pedido inválido",
      `<p>Não recebi nenhum código de autorização.</p>
       <p><a href="/admin/configuracoes">Voltar às configurações</a></p>`
    );
  }

  const oauthClient = getOAuthClient(url.origin);
  const { tokens } = await oauthClient.getToken(code);

  if (!tokens.refresh_token) {
    return htmlPage(
      "Sem refresh token",
      `<p>O Google não devolveu um refresh token — isto acontece se já autorizaste esta app antes.</p>
       <p>Vai a <a href="https://myaccount.google.com/permissions" target="_blank">myaccount.google.com/permissions</a>,
       remove o acesso desta aplicação, e tenta ligar de novo.</p>
       <p><a href="/admin/configuracoes">Voltar às configurações</a></p>`
    );
  }

  return htmlPage(
    "Google Calendar ligado",
    `<p>Copia este valor para a variável <code>GOOGLE_CALENDAR_REFRESH_TOKEN</code> no ficheiro <code>.env</code>
     e reinicia o servidor:</p>
     <code>${tokens.refresh_token}</code>
     <p>Depois disso, as novas marcações vão criar automaticamente eventos no teu Google Calendar.</p>
     <p><a href="/admin/configuracoes">Voltar às configurações</a></p>`
  );
}
