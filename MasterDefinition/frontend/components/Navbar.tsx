/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { data } = await api.get("/users/logout");
      if (data.success) {
        await signOut({ redirect: false });
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="text-white flex items-center justify-between px-10 py-4">
      <div className="font-bold text-3xl">LMS</div>
      <div className="flex items-center justify-around gap-10 text-lg ">
        {session?.user ? (
          <>
            <Link href={"/profile"} className="font-bold hidden sm:block">
              {session.user.name}
            </Link>
            <Link href={"/dashboard"} className="font-bold hidden sm:block">
              Dashboard
            </Link>
            <Button
              onClick={handleLogout}
              className="font-bold text-lg cursor-pointer bg-neutral-700"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href={"/login"} className="font-semibold">
              Login
            </Link>
            <Link href={"/register"} className="font-semibold">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
