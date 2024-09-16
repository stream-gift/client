"use client";

import { LoggedIn, LoggedOut, useUser } from "./user-provider";

export default function Home() {
  const { user } = useUser();

  return (
    <main className="min-h-screen p-12">
      <LoggedIn>Yessir we out here!</LoggedIn>
      <LoggedOut>Not Logged In</LoggedOut>

      <pre className="mt-4">
        {JSON.stringify({ user: { ...user, email: "*********" } }, null, 2)}
      </pre>
    </main>
  );
}
