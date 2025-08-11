import Link from "next/link";

const Hero = () => {
    return (
        <div className="h-screen text-white flex items-center justify-center flex-col gap-5">
            <p className="text-4xl font-bold">Welcome to LMS.</p>
            <Link href={'/login'} className="bg-neutral-700 px-6 py-3 font-bold rounded-lg">
                Login
            </Link>
        </div>
    );
}

export default Hero;