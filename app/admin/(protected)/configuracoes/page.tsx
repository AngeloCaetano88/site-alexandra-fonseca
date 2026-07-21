import { hasGoogleCalendar } from "@/lib/google-calendar";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-1">Configurações</h1>
      <p className="text-sm text-[#3d4b63] mb-8">Integrações do painel administrativo.</p>

      <div className="rounded-2xl bg-white border border-black/5 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg">Google Calendar</h2>
          <span
            className={`text-xs font-semibold rounded-full px-3 py-1 ${
              hasGoogleCalendar
                ? "bg-performance-green/15 text-performance-green-dark"
                : "bg-black/5 text-[#8493ab]"
            }`}
          >
            {hasGoogleCalendar ? "Ligado" : "Não ligado"}
          </span>
        </div>
        <p className="text-sm text-[#3d4b63] mb-5">
          Quando ligado, cada nova marcação cria automaticamente um evento no
          teu Google Calendar (evento primário), e é removido se a marcação
          for cancelada.
        </p>
        {!hasGoogleCalendar && (
          <a
            href="/api/google-calendar/auth"
            className="inline-flex px-5 py-2.5 rounded-full bg-navy text-white font-semibold text-sm hover:bg-electric transition-colors"
          >
            Ligar Google Calendar
          </a>
        )}
      </div>
    </div>
  );
}
