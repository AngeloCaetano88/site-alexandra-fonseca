"use client";

import { useEffect, useMemo, useState } from "react";

const serviceOptions = [
  "Avaliação Física Inicial",
  "Sessão de Acompanhamento",
  "Reunião Online",
];

const timeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

type DayOption = {
  date: Date;
  label: string;
  weekday: string;
};

function buildUpcomingWeekdays(count: number): DayOption[] {
  const days: DayOption[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (days.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      days.push({
        date: new Date(cursor),
        label: cursor.toLocaleDateString("pt-PT", {
          day: "2-digit",
          month: "short",
        }),
        weekday: cursor.toLocaleDateString("pt-PT", { weekday: "short" }),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function slotDateTime(day: DayOption, time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const dt = new Date(day.date);
  dt.setHours(hours, minutes, 0, 0);
  return dt;
}

export function BookingCalendar({ takenSlots }: { takenSlots: string[] }) {
  const takenTimestamps = useMemo(
    () => new Set(takenSlots.map((iso) => new Date(iso).getTime())),
    [takenSlots]
  );

  const [days, setDays] = useState<DayOption[]>([]);
  const [service, setService] = useState(serviceOptions[0]);
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDays(buildUpcomingWeekdays(10));
  }, []);

  const selectedDay = days[dayIndex];

  const availableSlots = useMemo(() => {
    if (!selectedDay) return [];
    return timeSlots.map((time) => ({
      time,
      taken: takenTimestamps.has(slotDateTime(selectedDay, time).getTime()),
    }));
  }, [selectedDay, takenTimestamps]);

  async function handleSubmit() {
    if (!selectedDay || !slot || !name.trim() || !email.trim()) return;
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        service,
        date: slotDateTime(selectedDay, slot).toISOString(),
      }),
    });
    const data = await res.json().catch(() => ({}));

    setSubmitting(false);

    if (!res.ok) {
      setError(data.error ?? "Não foi possível confirmar a marcação.");
      return;
    }

    setConfirmed(true);
  }

  if (confirmed && selectedDay && slot) {
    return (
      <div className="rounded-2xl border border-black/5 bg-fog p-8 text-center max-w-lg mx-auto">
        <div className="mx-auto w-12 h-12 rounded-full bg-performance-green/15 flex items-center justify-center mb-4">
          <span className="text-performance-green-dark text-xl">✓</span>
        </div>
        <h3 className="font-display font-bold text-xl mb-2">
          Pré-marcação recebida
        </h3>
        <p className="text-sm text-[#3d4b63] mb-6">
          {service} — {selectedDay.weekday}, {selectedDay.label} às {slot}.
          Vou confirmar contigo por email nas próximas horas.
        </p>
        <button
          onClick={() => {
            setConfirmed(false);
            setSlot(null);
            setName("");
            setEmail("");
            setPhone("");
          }}
          className="text-sm font-semibold text-electric hover:text-navy transition-colors"
        >
          Fazer outra marcação
        </button>
      </div>
    );
  }

  if (days.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center text-sm text-[#8493ab] py-16">
        A carregar disponibilidade…
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="font-display font-bold text-lg mb-4">1. Tipo de sessão</h2>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((option) => (
            <button
              key={option}
              onClick={() => setService(option)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                service === option
                  ? "bg-navy text-white"
                  : "bg-fog text-[#3d4b63] hover:bg-navy/10"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-display font-bold text-lg mb-4">2. Data</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((day, i) => (
            <button
              key={day.date.toISOString()}
              onClick={() => {
                setDayIndex(i);
                setSlot(null);
              }}
              className={`shrink-0 w-20 rounded-xl border px-3 py-3 text-center transition-colors ${
                dayIndex === i
                  ? "border-performance-green bg-navy text-white"
                  : "border-black/10 bg-white text-navy hover:border-electric/50"
              }`}
            >
              <div className="text-xs uppercase tracking-wide opacity-70">
                {day.weekday}
              </div>
              <div className="font-display font-bold text-sm mt-1">
                {day.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-display font-bold text-lg mb-4">3. Hora</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {availableSlots.map(({ time, taken }) => (
            <button
              key={time}
              disabled={taken}
              onClick={() => setSlot(time)}
              className={`rounded-xl px-3 py-3 text-sm font-semibold text-center transition-colors ${
                taken
                  ? "bg-black/5 text-[#b8c1cf] cursor-not-allowed line-through"
                  : slot === time
                  ? "bg-performance-green text-navy"
                  : "bg-fog text-navy hover:bg-navy/10"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {slot && (
        <div className="mb-8">
          <h2 className="font-display font-bold text-lg mb-4">4. Os teus dados</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
              className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefone (opcional)"
              className="sm:col-span-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
            />
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <button
        disabled={!slot || !name.trim() || !email.trim() || submitting}
        onClick={handleSubmit}
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-performance-green text-navy font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-navy hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-performance-green disabled:hover:text-navy"
      >
        {submitting ? "A confirmar…" : "Confirmar Pré-Marcação"}
      </button>
    </div>
  );
}
