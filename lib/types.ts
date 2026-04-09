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
    image: string;
    imageAlt: string;
    asideLabel: string;
    asideValue: string;
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
  faqPreviewCount: number;
  faqPreview: FAQItem[];
};

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
  meetingPoint: string;
  category: string[];
  halalNotes: string[];
  included: string[];
  excluded: string[];
  audience: string[];
  featured: boolean;
  active: boolean;
  bookingProvider: string;
  bookingUrl: string;
  faq: FAQItem[];
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
