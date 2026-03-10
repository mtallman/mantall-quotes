export interface QuoteResponse {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  volume: number;
  avgVolume: number;
  open: number;
  previousClose: number;
  eps: number | null;
  pe: number | null;
  earningsAnnouncement: string | null;
  sharesOutstanding: number;
  timestamp: number;
}

export interface DividendResponse {
  date: string;
  label: string;
  adjDividend: number | null;
  symbol: string;
  dividend: number | null;
  recordDate: string | null;
  paymentDate: string | null;
  declarationDate: string | null;
}

export interface StockQuote extends QuoteResponse {
  exDividendDate: string | null;
  dividendPaymentDate: string | null;
  dividendsPerYear: number;
  divPerShare: number | null;
  lastUpdated: string | null;
}
