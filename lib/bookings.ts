import { getTourBySlug } from "./content";
import type { BookingRecord, BookingRequestInput, PaymentMethod } from "./types";

type D1PreparedStatementLike = {
  bind(...values: unknown[]): {
    run(): Promise<unknown>;
  };
};

type D1DatabaseLike = {
  prepare(query: string): D1PreparedStatementLike;
};

type CloudflareEnvLike = {
  BOOKINGS_DB?: D1DatabaseLike;
};

export type BookingStorageMode = "d1" | "local-file";

export const paymentLabels: Record<PaymentMethod, string> = {
  card: "Pay online by card",
  paypal: "PayPal",
  arrival: "Pay on arrival",
};

export class BookingValidationError extends Error {}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function sanitizeNotes(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, 2000);
}

function sanitizePreferences(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].slice(0, 10);
}

function buildTotalPriceLabel(totalPrice: number, guests: number, pricingMode: "per_person" | "private_group") {
  return pricingMode === "per_person"
    ? `€${totalPrice} total for ${guests} guests`
    : `€${totalPrice} private group rate`;
}

function createBookingReference() {
  const suffix = crypto.randomUUID().split("-")[0]?.toUpperCase() ?? Date.now().toString().slice(-6);
  return `HIH-${suffix}`;
}

async function getCloudflareBookingsDatabase() {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const context = await getCloudflareContext({ async: true });
    const env = context?.env as CloudflareEnvLike | undefined;

    return env?.BOOKINGS_DB ?? null;
  } catch {
    return null;
  }
}

async function writeBookingToD1(database: D1DatabaseLike, booking: BookingRecord) {
  await database
    .prepare(
      `INSERT INTO booking_requests (
        id,
        booking_reference,
        created_at,
        tour_slug,
        tour_title,
        travel_date,
        time_slot,
        guests,
        total_price,
        total_price_label,
        payment_method,
        payment_method_label,
        full_name,
        email,
        phone,
        notes,
        selected_preferences
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      booking.id,
      booking.bookingReference,
      booking.createdAt,
      booking.tourSlug,
      booking.tourTitle,
      booking.date,
      booking.time,
      booking.guests,
      booking.totalPrice,
      booking.totalPriceLabel,
      booking.paymentMethod,
      booking.paymentMethodLabel,
      booking.fullName,
      booking.email,
      booking.phone,
      booking.notes,
      JSON.stringify(booking.selectedPreferences),
    )
    .run();
}

async function writeBookingToLocalFile(booking: BookingRecord) {
  const [{ mkdir, readFile, writeFile }, { join }] = await Promise.all([
    import("node:fs/promises"),
    import("node:path"),
  ]);
  const dataDirectory = join(process.cwd(), ".data");
  const bookingsFile = join(dataDirectory, "booking-requests.json");

  await mkdir(dataDirectory, { recursive: true });

  let existingBookings: BookingRecord[] = [];

  try {
    const rawFile = await readFile(bookingsFile, "utf8");
    existingBookings = JSON.parse(rawFile) as BookingRecord[];
  } catch (error) {
    const isMissingFile =
      error instanceof Error && "code" in error && error.code === "ENOENT";

    if (!isMissingFile) {
      throw error;
    }
  }

  existingBookings.unshift(booking);
  await writeFile(bookingsFile, JSON.stringify(existingBookings, null, 2));
}

function buildBookingRecord(input: BookingRequestInput): BookingRecord {
  const selectedTour = getTourBySlug(input.tourSlug);

  if (!selectedTour) {
    throw new BookingValidationError("Please choose a valid walking tour before continuing.");
  }

  if (!isIsoDate(input.date) || input.date < todayIsoDate()) {
    throw new BookingValidationError("Please choose a valid booking date.");
  }

  if (!selectedTour.timeSlots.includes(input.timeSlot)) {
    throw new BookingValidationError("Please choose one of the available time slots.");
  }

  const guests = Number(input.guests);

  if (!Number.isInteger(guests) || guests < 1 || guests > selectedTour.maxGuests) {
    throw new BookingValidationError("Please choose a valid guest count for this tour.");
  }

  if (input.fullName.trim().length < 2) {
    throw new BookingValidationError("Please enter your full name.");
  }

  if (!/^\S+@\S+\.\S+$/.test(input.email.trim())) {
    throw new BookingValidationError("Please enter a valid email address.");
  }

  if (input.phone.trim().length < 5) {
    throw new BookingValidationError("Please enter a valid phone number.");
  }

  if (!(input.paymentMethod in paymentLabels)) {
    throw new BookingValidationError("Please choose a payment option.");
  }

  const totalPrice =
    selectedTour.pricingMode === "per_person"
      ? selectedTour.basePrice * guests
      : selectedTour.basePrice;

  const selectedPreferences = sanitizePreferences(input.selectedPreferences);

  return {
    id: crypto.randomUUID(),
    bookingReference: createBookingReference(),
    createdAt: new Date().toISOString(),
    tourSlug: selectedTour.slug,
    tourTitle: selectedTour.title,
    date: input.date,
    time: input.timeSlot,
    guests,
    totalPrice,
    totalPriceLabel: buildTotalPriceLabel(totalPrice, guests, selectedTour.pricingMode),
    paymentMethod: input.paymentMethod,
    paymentMethodLabel: paymentLabels[input.paymentMethod],
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    notes: sanitizeNotes(input.notes),
    selectedPreferences,
  };
}

export async function createBookingRequest(input: BookingRequestInput) {
  const booking = buildBookingRecord(input);
  const d1Database = await getCloudflareBookingsDatabase();

  if (d1Database) {
    await writeBookingToD1(d1Database, booking);

    return {
      booking,
      storageMode: "d1" as BookingStorageMode,
    };
  }

  await writeBookingToLocalFile(booking);

  return {
    booking,
    storageMode: "local-file" as BookingStorageMode,
  };
}
