# Mantall Stock Quotes

A stock quotes and dividend tracking application for Canadian dividend investors. Built with Next.js, Vercel Postgres, and the Financial Modeling Prep API.

## Features

- Real-time stock quotes from Financial Modeling Prep API
- Dividend tracking with payment dates and frequencies
- Multiple user portfolios (switch via dropdown)
- Color-coded price changes (green/red)
- Canadian dollar formatting

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 (App Router)
- **Database**: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) with [Prisma](https://www.prisma.io/) ORM
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **API**: [Financial Modeling Prep](https://financialmodelingprep.com/)
- **Hosting**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- A [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) database
- A [Financial Modeling Prep](https://financialmodelingprep.com/) API key

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mtallman/mantall-quotes.git
   cd mantall-quotes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment template and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

4. Push the database schema:
   ```bash
   npx prisma db push
   ```

5. Seed the database:
   ```bash
   npm run prisma:seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deploy to Vercel

1. Push to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Create a Vercel Postgres database in the project's Storage tab
4. Add the `FMP_API` environment variable in Settings → Environment Variables
5. Run `npx prisma db push` and `npm run prisma:seed` via Vercel CLI or locally connected to the production database

## Users

The app comes seeded with three portfolios:
- **gord** — 13 Canadian dividend stocks
- **mike** — 5 Canadian + 1 US stock
- **bev** — 16 Canadian stocks
