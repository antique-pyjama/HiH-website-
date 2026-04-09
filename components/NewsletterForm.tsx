"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitNewsletterForm, type FormState } from "@/app/actions";
import { trackEvent } from "@/lib/analytics";

const initialState: FormState = {
  status: "idle",
  message: "",
};

export function NewsletterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(submitNewsletterForm, initialState);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      trackEvent("newsletter_signup_success");
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={action} className="space-y-5">
      <div>
        <label htmlFor="newsletter-email" className="block text-sm font-medium text-primary">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-[1.4rem] border border-transparent bg-white/80 px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(70,100,51,0.1)]"
          placeholder="you@example.com"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        onClick={() => trackEvent("newsletter_signup_attempt")}
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--primary-strong))] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-soft transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Joining..." : "Subscribe"}
      </button>
      {state.message ? (
        <p
          className={`rounded-2xl px-4 py-3 text-sm ${
            state.status === "success"
              ? "bg-[rgba(70,100,51,0.12)] text-primary"
              : "bg-[rgba(143,76,46,0.12)] text-secondary"
          }`}
        >
          {state.message}
        </p>
      ) : (
        <p className="text-sm leading-6 text-foreground-soft">
          Placeholder capture flow included. Connect to your newsletter platform later.
        </p>
      )}
    </form>
  );
}
