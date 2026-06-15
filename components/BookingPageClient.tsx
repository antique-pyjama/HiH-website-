"use client";

import { FormEvent, useState, useTransition } from "react";
import {
  submitBookingRequest,
  type BookingActionState,
  type BookingConfirmation,
} from "@/app/actions";
import { trackEvent } from "@/lib/analytics";
import { PaymentMethod, Tour } from "@/lib/types";
import { cn } from "@/lib/utils";

type BookingPageClientProps = {
  tours: Tour[];
  initialTourSlug?: string;
};

type PreferencesState = {
  prayerBreakInfo: boolean;
  halalFoodRecommendations: boolean;
  travelingWithChildren: boolean;
  privateTour: boolean;
  accessibilityNeeds: boolean;
};

const paymentLabels: Record<PaymentMethod, string> = {
  card: "Pay online by card",
  paypal: "PayPal",
  arrival: "Pay on arrival",
};

const availablePaymentMethods: PaymentMethod[] = ["card", "arrival"];

const preferenceLabels: Record<keyof PreferencesState, string> = {
  prayerBreakInfo: "Need prayer break information",
  halalFoodRecommendations: "Interested in halal food recommendations",
  travelingWithChildren: "Traveling with children",
  privateTour: "Prefer private tour",
  accessibilityNeeds: "Accessibility needs",
};

function toISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function BookingPageClient({
  tours,
  initialTourSlug,
}: BookingPageClientProps) {
  const today = toISODate(new Date());
  const defaultTour = tours.find((tour) => tour.slug === initialTourSlug) ?? tours[0];

  const [selectedTourSlug, setSelectedTourSlug] = useState(defaultTour?.slug ?? "");
  const [date, setDate] = useState(today);
  const [timeSlot, setTimeSlot] = useState(defaultTour?.timeSlots[0] ?? "");
  const [guests, setGuests] = useState(Math.min(2, defaultTour?.maxGuests ?? 2));
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [otherRequest, setOtherRequest] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("arrival");
  const [preferences, setPreferences] = useState<PreferencesState>({
    prayerBreakInfo: false,
    halalFoodRecommendations: true,
    travelingWithChildren: false,
    privateTour: false,
    accessibilityNeeds: false,
  });
  const [showErrors, setShowErrors] = useState(false);
  const [submissionState, setSubmissionState] = useState<BookingActionState>({
    status: "idle",
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const selectedTour =
    tours.find((tour) => tour.slug === selectedTourSlug) ?? tours[0];
  const confirmation = submissionState.status === "success" ? submissionState.confirmation ?? null : null;

  const totalPrice = selectedTour
    ? selectedTour.pricingMode === "per_person"
      ? selectedTour.basePrice * guests
      : selectedTour.basePrice
    : 0;

  const selectedPreferenceLabels = Object.entries(preferences)
    .filter(([, value]) => value)
    .map(([key]) => preferenceLabels[key as keyof PreferencesState]);

  const summaryLines = {
    tourTitle: selectedTour?.title ?? "",
    totalPriceLabel:
      selectedTour?.pricingMode === "per_person"
        ? `€${totalPrice} total for ${guests} guests`
        : `€${totalPrice} private group rate`,
    paymentMethodLabel: paymentLabels[paymentMethod],
  };

  const isValid =
    Boolean(selectedTourSlug) &&
    Boolean(date) &&
    Boolean(timeSlot) &&
    guests > 0 &&
    fullName.trim().length > 1 &&
    email.includes("@") &&
    phone.trim().length > 4 &&
    Boolean(paymentMethod);

  const handleTourChange = (tourSlug: string) => {
    const nextTour = tours.find((tour) => tour.slug === tourSlug);
    setSelectedTourSlug(tourSlug);
    setTimeSlot(nextTour?.timeSlots[0] ?? "");
    setGuests((currentGuests) => {
      if (!nextTour) {
        return currentGuests;
      }

      return Math.min(currentGuests, nextTour.maxGuests);
    });
    trackEvent("booking_tour_selected", { tour: tourSlug });
  };

  const togglePreference = (key: keyof PreferencesState) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleGuestChange = (value: string) => {
    const parsedValue = Number(value);
    const nextValue = Number.isNaN(parsedValue) ? 1 : parsedValue;
    setGuests(Math.min(Math.max(nextValue, 1), selectedTour.maxGuests));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowErrors(true);

    if (!selectedTour || !isValid) {
      return;
    }

    setSubmissionState({ status: "idle", message: "" });

    startTransition(async () => {
      const result = await submitBookingRequest({
        tourSlug: selectedTour.slug,
        date,
        timeSlot,
        guests,
        fullName,
        email,
        phone,
        notes: [notes.trim(), otherRequest.trim()].filter(Boolean).join(" | "),
        paymentMethod,
        selectedPreferences: selectedPreferenceLabels,
      });

      setSubmissionState(result);

      if (result.status === "success") {
        trackEvent("booking_submit_success", {
          tour: selectedTour.slug,
          paymentMethod,
          guests,
        });

        if (result.checkoutUrl) {
          window.location.assign(result.checkoutUrl);
        }
      }
    });
  };

  if (!selectedTour) {
    return null;
  }

  if (confirmation) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] bg-primary px-8 py-10 text-white shadow-soft">
          <p className="eyebrow text-white/70">Booking request received</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight">
            Thank you, {confirmation.fullName}.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/78">
            Your booking request has been saved in the system. We can now keep a real record of
            your chosen tour, date, guests, and preferences while automatic email notifications and
            online card payments are handled securely through Stripe.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/10 p-5">
              <p className="eyebrow text-white/60">Booking reference</p>
              <p className="mt-2 text-xl font-bold tracking-tight">{confirmation.bookingReference}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-5">
              <p className="eyebrow text-white/60">Payment selection</p>
              <p className="mt-2 text-xl font-bold tracking-tight">{confirmation.paymentMethodLabel}</p>
            </div>
          </div>
        </section>

        <aside className="rounded-[2rem] bg-panel p-8 shadow-soft">
          <h3 className="text-2xl font-bold tracking-tight text-primary">Booking details</h3>
          <div className="mt-6 space-y-4 text-base leading-7 text-foreground-muted">
            <p><strong className="text-primary">Tour:</strong> {confirmation.tourTitle}</p>
            <p><strong className="text-primary">Date:</strong> {confirmation.date}</p>
            <p><strong className="text-primary">Time:</strong> {confirmation.time}</p>
            <p><strong className="text-primary">Guests:</strong> {confirmation.guests}</p>
            <p><strong className="text-primary">Total:</strong> {confirmation.totalPriceLabel}</p>
            <p><strong className="text-primary">Email:</strong> {confirmation.email}</p>
            <p><strong className="text-primary">Phone:</strong> {confirmation.phone}</p>
            <p>
              <strong className="text-primary">Muslim-friendly preferences:</strong>{" "}
              {confirmation.selectedPreferences.length > 0
                ? confirmation.selectedPreferences.join(", ")
                : "None selected"}
            </p>
            <p>
              <strong className="text-primary">Notes:</strong>{" "}
              {confirmation.notes || "No additional notes shared."}
            </p>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-[2rem] bg-panel p-6 shadow-soft sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-secondary">Step 1</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary">
                Select your walking tour
              </h2>
            </div>
            <p className="hidden text-sm text-foreground-soft sm:block">
              Choose the route that best fits your trip.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tours.map((tour) => {
              const isSelected = tour.slug === selectedTourSlug;
              return (
                <button
                  key={tour.slug}
                  type="button"
                  onClick={() => handleTourChange(tour.slug)}
                  className={cn(
                    "rounded-[1.6rem] border p-5 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(63,95,57,0.18)]",
                    isSelected
                      ? "border-primary bg-[rgba(63,95,57,0.08)] shadow-soft"
                      : "border-[rgba(196,200,187,0.32)] bg-white/80 hover:border-primary/30 hover:bg-white",
                  )}
                >
                  <p className="text-sm uppercase tracking-[0.16em] text-secondary">
                    {tour.category.join(" · ")}
                  </p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-primary">
                    {tour.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-foreground-muted">
                    {tour.shortDescription}
                  </p>
                  <div className="mt-4 grid gap-2 text-sm text-foreground-soft">
                    <p>{tour.duration}</p>
                    <p>{tour.priceFrom}</p>
                    <p>{tour.maxGroupSize}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[2rem] bg-panel p-6 shadow-soft sm:p-8">
          <p className="eyebrow text-secondary">Step 2</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary">
            Choose a date and time
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-foreground-muted">
              Date
              <input
                type="date"
                min={today}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
                className="w-full rounded-2xl border border-transparent bg-surface-low px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(63,95,57,0.1)]"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-foreground-muted">
              Number of guests
              <input
                type="number"
                min={1}
                max={selectedTour.maxGuests}
                value={guests}
                onChange={(event) => handleGuestChange(event.target.value)}
                required
                className="w-full rounded-2xl border border-transparent bg-surface-low px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(63,95,57,0.1)]"
              />
            </label>
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-foreground-muted">Available time slots</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {selectedTour.timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    setTimeSlot(slot);
                    trackEvent("booking_timeslot_selected", {
                      tour: selectedTour.slug,
                      timeSlot: slot,
                    });
                  }}
                  className={cn(
                    "rounded-full px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(63,95,57,0.18)]",
                    slot === timeSlot
                      ? "bg-primary text-white shadow-soft"
                      : "bg-surface-low text-primary hover:bg-white",
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
            {showErrors && !timeSlot ? (
              <p className="mt-3 text-sm text-secondary">Please choose a time slot.</p>
            ) : null}
          </div>
          <p className="mt-5 text-sm leading-6 text-foreground-soft">{selectedTour.availabilityNote}</p>
        </section>

        <section className="rounded-[2rem] bg-panel p-6 shadow-soft sm:p-8">
          <p className="eyebrow text-secondary">Step 3</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary">
            Customer details
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-foreground-muted">
              Full name
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
                aria-invalid={showErrors && fullName.trim().length < 2}
                className="w-full rounded-2xl border border-transparent bg-surface-low px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(63,95,57,0.1)]"
              />
              {showErrors && fullName.trim().length < 2 ? (
                <span className="text-sm text-secondary">Please enter your full name.</span>
              ) : null}
            </label>
            <label className="space-y-2 text-sm font-medium text-foreground-muted">
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                aria-invalid={showErrors && !email.includes("@")}
                className="w-full rounded-2xl border border-transparent bg-surface-low px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(63,95,57,0.1)]"
              />
              {showErrors && !email.includes("@") ? (
                <span className="text-sm text-secondary">Please enter a valid email address.</span>
              ) : null}
            </label>
            <label className="space-y-2 text-sm font-medium text-foreground-muted">
              Phone number
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                aria-invalid={showErrors && phone.trim().length < 5}
                className="w-full rounded-2xl border border-transparent bg-surface-low px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(63,95,57,0.1)]"
              />
              {showErrors && phone.trim().length < 5 ? (
                <span className="text-sm text-secondary">Please enter a valid phone number.</span>
              ) : null}
            </label>
            <label className="space-y-2 text-sm font-medium text-foreground-muted">
              Optional notes
              <input
                type="text"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Arrival details, group context, or questions"
                className="w-full rounded-2xl border border-transparent bg-surface-low px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(63,95,57,0.1)]"
              />
            </label>
          </div>
        </section>

        <section className="rounded-[2rem] bg-panel p-6 shadow-soft sm:p-8">
          <p className="eyebrow text-secondary">Step 4</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary">
            Muslim-friendly preferences
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {Object.keys(preferences).map((key) => {
              const preferenceKey = key as keyof PreferencesState;
              const checked = preferences[preferenceKey];
              return (
                <label
                  key={preferenceKey}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-[1.5rem] border p-4 transition",
                    checked
                      ? "border-primary bg-[rgba(63,95,57,0.08)]"
                      : "border-[rgba(196,200,187,0.32)] bg-white/80",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => togglePreference(preferenceKey)}
                    className="mt-1"
                  />
                  <span className="text-sm leading-6 text-foreground-muted">
                    {preferenceLabels[preferenceKey]}
                  </span>
                </label>
              );
            })}
          </div>
          <label className="mt-5 block space-y-2 text-sm font-medium text-foreground-muted">
            Other special requests
            <textarea
              rows={4}
              value={otherRequest}
              onChange={(event) => setOtherRequest(event.target.value)}
              className="w-full rounded-[1.5rem] border border-transparent bg-surface-low px-4 py-3 text-foreground shadow-[inset_0_0_0_1px_var(--outline-ghost)] focus:border-primary focus:outline-none focus:ring-4 focus:ring-[rgba(63,95,57,0.1)]"
              placeholder="Share anything that would help us plan your experience respectfully and comfortably."
            />
          </label>
        </section>

        <section className="rounded-[2rem] bg-panel p-6 shadow-soft sm:p-8">
          <p className="eyebrow text-secondary">Step 5</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary">
            Choose a payment option
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {availablePaymentMethods.map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => {
                  setPaymentMethod(method);
                  trackEvent("booking_payment_selected", { paymentMethod: method });
                }}
                className={cn(
                  "rounded-[1.5rem] border p-5 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(63,95,57,0.18)]",
                  paymentMethod === method
                    ? "border-primary bg-[rgba(63,95,57,0.08)]"
                    : "border-[rgba(196,200,187,0.32)] bg-white/80",
                )}
              >
                <p className="text-lg font-bold tracking-tight text-primary">
                  {paymentLabels[method]}
                </p>
                <p className="mt-3 text-sm leading-6 text-foreground-muted">
                  {method === "arrival"
                    ? "Reserve now and settle payment directly with us later."
                    : "Pay securely by card through Stripe Checkout after your booking is saved."}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-panel p-6 shadow-soft sm:p-8">
          <p className="eyebrow text-secondary">Step 6</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary">
            Review and confirm
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] bg-surface-low p-5">
              <p className="text-sm uppercase tracking-[0.16em] text-foreground-soft">Tour</p>
              <p className="mt-2 text-lg font-bold tracking-tight text-primary">
                {summaryLines.tourTitle}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-surface-low p-5">
              <p className="text-sm uppercase tracking-[0.16em] text-foreground-soft">Timing</p>
              <p className="mt-2 text-lg font-bold tracking-tight text-primary">
                {date} at {timeSlot}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-surface-low p-5">
              <p className="text-sm uppercase tracking-[0.16em] text-foreground-soft">Payment</p>
              <p className="mt-2 text-lg font-bold tracking-tight text-primary">
                {summaryLines.paymentMethodLabel}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-foreground-soft">
            Booking requests are stored before payment. Card payments continue through Stripe
            Checkout; pay-on-arrival requests are sent for manual confirmation.
          </p>
          <button
            type="submit"
            disabled={!isValid || isPending}
            className={cn(
              "mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition",
              isValid && !isPending
                ? "bg-[linear-gradient(135deg,var(--primary),var(--primary-strong))] text-white shadow-soft hover:brightness-105"
                : "cursor-not-allowed bg-surface-high text-foreground-soft",
            )}
          >
            {isPending
              ? paymentMethod === "card"
                ? "Preparing checkout..."
                : "Saving booking..."
              : paymentMethod === "card"
                ? "Continue to secure checkout"
                : "Confirm booking request"}
          </button>
          {showErrors && !isValid ? (
            <p className="mt-4 text-sm text-secondary">
              Please complete the required booking details before confirming.
            </p>
          ) : null}
          {submissionState.status === "error" ? (
            <p className="mt-4 text-sm text-secondary">{submissionState.message}</p>
          ) : null}
        </section>
      </form>

      <aside className="space-y-6 lg:sticky lg:top-28">
        <section className="rounded-[2rem] bg-primary px-7 py-8 text-white shadow-soft">
          <p className="eyebrow text-white/70">Booking summary</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">{summaryLines.tourTitle}</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-white/78">
            <p><strong className="text-white">Date:</strong> {date || "Choose a date"}</p>
            <p><strong className="text-white">Time:</strong> {timeSlot || "Choose a slot"}</p>
            <p><strong className="text-white">Guests:</strong> {guests}</p>
            <p><strong className="text-white">Total:</strong> {summaryLines.totalPriceLabel}</p>
            <p><strong className="text-white">Payment:</strong> {summaryLines.paymentMethodLabel}</p>
            <p>
              <strong className="text-white">Preferences:</strong>{" "}
              {selectedPreferenceLabels.length > 0
                ? selectedPreferenceLabels.join(", ")
                : "None selected yet"}
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] bg-panel p-7 shadow-soft">
          <p className="eyebrow text-secondary">Selected tour details</p>
          <h3 className="mt-4 text-2xl font-bold tracking-tight text-primary">{selectedTour.title}</h3>
          <div className="mt-5 space-y-4 text-base leading-7 text-foreground-muted">
            <p><strong className="text-primary">Meeting point:</strong> {selectedTour.meetingPoint}</p>
            <p><strong className="text-primary">Languages:</strong> {selectedTour.languages.join(", ")}</p>
            <p><strong className="text-primary">Max group size:</strong> {selectedTour.maxGroupSize}</p>
            <p><strong className="text-primary">Included:</strong> {selectedTour.included[0]}</p>
          </div>
          <div className="mt-6 rounded-[1.5rem] bg-surface-low p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              Muslim-friendly features
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground-muted">
              {selectedTour.muslimFriendlyFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </section>
      </aside>
    </div>
  );
}
