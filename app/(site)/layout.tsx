import { CookieConsent } from "@/components/marketing/CookieConsent";
import { Footer } from "@/components/marketing/Footer";
import { Header } from "@/components/marketing/Header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <CookieConsent />
    </>
  );
}
