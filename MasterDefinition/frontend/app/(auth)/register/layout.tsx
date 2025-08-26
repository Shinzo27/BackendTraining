import { NEXT_AUTH } from "@/services/authServices";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    return redirect("/dashboard");
  }
  return <div className="">{children}</div>;
}
