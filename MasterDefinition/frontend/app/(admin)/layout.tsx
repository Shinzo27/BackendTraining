import { NEXT_AUTH } from "@/services/authServices";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(NEXT_AUTH);
  if (!session?.user || session?.user?.role != 1) {
    return redirect("/");
  }
  return <div className="min-h-screen">{children}</div>;
}
