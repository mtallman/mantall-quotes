import { prisma } from "./db";
import type { QuoteResponse, DividendResponse, StockQuote } from "./types";

const FMP_BASE = "https://financialmodelingprep.com/api/v3";

function getApiKey(): string {
  const key = process.env.FMP_API;
  if (!key) throw new Error("FMP_API environment variable is not set");
  return key;
}

export async function fetchQuotes(symbols: string[]): Promise<QuoteResponse[]> {
  if (symbols.length === 0) return [];
  const apiKey = getApiKey();
  const symbolStr = symbols.join(",");
  const url = `${FMP_BASE}/quote/${encodeURIComponent(symbolStr)}?apikey=${apiKey}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`FMP quote API error: ${res.status}`);
  return res.json();
}

export async function fetchDividendCalendar(): Promise<DividendResponse[]> {
  const apiKey = getApiKey();
  const now = new Date();
  const from = new Date(now);
  from.setMonth(from.getMonth() - 1);
  const to = new Date(now);
  to.setMonth(to.getMonth() + 3);

  const strFrom = from.toISOString().split("T")[0];
  const strTo = to.toISOString().split("T")[0];

  const url = `${FMP_BASE}/stock_dividend_calendar?from=${strFrom}&to=${strTo}&apikey=${apiKey}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`FMP dividend API error: ${res.status}`);
  return res.json();
}

export async function updateDividends(): Promise<void> {
  const dividends = await fetchDividendCalendar();
  if (!dividends || dividends.length === 0) return;

  const stocks = await prisma.stock.findMany();

  for (const stock of stocks) {
    const div = dividends.find((d) => d.symbol === stock.symbol);
    if (div && div.dividend && div.dividend > 0) {
      await prisma.stock.update({
        where: { id: stock.id },
        data: {
          divPerShare: Math.round(div.dividend * 10000) / 10000,
          dividendPaymentDate: div.paymentDate ? new Date(div.paymentDate) : undefined,
          exDividendDate: div.recordDate ? new Date(div.recordDate) : undefined,
          lastUpdated: new Date(),
        },
      });
    }
  }
}

export async function getQuotesForUser(username: string): Promise<StockQuote[]> {
  // Get user's stocks from database
  const userStocks = await prisma.userStock.findMany({
    where: { user: { username: username.toLowerCase() } },
    include: { stock: true },
  });

  if (userStocks.length === 0) return [];

  const stocks = userStocks.map((us) => us.stock);
  const symbols = stocks.map((s) => s.symbol);

  // Fetch real-time quotes
  const quotes = await fetchQuotes(symbols);

  // Update dividends in background (don't block the response)
  updateDividends().catch(console.error);

  // Merge stock dividend data into quotes
  const result: StockQuote[] = quotes.map((quote) => {
    const stock = stocks.find((s) => s.symbol === quote.symbol);
    return {
      ...quote,
      exDividendDate: stock?.exDividendDate?.toISOString().split("T")[0] ?? null,
      dividendPaymentDate: stock?.dividendPaymentDate?.toISOString().split("T")[0] ?? null,
      dividendsPerYear: stock?.dividendsPerYear ?? 4,
      divPerShare: stock?.divPerShare ? Number(stock.divPerShare) : null,
      lastUpdated: stock?.lastUpdated?.toISOString() ?? null,
    };
  });

  return result;
}

export async function getUsers(): Promise<string[]> {
  const users = await prisma.user.findMany({ orderBy: { username: "asc" } });
  return users.map((u) => u.username);
}
