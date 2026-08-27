import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { CaseSlider } from "@/components/site/case-slider";
import { Eyebrow, Reveal } from "@/components/site/primitives";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { WhatsappFab } from "@/components/site/whatsapp-fab";
import { CASES } from "@/lib/clinic";

const DESCRIPTION =
  "Real before and after results from Passy Dental Clinic, Jakande Gate, Isolo -- every case published with the patient's written consent.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Before & After Gallery | Passy Dental Clinic" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Before & After Gallery | Passy Dental Clinic" },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://passydentalclinic.com/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <SiteHeader />

      <main className="pb-24 pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal>
            <a
              href="/"
              className="mb-7 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-muted-foreground transition-colors hover:text-theatre"
            >
              <ArrowLeft className="size-4" strokeWidth={2.2} aria-hidden="true" />
              Back to home
            </a>

            <Eyebrow>Before &amp; after</Eyebrow>
            <h1 className="text-[clamp(2rem,4vw,3.1rem)]">Every case, in one place.</h1>
            <p className="mt-5 max-w-[62ch] text-[1.05rem] text-muted-foreground">
              Drag the handle on any photo to compare. This gallery grows as we treat more
              patients -- come back for more.
            </p>
          </Reveal>

          {CASES.length > 0 ? (
            <div className="mt-11 grid gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
              {CASES.map((study, index) => (
                <Reveal key={study.id} delay={(index % 3) as 0 | 1 | 2}>
                  <CaseSlider study={study} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={1}>
              <p className="mt-11 rounded-lg border border-dashed border-border bg-white px-6 py-10 text-center text-[0.95rem] text-muted-foreground">
                No cases published yet -- check back soon.
              </p>
            </Reveal>
          )}

          <Reveal delay={2}>
            <p className="mt-9 flex items-start gap-3 rounded-[14px] bg-mint px-5 py-4 text-[0.86rem] text-theatre-deep">
              <ShieldCheck className="mt-0.5 size-[18px] shrink-0 text-theatre" aria-hidden="true" />
              <span>
                <b>Consent notice.</b> Clinical photographs are only published where the patient
                has signed a release covering website use. Ask at reception if you&rsquo;d prefer
                your treatment not to be photographed. It changes nothing about your care.
              </span>
            </p>
          </Reveal>
        </div>
      </main>

      <SiteFooter />
      <WhatsappFab />
    </>
  );
}
