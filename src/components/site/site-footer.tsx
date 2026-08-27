import { useLocation } from "@tanstack/react-router";

import { EMAIL, MAPS_URL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_NUMBER, ADDRESS_LINES } from "@/lib/clinic";

const CLINIC_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#results", label: "Before & after" },
  { href: "#hmo", label: "HMO & payment" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "Questions" },
];

const linkClass = "block py-1.5 text-white/60 transition-colors duration-200 hover:text-white";

export function SiteFooter() {
  // These link to homepage sections. From any other page a bare "#services"
  // would try to scroll the current page instead of navigating home first.
  const isHome = useLocation({ select: (location) => location.pathname }) === "/";
  const toSection = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <footer className="bg-theatre pb-8 pt-18 text-[0.9rem] text-white/60">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="mb-3 font-display text-[1.3rem] font-bold text-white">
              Passy Dental Clinic
            </p>
            <p className="max-w-[34ch]">
              Modern, gentle dentistry for families in Isolo and across Lagos mainland.
            </p>
          </div>

          <nav aria-label="Clinic">
            <h2 className="mb-4 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white">
              Clinic
            </h2>
            {CLINIC_LINKS.map((link) => (
              <a key={link.href} href={toSection(link.href)} className={linkClass}>
                {link.label}
              </a>
            ))}
            <a href="/gallery" className={linkClass}>
              Full gallery
            </a>
          </nav>

          <nav aria-label="Reach us">
            <h2 className="mb-4 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white">
              Reach us
            </h2>
            <a href={PHONE_HREF} className={linkClass}>
              {PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              WhatsApp
            </a>
            <a href={`mailto:${EMAIL}`} className={linkClass}>
              {EMAIL}
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {ADDRESS_LINES}
            </a>
          </nav>
        </div>

        <div className="mt-13 flex flex-wrap justify-between gap-4 border-t border-white/[0.12] pt-6.5 text-[0.82rem]">
          <span>&copy; {new Date().getFullYear()} Passy Dental Clinic. All rights reserved.</span>
          <span>Emergencies: call before you travel.</span>
        </div>
      </div>
    </footer>
  );
}