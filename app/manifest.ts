import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alexandra Fonseca — Coach Desportivo",
    short_name: "80/20 Coach",
    description:
      "Coaching desportivo profissional com o método 80/20 — planos de treino, avaliações e acompanhamento personalizado.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F6F8",
    theme_color: "#0B1F3A",
    icons: [],
  };
}
