import Link from "next/link";

const Navbar = () => {
    return (
        <div className="text-white flex items-center justify-between px-10 py-4">
            <div className="font-bold text-3xl">
                LMS
            </div>
            <div className="flex items-center justify-around gap-10 text-lg ">
                <Link href={'/login'} className="font-semibold">Login</Link>
                <Link href={'/register'} className="font-semibold">Register</Link>
            </div>
        </div>
    );
}

export default Navbar;