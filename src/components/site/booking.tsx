import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Eyebrow, Lede, Reveal, WhatsappGlyph } from "@/components/site/primitives";
import { useToothSelection } from "@/components/site/tooth-selection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { whatsappLink } from "@/lib/clinic";
import { cn } from "@/lib/utils";

const HMO_OPTIONS = [
  { value: "none", label: "Not using an HMO" },
  { value: "Grooming Health HMO", label: "Grooming Health HMO" },
  { value: "Reliance HMO", label: "Reliance HMO" },
  { value: "Other", label: "Other — I'll bring my ID" },
];

/**
 * The clinic's actual treatment menu, distinct from the shorter overview on
 * the homepage Services section -- this one drives what a patient can
 * actually book, so it stays as detailed as the real service list.
 */
const SERVICE_OPTIONS = [
  // "Registration & Consultation",
  "Scaling & Polishing",
  "Teeth Whitening",
  "Tooth Extraction",
  "Tooth Filling (Temporary, GIC, Composite)",
  "Dentures (Removable, Permanent)",
  "Root Canal Treatment",
  "Crowns (Anterior Jacket, PFM, Zirconia, E-max)",
  "Bridges",
  "Braces / Invisalign",
  "Implants",
  "Home Service",
];

const PROMISES = [
  "Same-day slots often available for booking",
  "Team replies 24/7, Monday to Sunday",
  "HMO enrolees verified before treatment",
  "Child-friendly, fear-free approach",
];

const NIGERIAN_MOBILE = /^(\+?234|0)[789][01]\d{8}$/;

const fieldClass =
  "rounded-xl border-[1.5px] border-border bg-paper px-[15px] py-[13px] text-[0.96rem] shadow-none transition-colors focus-visible:border-theatre focus-visible:bg-white focus-visible:ring-0";

type Errors = Partial<Record<"name" | "phone" | "service" | "date", string>>;

