"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="text-white flex items-center justify-between px-10 py-4">
      <div className="font-bold text-3xl">LMS</div>
      <div className="flex items-center justify-around gap-10 text-lg ">
        {session?.user ? (
          <>
            <Link href={"/login"} className="font-bold">
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
