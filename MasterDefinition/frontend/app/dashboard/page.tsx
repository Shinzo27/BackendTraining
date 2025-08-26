"use client";
import Admin from "@/components/Admin/Admin";
import Faculty from "@/components/Faculty/Faculty";
import Hod from "@/components/Hod/Hod";
import Loader from "@/components/Loader";
import Student from "@/components/Student/Student";
import { useSession } from "next-auth/react";

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
    <Loader />
  );
};

export default Page;
