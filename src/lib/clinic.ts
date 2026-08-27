/**
 * Single source of truth for clinic content.
 * Anything that appears in more than one place on the page lives here.
 */

export const WHATSAPP_NUMBER = "2347067164269";
export const PHONE_DISPLAY = "+234 706 716 4269";
export const PHONE_HREF = "tel:+2347067164269";
export const EMAIL = "hello@passydentalclinic.com";
/**
 * Google's canonical identifier for the clinic. Links built from this land on
 * Passy Dental Clinic itself — a plain "Jakande Gate" search resolves to the
 * bus stop, which carries someone else's rating.
 */
export const GOOGLE_PLACE_ID = "ChIJs0-p6emPOxARdFo24ELbdc0";
export const MAPS_URL = `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`;

/** Opens Google's review dialog directly. */
export const WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

/** Embed URL from the clinic's Google Maps listing. */
export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9337490193193!2d3.3047140743594468!3d6.530051923088479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8fe9e9a94fb3%3A0xcd75db42e0365a74!2sPassy%20Dental%20Clinic!5e0!3m2!1sen!2sus!4v1786872307885!5m2!1sen!2sus";

/** Verified against the Maps listing; the previous values were ~750m out. */
export const GEO = { latitude: 6.530052, longitude: 3.304714 };
export const ADDRESS_LINES = [
  "2nd Floor, Crystal Computer & Shopping Mall, ",
  "Jakande Gate Bus-stop, Isheri-Oshun Rd, ",
  "Isolo, Lagos 102214, Nigeria.",
];

export function whatsappLink(message: string) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

export type Service = {
  title: string;
  blurb: string;
  /** Single path drawn as a stroked 24x24 icon. Used until a photo exists. */
  icon: string;
  /**
   * Optional square photo in public/images/. Shown as a small thumbnail, which
   * is forgiving of phone shots in a way a full-width image is not. Services
   * without one keep the icon, so photos can be added a few at a time.
   */
  image?: string;
};

export const SERVICES: Service[] = [
  {
    title: "General Dentistry",
    image: "/images/service-general-dentistry.jpg",
    blurb: "Comprehensive routine care for patients of all ages.",
    icon: "M12 2C9 2 8 4 5 4S1 7 1 11c0 5 2 7 3 10s1 1 2 1 1-5 2-8 2-3 4-3 3 0 4 3 1 8 2 8 1 2 2-1 3-5 3-10c0-4-1-7-4-7s-4-2-7-2z",
  },
  {
    title: "Orthodontics",
    image: "/images/service-orthodontics.jpg",
    blurb: "Braces and aligners to correct bite issues and straighten teeth.",
    icon: "M3 8h18M3 16h18M7 8v8M12 8v8M17 8v8",
  },
  {
    title: "Cosmetic Dentistry",
    image: "/images/service-cosmetic-dentistry.jpg",
    blurb: "Whitening, veneers and smile makeovers.",
    icon: "M12 3l2.2 5.5L20 9.7l-4 4.2 1 6.1-5-3-5 3 1-6.1-4-4.2 5.8-1.2z",
  },
  {
    title: "Preventive Care",
    image: "/images/service-preventive-care.jpg",
    blurb: "Cleaning, scaling and education that keeps problems away.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    title: "Pediatric Care",
    image: "/images/service-pediatric-care.jpg",
    blurb: "Dentistry for children in a friendly, fear-free setting.",
    icon: "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z",
  },
  {
    title: "Emergency Services",
    image: "/images/service-emergency-services.jpg",
    blurb: "Urgent care for pain, trauma or a knocked-out tooth.",
    icon: "M13 2L4 14h6l-1 8 9-12h-6z",
  },
  {
    title: "Sedation Dentistry",
    image: "/images/service-sedation-dentistry.jpg",
    blurb: "Calm, comfortable treatment for anxious patients.",
    icon: "M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z",
  },
  {
    title: "Implants & Prosthetics",
    image: "/images/service-implants-prosthetics.jpg",
    blurb: "Replace missing teeth with stable, natural-looking results.",
    icon: "M12 2v20M8 6h8M9 11h6M10 16h4",
  },
  {
    title: "Root Canal Treatment",
    image: "/images/service-root-canal-treatment.jpg",
    blurb: "Relieve infection and save the natural tooth.",
    icon: "M12 2C8 2 6 5 6 9c0 5 3 6 4 13h4c1-7 4-8 4-13 0-4-2-7-6-7z",
  },
];

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "Where is your dental clinic located?",
    answer:
      "Passy Dental Clinic is located Oke afa jakande gate bus stop isolo lagos ( 2nd floor of Crystal Computer Shopping Mall) isheri oshun road isolo lagos.",
  },
  {
    question: "How often should I do Scaling and Polishing?",
    answer:
      "Scaling and Polishing should be done every 6months ( twice in a year)",
  },
  {
    question: "Is Scaling and Polishing the same as Teeth whitening?",
    answer:
      "Absolutely NO! While Scaling and Polishing is scrapping tartar, calculus and debris from the teeth and gum. Teeth whitening on the other hand is simply bleaching the teeth to make it whiter",
  },
  {
    question: "Is it advisable to always brush with a Hard toothbrush?",
    answer:
      "No! The ideal and healthy toothbrush for brushing is the soft or medium bristtle toothbrush.",
  },
  {
    question: "When I have toothache or any dental issues should I resort to self medication or visit the Dentist?",
    answer:
      "Visit the dentist.",
  },
];

