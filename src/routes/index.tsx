import { createFileRoute } from "@tanstack/react-router";

import { GEO } from "@/lib/clinic";

import { Booking } from "@/components/site/booking";
import { Faq } from "@/components/site/faq";
import { GoogleReviews } from "@/components/site/google-reviews";
import { Hero } from "@/components/site/hero";
import { Hmo } from "@/components/site/hmo";
import { Results } from "@/components/site/results";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Services } from "@/components/site/services";
import { ToothSelectionProvider } from "@/components/site/tooth-selection";
import { Visit } from "@/components/site/visit";
import { WhatsappFab } from "@/components/site/whatsapp-fab";
import { Toaster } from "@/components/ui/sonner";

const DESCRIPTION =
  "Passy Dental Clinic at Jakande Gate, Isolo offers general dentistry, whitening, implants, orthodontics and pediatric care in a calm, modern setting. HMO enrolees welcome.";

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Passy Dental Clinic",
  description:
    "General dentistry, orthodontics, cosmetic and pediatric dental care in Isolo, Lagos.",
  url: "https://passydentalclinic.com/",
  telephone: "+2347067164269",
  priceRange: "₦₦",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2nd Floor, Crystal Computer & Shopping Mall, Jakande Gate Bus-stop, Isheri-Oshun Rd",
    addressLocality: "Isolo",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  geo: { "@type": "GeoCoordinates", ...GEO },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:30",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "15:00",
      closes: "19:30",
    },
  ],
  medicalSpecialty: "Dentistry",
  availableService: [
    "General Dentistry",
    "Orthodontics",
    "Cosmetic Dentistry",
    "Pediatric Care",
    "Emergency Services",
    "Sedation Dentistry",
    "Geriatric Dentistry",
  ].map((name) => ({ "@type": "MedicalProcedure", name })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Passy Dental Clinic | Modern Dentistry in Isolo, Lagos" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Passy Dental Clinic | Modern Dentistry in Isolo, Lagos" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ToothSelectionProvider>
      <script
        type="application/ld+json"
        // Static, developer-authored JSON-LD — no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      <SiteHeader />

      <main>
        <Hero />
        <Services />
        <GoogleReviews />
        <Results />
        <Hmo />
        <Booking />
        <Faq />
        <Visit />
      </main>

      <SiteFooter />
      <WhatsappFab />
      <Toaster position="bottom-center" />
    </ToothSelectionProvider>
  );
}