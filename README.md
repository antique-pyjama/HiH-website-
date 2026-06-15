# Halal in Hamburg

Launch-ready MVP website for `halalhamburg.com`.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router

## Pages

- `/`
- `/tours`
- `/tours/[slug]`
- `/about`
- `/contact`
- `/information`
- `/privacy-policy`
- `/terms-and-conditions`
- `/impressum`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content structure

- `content/site-settings.json`
- `content/homepage.json`
- `content/faqs.json`
- `content/tours/*.json`

## Notes

- The site includes a dedicated booking request flow with real request persistence.
- Online payments and automatic email confirmations are still placeholder integrations.
- Contact and newsletter forms use placeholder server actions and should be connected before launch.
- Replace placeholder artwork and legal details before going live.

## Booking persistence

- In local development, booking requests are saved to `.data/booking-requests.json`.
- For Cloudflare production, connect a D1 database binding named `BOOKINGS_DB`.
- A migration file is included in `migrations/0001_create_booking_requests.sql`.

Example Cloudflare setup:

```bash
npx wrangler d1 create halalhamburg-bookings
npx wrangler d1 migrations apply BOOKINGS_DB --remote
```

## Cloudflare deployment

This project is prepared for Cloudflare Workers with OpenNext.

Useful commands:

```bash
npm run preview
npm run deploy
npm run cf:build
npm run cf:deploy
npm run cf-typegen
```