/** Indexed by JS day number, Sunday first. */
/**
 * Shown as tags in the Visit section. These are genuine driving-distance
 * claims (a patient really can get to Isolo from any of these), which is
 * different in kind from the "beyond Lagos" tag rendered alongside them --
 * that one is deliberately styled apart, since it's an invitation rather
 * than a place name.
 */
export const NEARBY_AREAS = [
  "Ejigbo",
  "Okota",
  "Ago Palace",
  "Mushin",
  "Apapa",
  "Mile 2",
  "Dopemu",
  "Ikeja",
  "Ogba",
  "Ikorodu",
  "Oke-Aro",
  "Agbara",
  "Victoria Island",
  "Festac",
  "Oshodi",
  "Ajao Estate",
  "Ikotun",
  "Igando",
  "Egbeda",
  "Surulere",
  "Yaba",
  "Gbagada",
  "Satellite Town",
  "Amuwo Odofin",
  "Lekki",
  "Ikoyi",
  "Ajah",
];

export const HOURS: ReadonlyArray<readonly [string, string]> = [
  ["Sunday", "3:00pm – 7:30pm"],
  ["Monday", "8:30am – 8:00pm"],
  ["Tuesday", "8:30am – 8:00pm"],
  ["Wednesday", "8:30am – 8:00pm"],
  ["Thursday", "8:30am – 8:00pm"],
  ["Friday", "8:30am – 8:00pm"],
  ["Saturday", "8:30am – 8:00pm"],
];

/** Mon–Sat run one schedule; Sunday runs shorter, later hours. */
export const WEEKDAY_OPENS_MINUTES = 8 * 60 + 30;
export const WEEKDAY_CLOSES_MINUTES = 20 * 60;
export const SUNDAY_OPENS_MINUTES = 15 * 60;
export const SUNDAY_CLOSES_MINUTES = 19 * 60 + 30;

export type HmoPartner = {
  name: string;
  /** Logo file in public/images/. Falls back to a text pill when absent. */
  logo?: string;
  /** Fuller name for alt text, where the logo omits words. */
  fullName?: string;
  /**
   * Cap height in pixels. Tuned per logo so they read as equal weight in
   * identical tiles: these marks have very different proportions (Grooming
   * Health is 2.3:1 over two lines, Reliance is 5:1 on one), so a single
   * height would make one tiny. Both land at roughly 130px wide.
   */
  logoHeight?: number;
  /**
   * "in-progress" partners render in their own muted row below the
   * confirmed ones, with an explicit note -- so a visitor is never told a
   * partner covers them before that is actually true. Omit for confirmed
   * partners.
   */
  status?: "in-progress";
};

export const HMO_PARTNERS: HmoPartner[] = [
  // Confirmed and live.
  {
    name: "Grooming Health HMO",
    fullName: "Grooming Health Management Limited",
    logo: "/images/hmo-grooming-health.png",
    logoHeight: 56,
  },
  {
    name: "Clearline HMO",
    logo: "/images/hmo-clearline.png",
    logoHeight: 32,
  },
  {
    name: "MassLife Healthcare",
    logo: "/images/hmo-masslife.png",
    logoHeight: 52,
  },
  {
    name: "Reliance HMO",
    logo: "/images/hmo-reliance.png",
    logoHeight: 26,
    status: "in-progress",
  },
];

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#reviews", label: "Reviews" },
  { href: "#results", label: "Results" },
  { href: "#hmo", label: "HMO" },
  { href: "#faq", label: "Questions" },
  { href: "#visit", label: "Visit" },
];

/** How many cases the homepage teaser shows before offering "View full gallery". */
export const RESULTS_TEASER_LIMIT = 4;

/** Before/after pairs. Drop consented photos into public/images/ to light these up. */
export type CaseStudy = { id: string; title: string; meta: string };

/**
 * Auto-generated at build time from public/images/ -- see
 * scripts/generate-cases.mjs for how a case gets added or removed. Nothing
 * in this file needs editing when a new case photo pair is added.
 */
export { GENERATED_CASES as CASES } from "./cases.generated";