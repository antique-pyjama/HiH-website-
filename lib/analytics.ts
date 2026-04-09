"use client";

export function trackEvent(
  eventName: string,
  payload: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const detail = {
    event: eventName,
    ...payload,
    timestamp: new Date().toISOString(),
  };

  window.dispatchEvent(new CustomEvent("halalinhamburg:analytics", { detail }));

  const dataLayer = (
    window as Window & { dataLayer?: Array<Record<string, string | number | boolean | undefined>> }
  ).dataLayer;

  if (Array.isArray(dataLayer)) {
    dataLayer.push(detail);
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", detail);
  }
}
