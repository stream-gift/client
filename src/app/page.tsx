"use client";

import { LoggedIn, LoggedOut, useUser } from "./user-provider";

export default function Home() {
  const { user } = useUser();

  return (
    <main className="min-h-screen">
      <div></div>

      <LoggedIn>
        Yessir we out here!
        <pre className="mt-4">
          {JSON.stringify({ user: { ...user, email: "*********" } }, null, 2)}
        </pre>
      </LoggedIn>
      <LoggedOut>Not Logged In</LoggedOut>
    </main>
  );
}
