"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { api } from "@/lib/api";

const Navbar = () => {
  const { data: session } = useSession();
  const handleLogout = async () => {
    try {
      const { data } = await api.get("/users/logout");
      if (data.success) {
        await signOut({ redirect: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white flex items-center justify-between px-10 py-4">
      <div className="font-bold text-3xl">LMS</div>
      <div className="flex items-center justify-around gap-10 text-lg ">
        {session?.user ? (
          <>
            <Link href={"/login"} className="font-bold hidden sm:block">
              {session.user.name}
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
