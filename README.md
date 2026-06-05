# SunCart - Summer Essentials Store

SunCart is a responsive Next.js App Router ecommerce single-page experience for summer essentials. It highlights sunscreen, cooling care, hydration, beach gear, and accessories with a green/yellow summer theme.

## Live URL

Live deployment: add your Vercel or Render URL here after hosting.

## Key Features

- Responsive navbar and footer across mobile, tablet, and desktop.
- Home page with summer sale hero, popular products, care tips, and brand cards.
- Product catalog powered by local JSON data.
- Protected product details pages that redirect unauthenticated users to login and return them after authentication.
- Better Auth email/password authentication with optional Google OAuth.
- Profile page showing user name, email, image, and Better Auth-powered profile updates.
- Tailwind CSS 4 and DaisyUI 5 styling with a custom SunCart theme.
- Animate.css page entrance animation.

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- DaisyUI 5
- Better Auth
- better-sqlite3
- Animate.css
- Lucide React

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
BETTER_AUTH_SECRET=replace-with-a-32-character-or-longer-secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_TRUSTED_ORIGINS=http://localhost:3000,https://sun-cart-orpin.vercel.app
SQLITE_DB_PATH=./suncart.sqlite
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Google login requires valid `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`. In Google Cloud, add these OAuth values:

- Authorized JavaScript origin: `https://sun-cart-orpin.vercel.app`
- Authorized redirect URI: `https://sun-cart-orpin.vercel.app/api/auth/callback/google`

On Vercel, set `BETTER_AUTH_URL` to `https://sun-cart-orpin.vercel.app`. Email/password auth works with the local SQLite database.

## Getting Started

```bash
npm install
npm run db:migrate
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run db:migrate
npm run lint
npm run build
npm run start
```

## Notes

- The product data lives in `src/data/products.json`.
- Protected routes use Better Auth sessions and Next 16 `proxy.js`.
- The local SQLite database file is ignored by git.
