# Hanzo portfolio

A static React and Vite portfolio for photography, editing, and design work.

## Local setup

Prerequisites: a current Node.js LTS release and npm.

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a local environment file:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   On macOS or Linux, use `cp .env.example .env.local` instead.

3. To enable the contact form, set `VITE_FORMSPREE_ENDPOINT` in `.env.local` to the endpoint supplied by Formspree. If it remains blank, the form deliberately prevents submission and displays a configuration message.

4. Start the development server:

   ```sh
   npm run dev
   ```

   Vite serves the site at `http://localhost:3000` by default.

## Available commands

- `npm run dev` — start the local development server.
- `npm run lint` — run the TypeScript static check.
- `npm run build` — create the production site in `dist/`.
- `npm run preview` — serve the production build locally.
- `npm run optimize:images` — regenerate display-size WebP assets from the preserved originals.

## Image workflow

Original photographs are preserved in `photography-originals/` and are not copied into the production build. The image optimization script creates gallery thumbnails in `public/photography/thumbs/` and larger lightbox versions in `public/photography/lightbox/`. Original design artwork remains in `design/`; optimized display variants are generated in `public/images/`.

Run `npm run optimize:images` after adding or replacing source photographs. Keep the ordered photo metadata and visible-content alt text in `src/data/photos.ts` in sync with the generated files.

## Production build and deployment

Run `npm run lint` and `npm run build`, then publish the generated `dist/` directory to a static host. Set `VITE_FORMSPREE_ENDPOINT` in the host's build environment if contact submission should be active. Vite variables are compiled into client JavaScript, so this value must be a client-safe Formspree form endpoint—not a private API key or server secret.

The production site is available at [https://hanzoo.vercel.app](https://hanzoo.vercel.app). Canonical, social-sharing, structured-data, sitemap, and robots metadata use this production origin.

Never commit `.env.local` or a real endpoint without first confirming that the value is intended to be public client configuration.
