export type Service = {
  title: string;
  desc: string;
  points: string[];
};

export const services: Service[] = [
  {
    title: "Coaching Individual",
    desc: "Programa 100% personalizado, presencial, com avaliação contínua de força, mobilidade e recuperação.",
    points: [
      "Avaliação física inicial",
      "Plano de treino semanal",
      "Acompanhamento direto",
    ],
  },
  {
    title: "Coaching Online",
    desc: "Treino à distância com vídeos técnicos, feedback semanal e ajustes de plano em tempo real.",
    points: ["App de treino", "Vídeos demonstrativos", "Feedback semanal"],
  },
  {
    title: "Equipas",
    desc: "Planeamento de época, periodização de treino e relatórios de performance coletivos.",
    points: [
      "Planeamento de época",
      "Relatórios de equipa",
      "Avaliações periódicas",
    ],
  },
];

export type Program = {
  name: string;
  duration: string;
  goal: string;
};

export const programs: Program[] = [
  {
    name: "Performance Elite",
    duration: "12 semanas",
    goal: "Pico de força e potência para competição.",
  },
  {
    name: "Atleta Completo",
    duration: "16 semanas",
    goal: "Desenvolvimento físico integral: força, velocidade, mobilidade.",
  },
  {
    name: "Pré-Época",
    duration: "8 semanas",
    goal: "Base física sólida antes do arranque competitivo.",
  },
  {
    name: "Recuperação",
    duration: "6 semanas",
    goal: "Retorno seguro ao treino após lesão, com progressão controlada.",
  },
];

export type Testimonial = {
  name: string;
  sport: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rui Almeida",
    sport: "Voleibol · Sénior",
    quote:
      "Em três meses ganhei impulsão vertical e deixei de sentir dores no joelho durante os jogos.",
  },
  {
    name: "Marta Sousa",
    sport: "Atletismo · 400m",
    quote:
      "O acompanhamento semanal fez toda a diferença na minha época — treinos objetivos, sem desperdício.",
  },
  {
    name: "FC Angústias — Sub-18",
    sport: "Futebol · Equipa",
    quote:
      "Os relatórios de equipa ajudaram-nos a planear a pré-época com muito mais precisão.",
  },
];

export type Result = {
  label: string;
  before: string;
  after: string;
  pct: string;
};

export const results: Result[] = [
  {
    label: "Força (agachamento)",
    before: "80kg",
    after: "115kg",
    pct: "+44%",
  },
  { label: "Velocidade (30m)", before: "4.6s", after: "4.1s", pct: "-11%" },
  { label: "Impulsão vertical", before: "42cm", after: "56cm", pct: "+33%" },
];
