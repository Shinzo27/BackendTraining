import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-20 rounded-lg flex flex-col items-center justify-center gap-8">
        <div>
          <h1 className="text-2xl font-bold">Login Here</h1>
        </div>
        <div className="flex items-center justify-center gap-6 flex-col">
          <Label>Enter Your Name</Label>
          <Input
            required
            type="text"
            className="border border-black"
            placeholder="Enter your name"
          />
          <Button>
            <Link href={"/products"}>Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
