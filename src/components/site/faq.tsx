import { Plus } from "lucide-react";

import { Eyebrow, Reveal } from "@/components/site/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/clinic";

export function Faq() {
  return (
    <section id="faq" className="bg-mint py-19 md:py-26">
      <div className="mx-auto max-w-[840px] px-6">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="text-[clamp(2rem,4vw,3.1rem)]">A few things worth knowing.</h2>
        </Reveal>

        <Reveal delay={1}>
          <Accordion type="single" collapsible className="mt-11 border-t border-border">
            {FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`} className="border-border">
                {/* The default chevron is hidden in favour of a plus that rotates into a cross. */}
                <AccordionTrigger className="group gap-5 py-6 text-left font-sans text-[1.06rem] font-semibold hover:no-underline [&>svg]:hidden">
                  {faq.question}
                  <span className="grid size-[26px] shrink-0 place-items-center rounded-full border-[1.5px] border-border transition duration-300 ease-brand group-data-[state=open]:rotate-45 group-data-[state=open]:border-theatre group-data-[state=open]:bg-theatre">
                    <Plus
                      className="size-3.5 text-foreground group-data-[state=open]:text-white"
                      strokeWidth={2.4}
                    />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="max-w-[68ch] pb-6 pt-0 text-[1rem] text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}