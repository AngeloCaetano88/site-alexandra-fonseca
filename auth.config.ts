import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe config (no Prisma/bcrypt) — used by middleware for route
 * protection. The full config with providers/adapter lives in auth.ts.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // /admin is protected separately, inside app/admin/(protected)/layout.tsx,
      // so it can redirect to /admin/login instead of the client /login page.
      const isDashboardArea = nextUrl.pathname.startsWith("/dashboard");
      if (isDashboardArea) {
        return !!auth?.user;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as "CLIENT" | "ADMIN";
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
