import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { hashPassword } from "../lib/password";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const [adminPasswordHash, ruiPasswordHash, martaPasswordHash] =
    await Promise.all([
      hashPassword("admin12345"),
      hashPassword("rui12345678"),
      hashPassword("marta12345678"),
    ]);

  const admin = await prisma.user.upsert({
    where: { email: "admin@alexandrafonseca.pt" },
    update: { passwordHash: adminPasswordHash },
    create: {
      name: "Alexandra Fonseca",
      email: "admin@alexandrafonseca.pt",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      locale: "PT",
      phone: "+351 910 000 000",
    },
  });

  const rui = await prisma.user.upsert({
    where: { email: "rui.almeida@example.com" },
    update: { passwordHash: ruiPasswordHash },
    create: {
      name: "Rui Almeida",
      email: "rui.almeida@example.com",
      passwordHash: ruiPasswordHash,
      role: "CLIENT",
      locale: "PT",
      athleteProfile: {
        create: {
          weightKg: 82,
          heightCm: 186,
          sport: "Voleibol",
          goals: "Aumentar impulsão vertical e reduzir dor no joelho.",
        },
      },
    },
    include: { athleteProfile: true },
  });

  const marta = await prisma.user.upsert({
    where: { email: "marta.sousa@example.com" },
    update: { passwordHash: martaPasswordHash },
    create: {
      name: "Marta Sousa",
      email: "marta.sousa@example.com",
      passwordHash: martaPasswordHash,
      role: "CLIENT",
      locale: "PT",
      athleteProfile: {
        create: {
          weightKg: 61,
          heightCm: 170,
          sport: "Atletismo · 400m",
          goals: "Melhorar tempo de prova e consistência de treino.",
        },
      },
    },
    include: { athleteProfile: true },
  });

  const programs = await Promise.all(
    [
      {
        name: "Performance Elite",
        slug: "performance-elite",
        durationWeeks: 12,
        description: "Pico de força e potência para competição.",
        priceCents: 48000,
      },
      {
        name: "Atleta Completo",
        slug: "atleta-completo",
        durationWeeks: 16,
        description:
          "Desenvolvimento físico integral: força, velocidade, mobilidade.",
        priceCents: 56000,
      },
      {
        name: "Pré-Época",
        slug: "pre-epoca",
        durationWeeks: 8,
        description: "Base física sólida antes do arranque competitivo.",
        priceCents: 32000,
      },
      {
        name: "Recuperação",
        slug: "recuperacao",
        durationWeeks: 6,
        description:
          "Retorno seguro ao treino após lesão, com progressão controlada.",
        priceCents: 26000,
      },
    ].map((program) =>
      prisma.program.upsert({
        where: { slug: program.slug },
        update: {},
        create: program,
      })
    )
  );

  const [performanceElite, , , recuperacao] = programs;

  const enrollment = await prisma.enrollment.create({
    data: {
      userId: rui.id,
      programId: performanceElite.id,
      startDate: new Date("2026-05-04"),
      status: "ACTIVE",
      workouts: {
        create: [
          {
            date: new Date("2026-05-04"),
            title: "Semana 1 — Adaptação anatómica",
            exercises: [
              { name: "Agachamento livre", sets: 3, reps: 12 },
              { name: "Prancha", sets: 3, duration: "45s" },
              { name: "Remada com halteres", sets: 3, reps: 10 },
            ],
            completed: true,
          },
          {
            date: new Date("2026-05-11"),
            title: "Semana 2 — Adaptação anatómica",
            exercises: [
              { name: "Agachamento livre", sets: 3, reps: 14 },
              { name: "Prancha lateral", sets: 3, duration: "40s" },
              { name: "Peso morto romeno", sets: 3, reps: 10 },
            ],
            completed: true,
          },
          {
            date: new Date("2026-07-27"),
            title: "Semana 12 — Transferência para potência",
            exercises: [
              { name: "Agachamento com salto", sets: 4, reps: 6 },
              { name: "Sprint 20m", sets: 5, reps: 1 },
              { name: "Prancha com elevação", sets: 3, duration: "50s" },
            ],
            completed: false,
          },
        ],
      },
    },
  });

  await prisma.enrollment.create({
    data: {
      userId: marta.id,
      programId: recuperacao.id,
      startDate: new Date("2026-04-01"),
      endDate: new Date("2026-05-13"),
      status: "COMPLETED",
    },
  });

  if (rui.athleteProfile) {
    await prisma.evaluation.createMany({
      data: [
        {
          athleteProfileId: rui.athleteProfile.id,
          date: new Date("2026-05-04"),
          strengthKg: 80,
          speedSeconds: 4.6,
          mobilityScore: 6,
          notes: "Avaliação inicial.",
        },
        {
          athleteProfileId: rui.athleteProfile.id,
          date: new Date("2026-06-08"),
          strengthKg: 98,
          speedSeconds: 4.3,
          mobilityScore: 7,
          notes: "Boa progressão a meio do bloco.",
        },
        {
          athleteProfileId: rui.athleteProfile.id,
          date: new Date("2026-07-13"),
          strengthKg: 115,
          speedSeconds: 4.1,
          mobilityScore: 8,
          notes: "Evolução clara em força máxima.",
        },
      ],
    });
  }

  await prisma.booking.createMany({
    data: [
      {
        userId: rui.id,
        name: rui.name,
        email: rui.email,
        service: "Sessão de Acompanhamento",
        date: new Date("2026-07-24T10:30:00"),
        status: "CONFIRMED",
      },
      {
        name: "João Pereira",
        email: "joao.pereira@example.com",
        phone: "+351 920 000 000",
        service: "Avaliação Física Inicial",
        date: new Date("2026-07-27T09:00:00"),
        status: "PENDING",
      },
    ],
  });

  await prisma.payment.createMany({
    data: [
      {
        enrollmentId: enrollment.id,
        amountCents: performanceElite.priceCents,
        method: "STRIPE",
        status: "PAID",
        externalRef: "pi_mock_1",
        createdAt: new Date("2026-05-04"),
      },
      {
        enrollmentId: enrollment.id,
        amountCents: performanceElite.priceCents,
        method: "STRIPE",
        status: "PENDING",
        externalRef: "pi_mock_2",
        createdAt: new Date("2026-07-20"),
      },
    ],
  });

  await prisma.resource.createMany({
    data: [
      {
        programId: performanceElite.id,
        title: "Técnica de agachamento — vídeo demonstrativo",
        type: "VIDEO",
        url: "https://example.com/videos/agachamento-tecnica.mp4",
      },
      {
        programId: performanceElite.id,
        title: "Plano de treino completo (PDF)",
        type: "DOCUMENT",
        url: "https://example.com/downloads/performance-elite-plano.pdf",
      },
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        senderId: admin.id,
        recipientId: rui.id,
        body: "Olá Rui! Vi os teus últimos treinos — ótima progressão no agachamento. Vamos subir a carga na próxima semana.",
        createdAt: new Date("2026-07-14T09:00:00"),
        readAt: new Date("2026-07-14T12:00:00"),
      },
      {
        senderId: rui.id,
        recipientId: admin.id,
        body: "Combinado! Sinto-me bem mais forte, obrigado pelo acompanhamento.",
        createdAt: new Date("2026-07-14T13:30:00"),
        readAt: new Date("2026-07-14T14:00:00"),
      },
      {
        senderId: admin.id,
        recipientId: rui.id,
        body: "Não te esqueças da avaliação marcada para dia 24 — traz roupa confortável para os testes de velocidade.",
        createdAt: new Date("2026-07-20T18:00:00"),
      },
    ],
  });

  const articles = [
    {
      slug: "periodizacao-pre-epoca",
      title: "Periodização de pré-época: por onde começar",
      excerpt:
        "Como estruturar as primeiras 8 semanas de treino para chegar à competição sem lesões e com uma base sólida.",
      category: "Força",
      readTimeMinutes: 6,
      publishedAt: new Date("2026-06-02"),
      body: [
        "A pré-época é o período mais importante do ano para construir a base física que vai sustentar toda a competição. Sem uma progressão bem planeada, o risco de lesão nas primeiras semanas de treino intenso aumenta significativamente.",
        "Divido normalmente este bloco em três fases: adaptação anatómica (2 semanas), acumulação de força (4 semanas) e transferência para potência específica (2 semanas). Cada fase tem objetivos claros e critérios de progressão baseados em avaliações, não em calendário fixo.",
        "O erro mais comum que vejo é acelerar a intensidade antes do tecido conjuntivo estar preparado. Paciência nas primeiras semanas paga-se em resiliência nas últimas.",
      ].join("\n\n"),
    },
    {
      slug: "recuperacao-entre-sessoes",
      title: "Recuperação entre sessões: o que realmente importa",
      excerpt:
        "Sono, nutrição e gestão de carga — as três variáveis que mais influenciam a tua capacidade de treinar consistentemente.",
      category: "Recuperação",
      readTimeMinutes: 5,
      publishedAt: new Date("2026-05-18"),
      body: [
        "Recuperação não é um luxo, é parte do treino. Um atleta que treina bem mas recupera mal está, na prática, a travar o próprio progresso.",
        "As três variáveis com maior impacto são, por esta ordem: qualidade e quantidade de sono, ingestão proteica distribuída ao longo do dia, e gestão da carga total semanal (não só do treino, mas do stress geral).",
        "Ferramentas como monitorização de frequência cardíaca em repouso ou questionários simples de perceção de fadiga são suficientes para a maioria dos atletas — não é preciso tecnologia complexa para tomar boas decisões.",
      ].join("\n\n"),
    },
    {
      slug: "nutricao-dia-de-jogo",
      title: "Nutrição no dia de jogo: antes, durante e depois",
      excerpt:
        "Um guia prático para chegar à competição com os depósitos de energia certos e recuperar mais rápido no dia seguinte.",
      category: "Nutrição",
      readTimeMinutes: 4,
      publishedAt: new Date("2026-04-30"),
      body: [
        "A estratégia nutricional do dia de jogo começa 24 horas antes, com a reposição completa de glicogénio muscular através de hidratos de carbono de boa qualidade.",
        "Na refeição pré-competição, o objetivo é manter os níveis de energia estáveis sem sobrecarregar a digestão — normalmente 3 a 4 horas antes do início, com uma opção mais ligeira nos 60 minutos finais se necessário.",
        "Depois do esforço, a janela das primeiras duas horas é a mais eficiente para repor glicogénio e iniciar a reparação muscular: hidratos de carbono e proteína na mesma refeição.",
      ].join("\n\n"),
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        ...article,
        authorId: admin.id,
        status: "PUBLISHED",
      },
    });
  }

  const firstArticle = await prisma.article.findUnique({
    where: { slug: "periodizacao-pre-epoca" },
  });
  if (firstArticle) {
    await prisma.comment.create({
      data: {
        articleId: firstArticle.id,
        userId: rui.id,
        body: "Muito útil! Já apliquei a divisão em fases no meu próprio plano de pré-época.",
      },
    });
  }

  await prisma.testimonial.createMany({
    data: [
      {
        name: "Rui Almeida",
        sport: "Voleibol · Sénior",
        quote:
          "Em três meses ganhei impulsão vertical e deixei de sentir dores no joelho durante os jogos.",
        rating: 5,
      },
      {
        name: "Marta Sousa",
        sport: "Atletismo · 400m",
        quote:
          "O acompanhamento semanal fez toda a diferença na minha época — treinos objetivos, sem desperdício.",
        rating: 5,
      },
      {
        name: "FC Angústias — Sub-18",
        sport: "Futebol · Equipa",
        quote:
          "Os relatórios de equipa ajudaram-nos a planear a pré-época com muito mais precisão.",
        rating: 5,
      },
    ],
  });

  await prisma.faq.createMany({
    data: [
      {
        question: "Preciso de ter experiência prévia com treino de força?",
        answer:
          "Não. Todos os programas começam com uma avaliação física inicial que define o ponto de partida real, independentemente do teu nível atual.",
        order: 0,
      },
      {
        question: "Qual a diferença entre coaching individual e online?",
        answer:
          "O coaching individual é presencial, com supervisão direta em cada sessão. O coaching online mantém o mesmo rigor de planeamento, mas o treino é executado autonomamente com apoio de vídeos e feedback à distância.",
        order: 1,
      },
      {
        question: "Com que frequência são feitas as avaliações físicas?",
        answer:
          "Normalmente a cada 6 a 8 semanas, alinhadas com o fim de cada bloco de treino.",
        order: 2,
      },
    ],
  });

  await prisma.newsletterSubscriber.upsert({
    where: { email: "marta.sousa@example.com" },
    update: {},
    create: { email: "marta.sousa@example.com", userId: marta.id },
  });
  await prisma.newsletterSubscriber.upsert({
    where: { email: "interessado@example.com" },
    update: {},
    create: { email: "interessado@example.com" },
  });

  console.log("Seed concluído.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
