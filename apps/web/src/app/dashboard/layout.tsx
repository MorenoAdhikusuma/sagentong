import React from "react";
import { auth } from "@sagentong/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F4F7F6]">
      {/* Sidebar - Fixes to the left */}
      <Sidebar roles={session.user.role as any} session={session} />

      {/* Main Content Area - Takes up remaining space and scrolls */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
