"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContactForm, type FormState } from "@/app/actions";
import { trackEvent } from "@/lib/analytics";

const initialState: FormState = {
  status: "idle",
  message: "",
};

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      trackEvent("contact_submit_success");
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={action}
      className="rounded-[2rem] bg-panel p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-foreground-muted">
          Name
          <input
            name="name"
            type="text"
            required
            className="w-full rounded-2xl border border-transparent bg-surface-low px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(70,100,51,0.1)]"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-foreground-muted">
          Email
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border border-transparent bg-surface-low px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(70,100,51,0.1)]"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-foreground-muted">
          Phone or WhatsApp
          <input
            name="phone"
            type="text"
            className="w-full rounded-2xl border border-transparent bg-surface-low px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(70,100,51,0.1)]"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-foreground-muted">
          Inquiry type
          <select
            name="inquiryType"
            defaultValue="General question"
            className="w-full rounded-2xl border border-transparent bg-surface-low px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(70,100,51,0.1)]"
          >
            <option>General question</option>
            <option>Private group booking</option>
            <option>Family travel planning</option>
            <option>Press or partnership</option>
            <option>Custom itinerary</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block space-y-2 text-sm font-medium text-foreground-muted">
        Message
        <textarea
          name="message"
          required
          rows={6}
          className="w-full rounded-[1.5rem] border border-transparent bg-surface-low px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(70,100,51,0.1)]"
        />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          onClick={() => trackEvent("contact_submit_attempt")}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--primary-strong))] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-soft transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Sending..." : "Send inquiry"}
        </button>
        <p className="text-sm leading-6 text-foreground-soft">
          Placeholder form action included. Connect to email or CRM when ready.
        </p>
      </div>

      {state.message ? (
        <p
          className={`mt-5 rounded-2xl px-4 py-3 text-sm ${
            state.status === "success"
              ? "bg-[rgba(70,100,51,0.12)] text-primary"
              : "bg-[rgba(143,76,46,0.12)] text-secondary"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
