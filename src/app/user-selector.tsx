"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface UserSelectorProps {
  users: string[];
  currentUser: string;
}

export function UserSelector({ users, currentUser }: UserSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("username", e.target.value);
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="user-select" className="font-semibold text-sm">
        Portfolio:
      </label>
      <select
        id="user-select"
        value={currentUser}
        onChange={handleChange}
        className="border border-gray-300 rounded px-2 py-1 text-sm capitalize"
      >
        {users.map((u) => (
          <option key={u} value={u} className="capitalize">
            {u}
          </option>
        ))}
      </select>
    </div>
  );
}
