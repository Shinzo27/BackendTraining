/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerStudent } from "@/lib/Types";
import axios from "axios";
import toast from "react-hot-toast";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";

export const registerStudentService = async (
  values: registerStudent,
  file: File,
  roleId: string
) => {
  try {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("gender", values.gender);
    formData.append("gr_number", values.gr_number);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("department", values.department);
    formData.append("className", values.className);
    formData.append("roleId", roleId);
    formData.append("image", file, file.name);

    const object = Object.fromEntries(formData.entries());

    const { data } = await axios.post(
      "http://localhost:8000/api/users/signup",
      {
        ...object,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success === true) {
      toast.success(data.message);
    }
  } catch (error: any) {
    console.log(error);
    // const errorMessage = error.message || ""
    toast.error(error.response.data.error);
  }
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the 'id' property
      name: string;
      email: string;
      role: number;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string; // Add the 'id' property
    customField: string; // Add your custom field
  }
}

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          if (!credentials.email || !credentials.name)
            throw new Error("Credentials not found!");

          return {
            id: credentials.id,
            name: credentials.name,
            email: credentials.email,
            role: Number(credentials.role),
            token: credentials.token,
          };
        } catch (error: any) {
          return error.message;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.token = token.token;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
