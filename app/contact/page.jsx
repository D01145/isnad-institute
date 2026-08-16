import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Page } from "@/components/SiteChrome";

export const metadata = {
  title: "Contact",
  description:
    "Contact Isnad Institute about online Arabic and Quran classes, scheduling, enrollment or your free trial lesson.",
};

export default function Contact() {
  return (
    <Page>
      <section className="shell py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="display mt-4">Let’s start your learning journey.</h1>
            <p className="lead mt-6">
              Questions about classes, scheduling or the best path for you or
              your child? Get in touch.
            </p>
            <div className="mt-8 grid gap-3">
              <a href="mailto:hello@isnadinstitute.com" className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5">
                <Mail className="h-5 w-5 text-[#0F6B4F]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-[#8A938F]">Email</p>
                  <p className="mt-1 font-extrabold">hello@isnadinstitute.com</p>
                </div>
              </a>
              <a href="tel:+14375009885" className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5">
                <Phone className="h-5 w-5 text-[#0F6B4F]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-[#8A938F]">Phone</p>
                  <p className="mt-1 font-extrabold">+1 (437) 500-9885</p>
                </div>
              </a>
              <a
                href="https://wa.me/14375009885"
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5 text-[#0F6B4F]" />
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-[#8A938F]">WhatsApp</p>
                  <p className="mt-1 font-extrabold">+1 (437) 500-9885</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#0F6B4F]" />
              </a>
              <Link href="/book-trial" className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5">
                <MessageCircle className="h-5 w-5 text-[#0F6B4F]" />
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-[#8A938F]">Ready to begin?</p>
                  <p className="mt-1 font-extrabold">Book a free trial lesson</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#0F6B4F]" />
              </Link>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </Page>
  );
}
