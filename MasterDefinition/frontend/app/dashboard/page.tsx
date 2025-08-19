"use client";
import Admin from "@/components/Admin";
import Faculty from "@/components/Faculty";
import Hod from "@/components/Hod";
import Student from "@/components/Student";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();

  return session?.user?.role === 1 ? (
    <Admin />
  ) : session?.user?.role === 2 ? (
    <Hod />
  ) : session?.user?.role === 3 ? (
    <Faculty />
  ) : session?.user?.role === 4 ? (
    <Student />
  ) : (
    redirect("/")
  );
};

export default Page;
