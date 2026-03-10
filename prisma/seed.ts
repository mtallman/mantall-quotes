import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.userStock.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.user.deleteMany();

  // Seed stocks
  const stocksData = [
    { symbol: "ALA.TO", dividendsPerYear: 4 },
    { symbol: "AQN.TO", dividendsPerYear: 4 },
    { symbol: "ARX.TO", dividendsPerYear: 4, divPerShare: 0.17, dividendPaymentDate: new Date("2024-10-15") },
    { symbol: "BCE.TO", dividendsPerYear: 4 },
    { symbol: "BIPC.TO", dividendsPerYear: 4 },
    { symbol: "BNS.TO", dividendsPerYear: 4, divPerShare: 1.06, dividendPaymentDate: new Date("2024-10-29") },
    { symbol: "CNQ.TO", dividendsPerYear: 4 },
    { symbol: "CP.TO", dividendsPerYear: 4 },
    { symbol: "ENB.TO", dividendsPerYear: 4 },
    { symbol: "FRU.TO", dividendsPerYear: 12 },
    { symbol: "LSPD.TO", dividendsPerYear: 4 },
    { symbol: "MFC.TO", dividendsPerYear: 4 },
    { symbol: "MTL.TO", dividendsPerYear: 4 },
    { symbol: "NTR.TO", dividendsPerYear: 4 },
    { symbol: "POW.TO", dividendsPerYear: 4 },
    { symbol: "PPL.TO", dividendsPerYear: 4 },
    { symbol: "SLF.TO", dividendsPerYear: 4 },
    { symbol: "RY.TO", dividendsPerYear: 4, divPerShare: 1.42, dividendPaymentDate: new Date("2024-11-22") },
    { symbol: "T.TO", dividendsPerYear: 4 },
    { symbol: "TD.TO", dividendsPerYear: 4, divPerShare: 1.02, dividendPaymentDate: new Date("2024-10-31") },
    { symbol: "MSFT", dividendsPerYear: 4 },
  ];

  const stocks: Record<string, { id: number }> = {};
  for (const s of stocksData) {
    const stock = await prisma.stock.create({
      data: {
        symbol: s.symbol,
        dividendsPerYear: s.dividendsPerYear,
        divPerShare: s.divPerShare ?? null,
        dividendPaymentDate: s.dividendPaymentDate ?? null,
      },
    });
    stocks[s.symbol] = stock;
  }

  // Seed users
  const gord = await prisma.user.create({ data: { username: "gord" } });
  const mike = await prisma.user.create({ data: { username: "mike" } });
  const bev = await prisma.user.create({ data: { username: "bev" } });

  // Seed user-stock associations
  const associations = [
    // gord's stocks
    { userId: gord.id, symbols: ["ALA.TO", "AQN.TO", "ARX.TO", "BCE.TO", "BNS.TO", "ENB.TO", "FRU.TO", "NTR.TO", "PPL.TO", "SLF.TO", "RY.TO", "T.TO", "TD.TO"] },
    // mike's stocks
    { userId: mike.id, symbols: ["BCE.TO", "BNS.TO", "ENB.TO", "SLF.TO", "RY.TO", "MSFT"] },
    // bev's stocks
    { userId: bev.id, symbols: ["AQN.TO", "ARX.TO", "BCE.TO", "BIPC.TO", "BNS.TO", "CNQ.TO", "CP.TO", "ENB.TO", "FRU.TO", "LSPD.TO", "MFC.TO", "MTL.TO", "POW.TO", "RY.TO", "SLF.TO", "T.TO"] },
  ];

  for (const assoc of associations) {
    for (const symbol of assoc.symbols) {
      await prisma.userStock.create({
        data: {
          userId: assoc.userId,
          stockId: stocks[symbol].id,
        },
      });
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
