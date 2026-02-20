# DriveNation

DriveNation is a premium pre-owned luxury car website built with Next.js, React, TypeScript, and Tailwind CSS.

It showcases a luxury dealership experience with inventory browsing, car detail pages, finance estimation, sell/trade flow, service booking, and sign-in UI.

## Highlights

- Elegant luxury-focused UI with responsive design
- Inventory list with sorting by year, price, and mileage
- Car detail experience with gallery and spec blocks
- EMI calculator on the finance page
- Sell/trade and service appointment form flows
- Mobile-friendly navigation with persistent floating WhatsApp CTA

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## Project Structure

```text
app/
   globals.css
   layout.tsx
   page.tsx
components/
   Layout.tsx
   pages/
      Home.tsx
      Inventory.tsx
      Details.tsx
      Finance.tsx
      SellCar.tsx
      Service.tsx
      Login.tsx
types.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Available Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run start` — run production build locally

## Notes

- This project currently uses in-memory/sample data from `types.ts` (`SAMPLE_CARS`).
- There is no backend/API integration yet.
- Most forms are UI-first and not connected to persistence endpoints.

## Deployment

This is a standard Next.js app and can be deployed on platforms like Vercel.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.

## Security

Please report vulnerabilities as described in [SECURITY.md](SECURITY.md).

## License

No license file has been added yet. Add one before open-source distribution.
