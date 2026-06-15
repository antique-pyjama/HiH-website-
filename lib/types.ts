export type FAQItem = {
  question: string;
  answer: string;
};

export type SiteSettings = {
  siteName: string;
  domain: string;
  description: string;
  tagline: string;
  primaryBookingUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsApp: string;
  contactLocation: string;
  newsletterBlurb: string;
};

export type HomepageContent = {
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    tertiaryCtaLabel: string;
    tertiaryCtaHref: string;
    image: string;
    imageAlt: string;
    asideLabel: string;
    asideValue: string;
    highlights: string[];
    metrics: Array<{
      label: string;
      value: string;
    }>;
  };
  intro: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    image: string;
    imageAlt: string;
    stats: Array<{
      label: string;
      value: string;
    }>;
  };
  positioning: string;
  trustPoints: Array<{
    number: string;
    title: string;
    description: string;
  }>;
  valueSection: {
    description: string;
    points: Array<{
      kicker: string;
      title: string;
      description: string;
    }>;
  };
  testimonial: {
    quote: string;
    attribution: string;
    title: string;
  };
  faqPreviewCount: number;
  faqPreview: FAQItem[];
};

export type TourPricingMode = "per_person" | "private_group";
export type PaymentMethod = "card" | "paypal" | "arrival";

export type Tour = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  heroImageAlt: string;
  gallery: string[];
  duration: string;
  priceFrom: string;
  basePrice: number;
  pricingMode: TourPricingMode;
  meetingPoint: string;
  meetingNeighborhood: string;
  category: string[];
  muslimFriendlyFeatures: string[];
  included: string[];
  excluded: string[];
  audience: string[];
  routeHighlights: string[];
  languages: string[];
  maxGroupSize: string;
  maxGuests: number;
  timeSlots: string[];
  availabilityNote: string;
  featured: boolean;
  active: boolean;
  bookingProvider: string;
  bookingUrl: string;
  faq: FAQItem[];
};

export type BookingRequestInput = {
  tourSlug: string;
  date: string;
  timeSlot: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  paymentMethod: PaymentMethod;
  selectedPreferences: string[];
};

export type BookingRecord = {
  id: string;
  bookingReference: string;
  createdAt: string;
  tourSlug: string;
  tourTitle: string;
  date: string;
  time: string;
  guests: number;
  totalPrice: number;
  totalPriceLabel: string;
  paymentMethod: PaymentMethod;
  paymentMethodLabel: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  selectedPreferences: string[];
};

export type LegalContent = {
  privacyPolicy: {
    title: string;
    intro: string;
    sections: Array<{
      heading: string;
      paragraphs: string[];
    }>;
  };
  termsAndConditions: {
    title: string;
    intro: string;
    sections: Array<{
      heading: string;
      paragraphs: string[];
    }>;
  };
};
