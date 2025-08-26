"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Hero = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      return router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="h-screen text-white flex items-center justify-center flex-col gap-5">
      <p className="text-4xl font-bold">Welcome to LMS.</p>
      <p>Manage your leaves at one place!</p>
      <Link
        href={"/login"}
        className="bg-neutral-700 px-6 py-3 font-bold rounded-lg"
      >
        Login
      </Link>
    </div>
  );
};

export default Hero;
