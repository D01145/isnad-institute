import { CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import TrialForm from "@/components/TrialForm";
import { Page } from "@/components/SiteChrome";

export const metadata = {
  title: "Book a Free Trial",
  description:
    "Book a free trial lesson with Isnad Institute for online Arabic or Quran classes.",
};

const trialBenefits = [
  "Discuss your learning goals",
  "Experience a live teaching session",
  "Get a starting-level recommendation",
  "Explore private or small-group options",
  "No obligation to enroll",
];

export default function Trial() {
  return (
    <Page>
      <section className="soft-section">
        <div className="shell grid gap-12 py-16 lg:grid-cols-[.88fr_1.12fr] lg:items-start lg:py-24">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Free trial lesson</p>
            <h1 className="display mt-4">
              Meet your teacher.
              <br />
              <span className="text-[#0F6B4F]">Find your path.</span>
            </h1>
            <p className="lead mt-6">
              Your trial helps us understand your goals, starting point and
              preferred class format before you decide to enroll.
            </p>
            <div className="mt-8 grid gap-3">
              {trialBenefits.map((benefit) => (
                <div key={benefit} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F6B4F]" />
                  <span className="font-semibold text-[#53615B]">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3 border-t border-black/[.06] pt-7 text-sm text-[#66716C] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-[#0F6B4F]" /> Reply within 24 hours</div>
              <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#0F6B4F]" /> Your details stay private</div>
            </div>
          </div>
          <TrialForm />
        </div>
      </section>
    </Page>
  );
}
