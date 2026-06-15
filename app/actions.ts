"use server";

import { createBookingRequest, BookingValidationError } from "@/lib/bookings";
import { createStripeCheckoutSession, StripeConfigurationError } from "@/lib/stripe";
import { BookingRequestInput } from "@/lib/types";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export type BookingConfirmation = {
  bookingReference: string;
  tourTitle: string;
  date: string;
  time: string;
  guests: number;
  totalPriceLabel: string;
  paymentMethodLabel: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  selectedPreferences: string[];
};

export type BookingActionState = FormState & {
  confirmation?: BookingConfirmation;
  checkoutUrl?: string;
};

export async function submitContactForm(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please complete the required fields before sending your inquiry.",
    };
  }

  // TODO: Connect this action to the founder's preferred email, CRM, or automation tool.
  return {
    status: "success",
    message:
      "Thanks for reaching out. This MVP placeholder confirms submission and is ready to be connected to your inbox.",
  };
}

export async function submitNewsletterForm(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return {
      status: "error",
      message: "Please enter an email address before subscribing.",
    };
  }

  // TODO: Connect this action to ConvertKit, MailerLite, or your newsletter provider of choice.
  return {
    status: "success",
    message: "You are on the list. Connect a real newsletter provider here when launch data is ready.",
  };
}

export async function submitBookingRequest(
  input: BookingRequestInput,
): Promise<BookingActionState> {
  try {
    if (input.paymentMethod === "paypal") {
      return {
        status: "error",
        message: "PayPal is not connected yet. Please choose card payment or pay on arrival.",
      };
    }

    const { booking } = await createBookingRequest(input);

    if (booking.paymentMethod === "card") {
      const checkoutSession = await createStripeCheckoutSession(booking);

      return {
        status: "success",
        message: "Your booking request has been saved. Redirecting you to secure Stripe checkout.",
        checkoutUrl: checkoutSession.url ?? undefined,
      };
    }

    // TODO: Send guest confirmation and internal notification emails after persistence succeeds.

    return {
      status: "success",
      message:
        "Your booking request has been saved. We will follow up by email to confirm the details.",
      confirmation: {
        bookingReference: booking.bookingReference,
        tourTitle: booking.tourTitle,
        date: booking.date,
        time: booking.time,
        guests: booking.guests,
        totalPriceLabel: booking.totalPriceLabel,
        paymentMethodLabel: booking.paymentMethodLabel,
        fullName: booking.fullName,
        email: booking.email,
        phone: booking.phone,
        notes: booking.notes,
        selectedPreferences: booking.selectedPreferences,
      },
    };
  } catch (error) {
    if (error instanceof BookingValidationError) {
      return {
        status: "error",
        message: error.message,
      };
    }

    if (error instanceof StripeConfigurationError) {
      return {
        status: "error",
        message: error.message,
      };
    }

    console.error("Booking submission failed", error);

    return {
      status: "error",
      message:
        "We could not save your booking request just now. Please try again in a moment or contact us directly.",
    };
  }
}
