import siteSettings from "@/content/site-settings.json";
import type { BookingRecord } from "./types";

type CloudflareStripeEnv = {
  STRIPE_SECRET_KEY?: string;
};

type StripeCheckoutSession = {
  id: string;
  url: string | null;
};

export class StripeConfigurationError extends Error {}

async function getStripeSecretKey() {
  if (process.env.STRIPE_SECRET_KEY) {
    return process.env.STRIPE_SECRET_KEY;
  }

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const context = await getCloudflareContext({ async: true });
    const env = context?.env as CloudflareStripeEnv | undefined;

    return env?.STRIPE_SECRET_KEY ?? null;
  } catch {
    return null;
  }
}

function appendParam(params: URLSearchParams, key: string, value: string | number) {
  params.append(key, String(value));
}

export async function createStripeCheckoutSession(booking: BookingRecord) {
  const stripeSecretKey = await getStripeSecretKey();

  if (!stripeSecretKey) {
    throw new StripeConfigurationError(
      "Stripe is not configured yet. Add STRIPE_SECRET_KEY in Cloudflare before taking card payments.",
    );
  }

  const params = new URLSearchParams();
  const successUrl = `${siteSettings.domain}/booking/success?session_id={CHECKOUT_SESSION_ID}&reference=${encodeURIComponent(
    booking.bookingReference,
  )}`;
  const cancelUrl = `${siteSettings.domain}/booking?tour=${encodeURIComponent(
    booking.tourSlug,
  )}&payment_cancelled=1`;

  appendParam(params, "mode", "payment");
  appendParam(params, "success_url", successUrl);
  appendParam(params, "cancel_url", cancelUrl);
  appendParam(params, "customer_email", booking.email);
  appendParam(params, "client_reference_id", booking.bookingReference);
  appendParam(params, "line_items[0][quantity]", 1);
  appendParam(params, "line_items[0][price_data][currency]", "eur");
  appendParam(params, "line_items[0][price_data][unit_amount]", booking.totalPrice * 100);
  appendParam(params, "line_items[0][price_data][product_data][name]", booking.tourTitle);
  appendParam(
    params,
    "line_items[0][price_data][product_data][description]",
    `${booking.date} at ${booking.time} for ${booking.guests} guest${booking.guests === 1 ? "" : "s"}`,
  );
  appendParam(params, "metadata[booking_id]", booking.id);
  appendParam(params, "metadata[booking_reference]", booking.bookingReference);
  appendParam(params, "metadata[tour_slug]", booking.tourSlug);
  appendParam(params, "payment_intent_data[metadata][booking_reference]", booking.bookingReference);
  appendParam(params, "payment_intent_data[metadata][tour_slug]", booking.tourSlug);

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const payload = (await response.json()) as StripeCheckoutSession & {
    error?: { message?: string };
  };

  if (!response.ok || !payload.url) {
    throw new Error(payload.error?.message ?? "Stripe could not create a checkout session.");
  }

  return payload;
}
