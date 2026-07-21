"use client";

import { signOut } from "next-auth/react";

export function SignOutButton({
  redirectTo,
  className,
}: {
  redirectTo: string;
  className?: string;
}) {
  return (
    <button onClick={() => signOut({ redirectTo })} className={className}>
      Sair
    </button>
  );
}
