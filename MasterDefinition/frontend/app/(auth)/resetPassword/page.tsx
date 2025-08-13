/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Formik } from "formik";
import { resetPasswordValidation } from "@/lib/Types";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center gap-5 flex-col mt-48">
      <div className="bg-neutral-800 p-10 px-20 rounded-xl flex flex-col items-center justify-center gap-7">
        <Link href={"/login"} className="flex items-start justify-start w-full">
          <ArrowLeft />
        </Link>
        <div className=" flex items-center justify-center flex-col text-xl font-bold">
          <p className="">Reset password</p>
          <p className="text-sm pt-3 font-light">Enter new password.</p>
        </div>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={resetPasswordValidation}
          onSubmit={async (values) => {
            try {
              const { data } = await axios.post(
                "http://localhost:8000/api/users/resetPassword",
                { password: values.password },
                { withCredentials: true }
              );
              if (data.success) {
                toast.success(data.message);
                router.push("/login");
              }
            } catch (error: any) {
              toast.error(error.response.data.error);
            }
          }}
          className="flex flex-col items-center justify-center gap-7"
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center gap-7"
            >
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="px-4 py-6"
                placeholder="Enter new password"
              />
              {errors.password && touched.password && errors.password}
              <Input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                className="px-4 py-6"
                placeholder="Enter confirm password"
              />
              {errors.confirmPassword &&
                touched.confirmPassword &&
                errors.confirmPassword}
              <Button
                type="submit"
                className="px-7 py-6 bg-neutral-950 font-bold text-lg"
              >
                Reset password
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Page;
