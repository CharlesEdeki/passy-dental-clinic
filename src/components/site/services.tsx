import { useState } from "react";

import { Eyebrow, Lede, Reveal } from "@/components/site/primitives";
import { useReveal } from "@/hooks/use-reveal";
import { SERVICES, type Service } from "@/lib/clinic";

/**
 * Gradients and translucent colours are written as plain rgb() rather than
 * Tailwind's slash-opacity utilities, which compile to color-mix(in oklab, …)
 * and silently produce nothing where that isn't resolved. Text legibility on
 * a photo is not something to leave to a browser feature test.
 */
/** Deep navy, matching --theatre-deep. Space-separated for rgb()'s slash-alpha syntax. */
const COVER_RGB = "10 20 34";

/** Always painted, so text is legible before the card scrolls in. */
const BASE_COVER = `linear-gradient(to top,
  rgb(${COVER_RGB} / 0.90) 0%,
  rgb(${COVER_RGB} / 0.72) 18%,
  rgb(${COVER_RGB} / 0.34) 42%,
  rgb(${COVER_RGB} / 0) 68%)`;

/** Scales up from the bottom as the card arrives, lifting the cover higher. */
const RISEN_COVER = `linear-gradient(to top,
  rgb(${COVER_RGB} / 0.86) 0%,
  rgb(${COVER_RGB} / 0.60) 26%,
  rgb(${COVER_RGB} / 0.24) 55%,
  rgb(${COVER_RGB} / 0) 85%)`;

const WATERMARK = `linear-gradient(150deg, #223a5c, #122036)`;

function ServiceCard({ service }: { service: Service }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { ref, visible } = useReveal<HTMLElement>();
  const showImage = Boolean(service.image) && !imageFailed;

  return (
    <article
      ref={ref}
      className="group relative aspect-square overflow-hidden rounded-[22px] bg-theatre-deep transition duration-300 hover:-translate-y-[5px] hover:shadow-[0_24px_50px_-28px_rgb(14_33_28/0.6)]"
    >
      {showImage ? (
        <img
          src={service.image}
          alt=""
          width={600}
          height={600}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-brand group-hover:scale-[1.04]"
        />
      ) : (
        /* No photo: the service icon becomes a watermark, so the card keeps
           its shape and the grid stays even rather than showing a dark hole. */
        <>
          <div className="absolute inset-0" style={{ backgroundImage: WATERMARK }} />
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="rgb(255 255 255 / 0.14)"
            strokeWidth={1.1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute -right-5 -top-2 size-36"
          >
            <path d={service.icon} />
          </svg>
        </>
      )}

      <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: BASE_COVER }} />
      <div
        aria-hidden="true"
        className="absolute inset-0 origin-bottom transition-transform duration-[900ms] ease-brand"
        style={{
          backgroundImage: RISEN_COVER,
          transform: visible ? "scaleY(1)" : "scaleY(0)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-[1.12rem] text-white">{service.title}</h3>
        <p className="mt-1.5 text-[0.88rem] leading-snug" style={{ color: "rgb(255 255 255 / 0.82)" }}>
          {service.blurb}
        </p>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" className="py-19 md:py-26">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="text-[clamp(2rem,4vw,3.1rem)]">
            We provide total and comprehensive oral care for you and the entire family.
          </h2>
          <Lede>Including routine and specialist care under one roof.</Lede>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}