export function Booking() {
  const { selected } = useToothSelection();
  const [minDate, setMinDate] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    hmo: "none",
    notes: "",
  });

  // Computed on the client so server and client markup match.
  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phone = form.phone.replace(/[\s()-]/g, "");
    const next: Errors = {};

    if (form.name.trim().length < 2) {
      next.name = "Enter your full name so we know who to expect.";
    }
    if (!NIGERIAN_MOBILE.test(phone)) {
      next.phone = "Use a Nigerian mobile number, like 08031234567.";
    }
    if (!form.service) {
      next.service = "Choose the treatment you're after.";
    }
    if (form.date && minDate && form.date < minDate) {
      next.date = "Pick today or a later date.";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      toast("Check the highlighted fields and try again");
      document.querySelector<HTMLElement>("[data-invalid='true']")?.focus();
      return;
    }

    const lines = [
      "Hello Passy Dental Clinic, I'd like to book an appointment.",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${phone}`,
      `Service: ${form.service}`,
    ];
    if (form.date) lines.push(`Preferred date: ${form.date}`);
    if (form.time) lines.push(`Preferred time: ${form.time}`);
    if (form.hmo !== "none") lines.push(`HMO: ${form.hmo}`);
    if (selected.length) lines.push(`Areas of concern: ${selected.join(", ")}`);
    if (form.notes.trim()) lines.push(`Notes: ${form.notes.trim()}`);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    toast("Opening WhatsApp with your details");
  };

  return (
    <section id="book" className="py-19 md:py-26">
      <div className="mx-auto grid max-w-[1180px] items-start gap-11 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-15">
        <Reveal className="lg:sticky lg:top-[110px]">
          <Eyebrow>Book appointment</Eyebrow>
          <h2 className="text-[clamp(2rem,4vw,3.1rem)]">
            Reserve your visit in under a minute.
          </h2>
          <Lede>
            Fill in your details and we&rsquo;ll confirm your slot on WhatsApp. Our team replies
            during business hours, Monday to Saturday.
          </Lede>
          <ul className="mt-7 grid gap-3.5">
            {PROMISES.map((promise) => (
              <li key={promise} className="flex items-start gap-3 text-[0.95rem]">
                <Check
                  className="mt-1 size-[19px] shrink-0 text-theatre"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                <span>{promise}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={1}>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="rounded-[26px] border border-border bg-white p-6 md:p-[34px]"
          >
            <div className="grid gap-[18px] sm:grid-cols-2">
              <Field
                id="f-name"
                label="Full name"
                required
                error={errors.name}
                control={
                  <Input
                    id="f-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Adaeze Okonkwo"
                    value={form.name}
                    data-invalid={Boolean(errors.name)}
                    onChange={(event) => update("name", event.target.value)}
                    className={cn(fieldClass, "h-auto", errors.name && "border-coral")}
                  />
                }
              />
              <Field
                id="f-phone"
                label="Phone number"
                required
                error={errors.phone}
                control={
                  <Input
                    id="f-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0803 123 4567"
                    value={form.phone}
                    data-invalid={Boolean(errors.phone)}
                    onChange={(event) => update("phone", event.target.value)}
                    className={cn(fieldClass, "h-auto", errors.phone && "border-coral")}
                  />
                }
              />
            </div>

            <div className="mt-[18px]">
              <Field
                id="f-service"
                label="Registration & Consultation"
                required
                error={errors.service}
                control={
                  <Select value={form.service} onValueChange={(value) => update("service", value)}>
                    <SelectTrigger
                      id="f-service"
                      data-invalid={Boolean(errors.service)}
                      className={cn(
                        fieldClass,
                        "h-auto w-full [&>span]:truncate",
                        errors.service && "border-coral",
                      )}
                    >
                      <SelectValue placeholder="Select a treatment…" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                }
              />
            </div>

            <div className="mt-[18px] grid gap-[18px] sm:grid-cols-2">
              <Field
                id="f-date"
                label="Preferred date"
                error={errors.date}
                control={
                  <Input
                    id="f-date"
                    name="date"
                    type="date"
                    min={minDate || undefined}
                    value={form.date}
                    data-invalid={Boolean(errors.date)}
                    onChange={(event) => update("date", event.target.value)}
                    className={cn(fieldClass, "h-auto", errors.date && "border-coral")}
                  />
                }
              />
              <Field
                id="f-time"
                label="Preferred time"
                control={
                  <Input
                    id="f-time"
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={(event) => update("time", event.target.value)}
                    className={cn(fieldClass, "h-auto")}
                  />
                }
              />
            </div>

            <div className="mt-[18px]">
              <Field
                id="f-hmo"
                label="HMO provider"
                control={
                  <Select value={form.hmo} onValueChange={(value) => update("hmo", value)}>
                    <SelectTrigger id="f-hmo" className={cn(fieldClass, "h-auto w-full")}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {HMO_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                }
              />
            </div>

            <div className="mt-[18px]">
              <Field
                id="f-notes"
                label="Anything else we should know?"
                control={
                  <Textarea
                    id="f-notes"
                    name="notes"
                    rows={4}
                    placeholder="Sharp pain on the lower left when I drink cold water…"
                    value={form.notes}
                    onChange={(event) => update("notes", event.target.value)}
                    className={cn(fieldClass, "min-h-24 resize-y")}
                  />
                }
              />
              {selected.length > 0 && (
                <p className="mt-1.5 text-[0.78rem] text-muted-foreground">
                  We&rsquo;ll include your selected areas: {selected.join(", ")}.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-theatre p-4 text-[0.97rem] font-semibold text-white shadow-[var(--shadow-cta)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-theatre-deep"
            >
              <WhatsappGlyph className="size-[19px]" />
              Send booking on WhatsApp
            </button>
            <p className="mt-3.5 text-center text-[0.78rem] text-muted-foreground">
              Opens WhatsApp with your details filled in. Nothing is sent until you press send
              there.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  error,
  control,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  control: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-[7px] block text-[0.83rem] font-semibold">
        {label}
        {required && (
          <span className="text-coral" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </Label>
      {control}
      {error && (
        <span role="alert" className="mt-1.5 block text-[0.79rem] font-medium text-coral">
          {error}
        </span>
      )}
    </div>
  );
}