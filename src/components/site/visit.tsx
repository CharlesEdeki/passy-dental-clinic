import { MapPin } from "lucide-react";

import { Eyebrow, Lede, Reveal } from "@/components/site/primitives";
import { useClinicStatus } from "@/hooks/use-clinic-status";
import { HOURS, MAP_EMBED_URL, MAPS_URL, NEARBY_AREAS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/clinic";
import { cn } from "@/lib/utils";

export function Visit() {
  const status = useClinicStatus();

  return (
    <section id="visit" className="py-19 md:py-26">
      <div className="mx-auto grid max-w-[1180px] items-center gap-11 px-6 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <Eyebrow>Visit us</Eyebrow>
          <h2 className="text-[clamp(2rem,4vw,3.1rem)]">Jakande Gate, Isolo, Lagos.</h2>
          <Lede>
            Easy to reach from all over Lagos, and well worth the trip from further afield.
            Parking available on site.
          </Lede>

          <div className="mt-5">
            <p className="mb-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Patients travel in from
            </p>
            <div className="flex flex-wrap gap-2">
              {NEARBY_AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-mint px-3 py-1 text-[0.82rem] font-medium text-theatre-deep"
                >
                  {area}
                </span>
              ))}
              {/* Deliberately styled apart from the named areas above -- this
                  is an invitation ("you're welcome to travel in"), not a
                  claim of coverage or presence the way a place name is. */}
              <span className="rounded-full border border-dashed border-border px-3 py-1 text-[0.82rem] font-medium text-muted-foreground">
                + beyond Lagos
              </span>
            </div>
          </div>

          <ul className="mt-6.5">
            {HOURS.map(([day, hours], index) => (
              <li
                key={day}
                className={cn(
                  "flex justify-between border-b border-border py-3 text-[0.95rem]",
                  status?.day === index && "font-bold text-theatre",
                )}
              >
                <span>{day}</span>
                <span>{hours}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3.5">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 rounded-full bg-theatre px-[26px] py-3.5 text-[0.97rem] font-semibold text-white shadow-[var(--shadow-cta)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-theatre-deep"
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-border px-[26px] py-3.5 text-[0.97rem] font-semibold transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-theatre hover:bg-white"
            >
              Get directions
            </a>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="overflow-hidden rounded-lg border border-border bg-mint">
            <iframe
              src={MAP_EMBED_URL}
              title="Map showing Passy Dental Clinic at Jakande Gate, Isolo"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="block aspect-[4/3] w-full border-0"
            />
          </div>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3.5 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-theatre underline-offset-4 hover:underline"
          >
            <MapPin className="size-4" strokeWidth={2} aria-hidden="true" />
            Open Passy Dental Clinic in Google Maps
          </a>
        </Reveal>
      </div>
    </section>
  );
}