"use client";

import { authClient } from "@/lib/auth-client";
import DashboardOverview from "./dashboardOverview/page";


export default function DashboardPage() {
  const { data: session, isPending } =
    authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        Loading...
      </div>
    );
  }

  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="p-6 text-center">
        User session not found.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <DashboardOverview userId={userId} />
    </main>
  );
}