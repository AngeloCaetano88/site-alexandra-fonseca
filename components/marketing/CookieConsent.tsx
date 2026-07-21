"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // localStorage only exists on the client, so the initial "shown" state
    // can't be computed during SSR — this one-time read-on-mount is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy/97 backdrop-blur-md px-6 py-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-between">
        <p className="text-sm text-[#c9d6ea] text-center sm:text-left">
          Utilizamos cookies essenciais e de análise para melhorar a tua
          experiência neste site. Consulta a{" "}
          <Link href="/politica-de-privacidade" className="underline decoration-performance-green underline-offset-4 hover:text-white">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-white/10 border border-white/25 hover:bg-white/20 transition-colors"
          >
            Recusar
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-navy bg-performance-green hover:bg-white transition-colors"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
