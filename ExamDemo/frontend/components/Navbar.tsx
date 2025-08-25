import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-8">
      <div className="font-bold text-2xl">Groffers</div>
      <div className="flex items-center justify-center gap-4">
        <div className="font-semibold text-lg">
          <Link href={"/products"}>Sales</Link>
        </div>
        <div className="font-semibold text-lg">
          <Link href={"/purchases"}>Purchases</Link>
        </div>
        <div className="font-semibold text-lg">
          <Link href={"/cart"}>Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
