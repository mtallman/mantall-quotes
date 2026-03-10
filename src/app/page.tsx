import { getQuotesForUser, getUsers } from "@/lib/fmp";
import { QuotesTable } from "./quotes-table";
import { UserSelector } from "./user-selector";

interface PageProps {
  searchParams: Promise<{ username?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const username = params.username ?? "gord";
  const [quotes, users] = await Promise.all([
    getQuotesForUser(username),
    getUsers(),
  ]);

  return (
    <div>
      <div className="mb-4">
        <UserSelector users={users} currentUser={username} />
      </div>
      {quotes.length === 0 ? (
        <p className="text-gray-500">No stocks found for user &ldquo;{username}&rdquo;.</p>
      ) : (
        <QuotesTable quotes={quotes} />
      )}
    </div>
  );
}
