import { WhatsappGlyph } from "@/components/site/primitives";
import { whatsappLink } from "@/lib/clinic";

export function WhatsappFab() {
  return (
    <a
      href={whatsappLink("Hello Passy Dental Clinic, I'd like to ask about an appointment.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      className="fixed bottom-[22px] right-[22px] z-30 flex items-center gap-2.5 rounded-full bg-whatsapp p-3.5 shadow-[0_10px_28px_-8px_rgb(37_211_102/0.75)] transition-[transform,padding] duration-200 ease-brand hover:scale-[1.05] sm:py-3 sm:pl-4 sm:pr-[18px]"
    >
      <WhatsappGlyph className="size-[26px] shrink-0 text-white" />
      {/* Hidden below sm, not just visually shrunk -- a narrow screen has no
          spare width for a wide pill without it drifting over page content
          as the user scrolls. aria-label above still names the action for
          screen readers regardless of what's visible. */}
      <span className="hidden text-[0.92rem] font-semibold text-white sm:inline">
        Book on WhatsApp
      </span>
    </a>
  );
}