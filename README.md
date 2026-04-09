# Halal in Hamburg

Launch-ready MVP website for `halalinhamburg.com`.

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

- Booking is routed through FareHarbor links.
- Contact and newsletter forms use placeholder server actions and should be connected before launch.
- Replace placeholder artwork and legal details before going live.

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
