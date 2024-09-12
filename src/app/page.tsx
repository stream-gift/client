"use client";

import { LoggedIn, LoggedOut, useUser } from "./user-provider";

export default function Home() {
  const { user } = useUser();

  return (
    <main className="flex min-h-screen p-12">
      <LoggedIn>Logged In</LoggedIn>
      <LoggedOut>Not Logged In</LoggedOut>

      <pre className="mt-10">{JSON.stringify({ user }, null, 2)}</pre>
    </main>
  );
}
