import { MapPin, Phone } from "lucide-react";

import { ToothArch } from "@/components/site/tooth-arch";
import { useClinicStatus } from "@/hooks/use-clinic-status";
import { ADDRESS_LINES, MAPS_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/clinic";
import { cn } from "@/lib/utils";

const TRUST = [
  { value: "2+", label: "Years in Isolo" },
  { value: "1,000+", label: "Patients seen" },
  { value: "Mon–Sat", label: "8:30am – 8pm" },
  { value: "Sunday", label: "3pm – 7:30pm" },
];

export function Hero() {
  const status = useClinicStatus();

  return (
    <div id="top" className="relative overflow-hidden pb-24 pt-[calc(var(--header-h)+3.25rem)] md:pt-[calc(var(--header-h)+6.25rem)]">
      {/* Mint bloom behind the headline — purely atmospheric. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[220px] -top-[320px] size-[760px] rounded-full opacity-85 [background:radial-gradient(circle,var(--mint),transparent_68%)]"
      />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-11 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <p className="mb-[26px] inline-flex items-center gap-[9px] rounded-full border border-border bg-white px-4 py-2 text-[0.83rem] font-medium">
            <span
              className={cn(
                "size-2 rounded-full",
                status?.open ? "animate-pulse-ring bg-live" : "bg-coral",
              )}
            />
            {status?.label ?? "Checking hours…"}
          </p>

          <h1 className="text-[clamp(2.6rem,6vw,4.6rem)]">
            Dentistry that
            <br />
            doesn&rsquo;t make you
            <br />
            <em className="italic text-theatre">dread the chair.</em>
          </h1>

          <div className="mt-5 max-w-[58ch] space-y-3 text-[1.05rem] text-muted-foreground">
            <p>
              A calm, modern, serene dental clinic environment situated on the 2nd floor of
              Crystal Computer &amp; Shopping Mall, Jakande Gate, along Isheri-Oshun Road, Isolo,
              Lagos.
            </p>
            <p>
              Comprises General Dental Care, Orthodontics (braces), Aesthetic Dentistry (teeth
              whitening), Geriatric Dentistry, Pediatric Dentistry, and more.
            </p>
            <p>HMO enrolees are also welcome. Instant bookings for dental appointments are not left out.</p>
          </div>

          {/* Phone stays a single scannable line; the full address gets its
              own line below since it's too long to sit inline beside it. */}
          <div className="mt-6 space-y-2.5">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-[1.2rem] font-bold text-theatre underline-offset-4 transition-colors hover:text-theatre-deep hover:underline"
            >
              <Phone className="size-[19px]" strokeWidth={2.2} aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-[0.98rem] font-semibold text-foreground underline-offset-4 transition-colors hover:text-theatre hover:underline"
            >
              <MapPin className="mt-0.5 size-[18px] shrink-0 text-coral" strokeWidth={2.2} aria-hidden="true" />
              {ADDRESS_LINES.join(" ")}
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <a
              href="#book"
              className="inline-flex items-center gap-2.5 rounded-full bg-theatre px-[26px] py-3.5 text-[0.97rem] font-semibold text-white shadow-[var(--shadow-cta)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-theatre-deep"
            >
              Book an appointment
            </a>
          </div>

          <dl className="mt-13 flex flex-wrap gap-8 border-t border-border pt-7">
            {TRUST.map((item) => (
              <div key={item.label} className="flex flex-col">
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.13em] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="order-first font-display text-[1.7rem] leading-none">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ToothArch />
      </div>
    </div>
  );
}