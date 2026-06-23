# Reimbursements Prototype

A reusable React prototype template with shareable URLs per screen.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173/get-reimbursed](http://localhost:5173/get-reimbursed) and upload a receipt (drag-drop or browse). The prototype fakes:

1. **Uploading** (~1.5s) — file appears in "Your receipts" with an uploading tag
2. **Extracting** (~2s) — status changes to purple "Extracting", skeleton loader on the right
3. **Form** — claim details populate with mock AI data (Title, Amount, Claim type marked with AI badges)

Timings and mock data are in `src/types/receipt.ts`.

## Add a new screen (e.g. screen2)

1. **Duplicate a page file**

   ```bash
   cp src/pages/GetReimbursedPage.tsx src/pages/Screen2Page.tsx
   ```

   Edit the content in `Screen2Page.tsx`.

2. **Register the route** in `src/routes.tsx`:

   ```tsx
   import { Screen2Page } from '@/pages/Screen2Page'

   // Add to prototypeRoutes:
   { path: '/screen2', name: 'Screen 2', description: 'Your variation' },

   // Add to routes:
   { path: '/screen2', element: <Screen2Page /> },
   ```

3. **Share the link:** `http://localhost:5173/screen2` (or your deployed URL + `/screen2`).

The shared shell (`AppShell`, `Sidebar`, design tokens) stays the same — only the page component changes.

## Project structure

```
src/
├── shell/          # Reusable app chrome (sidebar, layout)
├── components/     # Shared UI building blocks
├── pages/          # One file per screen / variation
├── routes.tsx      # Route registry + prototype index metadata
└── styles/         # Design tokens + Tailwind
```

## Deploy

```bash
npm run build
```

Deploy the `dist/` folder to Netlify, Vercel, or any static host. SPA fallback is included (`public/_redirects` for Netlify, `public/vercel.json` for Vercel) so direct links like `/screen2` work on refresh.

## Reuse for another prototype

Copy this folder, rename the project, delete existing pages in `src/pages/`, and add new pages + routes. Keep `shell/`, `components/`, and `styles/` as your template foundation.
