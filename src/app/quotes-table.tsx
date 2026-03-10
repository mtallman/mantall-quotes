import type { StockQuote } from "@/lib/types";

interface QuotesTableProps {
  quotes: StockQuote[];
}

function formatCAD(value: number): string {
  return value.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatPercent(value: number): string {
  return (value / 100).toLocaleString("en-CA", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatVolume(value: number): string {
  return value.toLocaleString("en-CA", { maximumFractionDigits: 0 });
}

export function QuotesTable({ quotes }: QuotesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-800 px-3 py-2 text-left font-bold">Symbol</th>
            <th className="border border-gray-800 px-3 py-2 text-left font-bold">Price</th>
            <th className="border border-gray-800 px-3 py-2 text-left font-bold">Change</th>
            <th className="border border-gray-800 px-3 py-2 text-left font-bold">Change Percent</th>
            <th className="border border-gray-800 px-3 py-2 text-left font-bold">Volume</th>
            <th className="border border-gray-800 px-3 py-2 text-left font-bold">Annual Dividends</th>
            <th className="border border-gray-800 px-3 py-2 text-left font-bold">Dividend Amount</th>
            <th className="border border-gray-800 px-3 py-2 text-left font-bold">Dividend Frequency</th>
            <th className="border border-gray-800 px-3 py-2 text-left font-bold">Next Dividend</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => {
            const isNegative = quote.change < 0;
            const isPositive = quote.change > 0;
            const rowBg = isNegative
              ? "bg-red-100"
              : isPositive
                ? "bg-green-100"
                : "";
            const priceColor = isNegative
              ? "text-red-600"
              : isPositive
                ? "text-green-600"
                : "";

            const divPerShare = quote.divPerShare ?? 0;
            const annualDiv = divPerShare * quote.dividendsPerYear;

            return (
              <tr key={quote.symbol} className={`${rowBg} font-semibold`}>
                <td className="border border-gray-800 px-3 py-2">{quote.symbol}</td>
                <td className={`border border-gray-800 px-3 py-2 ${priceColor}`}>
                  {formatCAD(quote.price)}
                </td>
                <td className={`border border-gray-800 px-3 py-2 ${priceColor}`}>
                  {formatCAD(quote.change)}
                </td>
                <td className={`border border-gray-800 px-3 py-2 ${priceColor}`}>
                  {formatPercent(quote.changesPercentage)}
                </td>
                <td className="border border-gray-800 px-3 py-2">
                  {formatVolume(quote.volume)}
                </td>
                <td className="border border-gray-800 px-3 py-2">
                  {quote.dividendsPerYear}
                </td>
                <td className="border border-gray-800 px-3 py-2">
                  {formatCAD(annualDiv)}
                </td>
                <td className="border border-gray-800 px-3 py-2">
                  {formatCAD(divPerShare)}
                </td>
                <td className="border border-gray-800 px-3 py-2">
                  {quote.dividendPaymentDate ?? "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
