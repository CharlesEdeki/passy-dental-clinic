import { ShieldCheck } from "lucide-react";

import { CaseSlider } from "@/components/site/case-slider";
import { Eyebrow, Lede, Reveal } from "@/components/site/primitives";
import { CASES, RESULTS_TEASER_LIMIT } from "@/lib/clinic";

export function Results() {
  const teaser = CASES.slice(0, RESULTS_TEASER_LIMIT);
  const hasMore = CASES.length > RESULTS_TEASER_LIMIT;

  return (
    <section id="results" className="bg-mint py-19 md:py-26">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <Eyebrow>Before &amp; after</Eyebrow>
          <h2 className="text-[clamp(2rem,4vw,3.1rem)]">Real cases, real mouths.</h2>
          <Lede>
            Drag the handle to compare. Every case shown here is published with the patient&rsquo;s
            written consent.
          </Lede>
        </Reveal>

        {teaser.length > 0 && (
          <div className="mt-11 grid gap-[26px] md:grid-cols-2">
            {teaser.map((study, index) => (
              <Reveal key={study.id} delay={(index % 2) as 0 | 1}>
                <CaseSlider study={study} />
              </Reveal>
            ))}
          </div>
        )}

        {hasMore && (
          <Reveal delay={2}>
            <div className="mt-9 text-center">
              <a
                href="/gallery"
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-theatre px-[26px] py-3 text-[0.95rem] font-semibold text-theatre transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-theatre hover:text-white"
              >
                View full gallery ({CASES.length} cases)
              </a>
            </div>
          </Reveal>
        )}

        <Reveal delay={2}>
          <p className="mt-7 flex items-start gap-3 rounded-[14px] bg-white/70 px-5 py-4 text-[0.86rem] text-theatre-deep">
            <ShieldCheck className="mt-0.5 size-[18px] shrink-0 text-theatre" aria-hidden="true" />
            <span>
              <b>Consent notice.</b> Clinical photographs are only published where the patient has
              signed a release covering website use. Ask at reception if you&rsquo;d prefer your
              treatment not to be photographed. It changes nothing about your care.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}