import Link from "next/link";
import { createProgram } from "@/lib/actions/programs";

export default function NewProgramPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/admin/programas" className="text-sm font-semibold text-electric hover:text-navy transition-colors">
        ← Programas
      </Link>
      <h1 className="font-display font-bold text-2xl mt-2 mb-8">Novo Programa</h1>

      <form action={createProgram} className="space-y-5 rounded-2xl bg-white border border-black/5 p-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">Nome</label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-semibold text-navy mb-2">
            Slug <span className="font-normal text-[#8493ab]">(opcional — gerado a partir do nome)</span>
          </label>
          <input
            id="slug"
            name="slug"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-navy mb-2">Descrição</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            required
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="durationWeeks" className="block text-sm font-semibold text-navy mb-2">Duração (semanas)</label>
            <input
              id="durationWeeks"
              name="durationWeeks"
              type="number"
              min={1}
              required
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-navy mb-2">Preço (€)</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min={0}
              required
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
            />
          </div>
        </div>
        <div>
          <label htmlFor="goals" className="block text-sm font-semibold text-navy mb-2">Objetivos</label>
          <textarea
            id="goals"
            name="goals"
            rows={2}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric resize-none"
          />
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-navy">
          <input type="checkbox" name="active" defaultChecked className="w-4 h-4 accent-performance-green" />
          Ativo (visível para inscrições)
        </label>
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-performance-green text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-colors"
        >
          Criar Programa
        </button>
      </form>
    </div>
  );
}
