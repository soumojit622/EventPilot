import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle } from "lucide-react";
import clsx from "clsx";

const faqs = [
  {
    question: "How is EventPilot different from regular event planning tools?",
    answer:
      "EventPilot is built specifically for colleges. The platform understands campus scheduling, academic calendars, and venue limitations. It solves problems student organizations deal with that generic tools don’t address.",
  },
  {
    question: "How does the AI scheduling system work?",
    answer:
      "Our AI reviews past events, student availability, campus calendars, and venue restrictions. Based on that data, it recommends ideal event times and instantly flags scheduling conflicts.",
  },
  {
    question: "Can we try EventPilot before paying?",
    answer:
      "Yes. You get a 14-day trial with full access to features—no payment details required. Test everything before you decide.",
  },
  {
    question: "Is EventPilot suitable for small student clubs?",
    answer:
      "Definitely. The Starter plan is designed for small clubs who want powerful tools without heavy pricing or complexity.",
  },
  {
    question: "How secure is our information?",
    answer:
      "Security is built into every part of EventPilot. Data is encrypted, audited, and protected under educational privacy standards like FERPA. Your information stays private and is never sold.",
  },
  {
    question: "What support options are available?",
    answer:
      "All users get email support, Pro members receive priority responses, and Enterprise plans include a dedicated account specialist.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Side */}
          <div className="lg:sticky lg:top-32">
            <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30 mb-8">
              <HelpCircle className="w-10 h-10 text-primary-foreground" />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Questions?
              <br />
              We Have Answers
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Learn everything you need about EventPilot. If you’re stuck, reach
              out—our team replies quickly.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="p-6 rounded-2xl bg-background border border-primary/20 shadow-sm hover:shadow-md transition">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground font-medium">
                  Support Ready Anytime
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-background border border-primary/20 shadow-sm hover:shadow-md transition">
                <div className="text-3xl font-bold text-primary mb-1">~2h</div>
                <div className="text-sm text-muted-foreground font-medium">
                  Average Reply Time
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl border border-border/60 bg-card shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <AccordionTrigger
                    className={clsx(
                      "text-left py-6 px-6 font-semibold text-base",
                      "hover:no-underline hover:text-primary transition"
                    )}
                  >
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-muted-foreground px-6 pb-6 leading-relaxed text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* CTA */}
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">Need more help?</h3>
              <p className="text-muted-foreground mb-6">
                Send us a message. We’ll get back to you quickly.
              </p>

              <Button size="lg" className="gap-2 shadow-md hover:shadow-xl">
                <MessageCircle className="w-4 h-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
