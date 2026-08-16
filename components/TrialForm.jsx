"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, LoaderCircle, Mail } from "lucide-react";

const fieldClass = "form-control";

export default function TrialForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    setStatus("sending");
    setError("");

    const payload = {
      inquiryType: "trial",
      name: form.get("name"),
      email: form.get("email"),
      country: form.get("country"),
      whatsapp: form.get("whatsapp"),
      program: form.get("program"),
      classFormat: form.get("class-format"),
      availability: form.get("availability"),
      goals: form.get("goals"),
      website: form.get("website"),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send your request.");
      }

      formElement.reset();
      setConfirmationSent(result.confirmationSent !== false);
      setStatus("success");
    } catch (submissionError) {
      console.error(submissionError);
      setError(
        submissionError.message || "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex min-h-[560px] flex-col justify-center p-7 sm:p-10" role="status">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F6B4F]/10 text-[#0F6B4F]">
          <Check className="h-8 w-8" strokeWidth={3} />
        </div>
        <p className="eyebrow mt-7">Request received</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-.03em] text-[#17231F]">
          JazakAllahu Khair!
        </h2>
        <p className="mt-4 max-w-md leading-7 text-[#66716C]">
          Your free trial request is with our team. We’ll contact you within 24
          hours, in sha Allah, to arrange the best next step.
        </p>
        {confirmationSent ? (
          <div className="mt-6 flex gap-3 rounded-2xl bg-[#F4F7F4] p-4 text-sm leading-6 text-[#53615B]">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#0F6B4F]" />
            A confirmation has been sent to your email. Please check your spam
            folder if it doesn’t appear shortly.
          </div>
        ) : (
          <p className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Your request reached our team, but the confirmation email could not
            be delivered. You do not need to submit again.
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Return home <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="btn-secondary"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-7 sm:p-9" aria-busy={status === "sending"}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Takes about 2 minutes</p>
          <h2 className="mt-2 text-2xl font-black text-[#17231F] sm:text-3xl">
            Book your free trial
          </h2>
        </div>
        <span className="hidden rounded-full bg-[#0F6B4F]/10 px-3 py-1.5 text-xs font-bold text-[#0F6B4F] sm:block">
          Free · No obligation
        </span>
      </div>

      <p className="mt-3 leading-7 text-[#66716C]">
        Tell us about the learner so we can match you with the right teacher.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="form-label">
          Full name <span aria-hidden="true" className="text-[#0F6B4F]">*</span>
          <input
            required
            autoComplete="name"
            name="name"
            minLength={2}
            maxLength={100}
            placeholder="Learner’s full name"
            className={fieldClass}
          />
        </label>

        <label className="form-label">
          Email <span aria-hidden="true" className="text-[#0F6B4F]">*</span>
          <input
            required
            type="email"
            inputMode="email"
            autoComplete="email"
            name="email"
            maxLength={254}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </label>

        <label className="form-label">
          Country
          <input
            name="country"
            autoComplete="country-name"
            maxLength={80}
            placeholder="e.g. United Kingdom"
            className={fieldClass}
          />
        </label>

        <label className="form-label">
          WhatsApp number <span className="font-normal text-[#818985]">(optional)</span>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            name="whatsapp"
            maxLength={40}
            placeholder="Include country code"
            className={fieldClass}
          />
        </label>

        <label className="form-label">
          Program
          <select name="program" className={fieldClass} defaultValue="Arabic Course">
            <option>Arabic Course</option>
            <option>Quran Classes</option>
            <option>Both</option>
          </select>
        </label>

        <label className="form-label">
          Class preference
          <select name="class-format" className={fieldClass} defaultValue="Not sure yet">
            <option>Private 1-to-1</option>
            <option>Small group</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>

      <label className="form-label mt-5">
        Preferred days and times
        <input
          name="availability"
          maxLength={300}
          placeholder="e.g. Weekdays after 6pm"
          className={fieldClass}
        />
        <span className="text-xs font-normal leading-5 text-[#818985]">
          We automatically include your device’s time zone.
        </span>
      </label>

      <label className="form-label mt-5">
        Learning goals <span className="font-normal text-[#818985]">(optional)</span>
        <textarea
          name="goals"
          rows={4}
          maxLength={2000}
          placeholder="Tell us the learner’s current level and what they hope to achieve."
          className={fieldClass}
        />
      </label>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && (
        <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700" role="alert">
          {error} If the problem continues, email us at hello@isnadinstitute.com.
        </p>
      )}

      <button
        className="btn-primary mt-6 min-w-48 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Sending request…
          </>
        ) : (
          <>
            Request my free trial <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-4 text-xs leading-5 text-[#818985]">
        By submitting, you agree that Isnad Institute may contact you about
        your enquiry. We do not sell or share your details.
      </p>
    </form>
  );
}

