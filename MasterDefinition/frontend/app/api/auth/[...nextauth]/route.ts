import { NEXT_AUTH } from "@/services/authServices";
import NextAuth from "next-auth";

const handler = NextAuth(NEXT_AUTH);

export { handler as GET, handler as POST };
