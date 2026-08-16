"use client";

import { useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType: "contact",
          name: form.get("name"),
          email: form.get("email"),
          program: form.get("program"),
          message: form.get("message"),
          website: form.get("website"),
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send your message.");
      }

      formElement.reset();
      setStatus("success");
    } catch (submissionError) {
      console.error(submissionError);
      setError(submissionError.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex min-h-[460px] flex-col justify-center p-7 sm:p-9" role="status">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0F6B4F]/10 text-[#0F6B4F]">
          <Check className="h-7 w-7" strokeWidth={3} />
        </div>
        <h2 className="mt-6 text-3xl font-black tracking-[-.03em]">Message received</h2>
        <p className="mt-4 leading-7 text-[#66716C]">
          Thank you for contacting Isnad Institute. We’ll reply within 24 hours,
          in sha Allah.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-7 self-start">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-7 sm:p-9" aria-busy={status === "sending"}>
      <h2 className="text-2xl font-black text-[#17231F]">Send us a message</h2>
      <p className="mt-2 leading-7 text-[#66716C]">We usually reply within 24 hours.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="form-label">
          Name <span className="text-[#0F6B4F]">*</span>
          <input required name="name" minLength={2} maxLength={100} autoComplete="name" className="form-control" />
        </label>
        <label className="form-label">
          Email <span className="text-[#0F6B4F]">*</span>
          <input required type="email" name="email" maxLength={254} autoComplete="email" className="form-control" />
        </label>
      </div>

      <label className="form-label mt-5">
        I’m interested in
        <select name="program" className="form-control">
          <option>Arabic Course</option>
          <option>Quran Classes</option>
          <option>Both</option>
          <option>General question</option>
        </select>
      </label>

      <label className="form-label mt-5">
        Message <span className="text-[#0F6B4F]">*</span>
        <textarea required name="message" minLength={10} maxLength={2000} rows={6} className="form-control" />
      </label>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {error && <p role="alert" className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-70">
        {status === "sending" ? <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Sending…</> : <>Send message <ArrowRight className="ml-2 h-4 w-4" /></>}
      </button>
    </form>
  );
}

