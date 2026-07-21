# Alexandra Fonseca — Coach Desportivo (80/20)

Website institucional e plataforma de gestão (dashboard de cliente + painel
administrativo) para a coach desportiva Alexandra Fonseca.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (tokens de design em `app/globals.css`)
- Prisma ORM + PostgreSQL
- NextAuth.js, Stripe/PayPal, Google Calendar, Resend, Mailchimp (fases seguintes)

## Estrutura

```
app/                  # rotas (App Router)
components/marketing/ # secções do site público (Hero, Programas, ...)
components/dashboard/ # UI do dashboard do cliente
components/admin/     # UI do painel administrativo
components/ui/        # componentes base partilhados
lib/                  # utilitários, cliente Prisma
prisma/               # schema.prisma e migrações
```

## Desenvolvimento

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npx prisma studio # explorar a base de dados
```

Copia `.env.example` para `.env` e preenche as chaves antes de correr
funcionalidades que dependem de serviços externos (Stripe, Google, Mailchimp, etc.).

## Design system

| Nome | Hex | Token Tailwind |
|---|---|---|
| Azul Escuro (navy) | `#0B1F3A` | `navy` |
| Azul Elétrico | `#1565C0` | `electric` |
| Cinza Claro (fog) | `#F4F6F8` | `fog` |
| Verde Performance | `#00C853` | `performance-green` |

Tipografia: Poppins (`font-display`, títulos) + Inter (`font-sans`, corpo/UI).

## Fases de construção

1. ✅ Setup (Next.js, Tailwind, Prisma, estrutura de pastas, tokens)
2. Site público estático (dados mock)
3. Base de dados e modelos (schema Prisma completo + seed)
4. Autenticação (NextAuth)
5. Dashboard do cliente
6. Painel administrativo
7. Pagamentos (Stripe, PayPal, MBWay)
8. Calendário e marcações (Google Calendar)
9. Blog e newsletter (Mailchimp)
10. Multi-idioma, SEO final e auditoria de performance/acessibilidade
