"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Formik } from "formik";
import { loginValidations } from "@/lib/Types";

const page = () => {
  return (
    <div className="flex items-center justify-center gap-5 flex-col mt-48">
      <div className="bg-neutral-800 p-10 px-20 rounded-xl flex flex-col items-center justify-center gap-7">
        <Link href={"/"} className="flex items-start justify-start w-full">
          <ArrowLeft />
        </Link>
        <div className=" flex items-center justify-center flex-col text-xl font-bold">
          <p className="">Login</p>
          <p className="text-sm pt-3 font-light">
            Enter your email and password.
          </p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidations}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-7">
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="px-4 py-6"
                placeholder="Enter your email"
              />
              {errors.email && touched.email && errors.email}
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="px-4 py-6"
                placeholder="Enter your password"
              />
              {errors.password && touched.password && errors.password}
              <Button className="px-7 py-6 bg-neutral-950 font-bold text-lg">
                Login
              </Button>
            </form>
          )}
        </Formik>
        <div className="font-light">
          Forget Password?{" "}
          <Link href={"/reset"} className="font-bold">
            Reset Here
          </Link>
        </div>
        <div className="font-light">
          Not logged in yet?{" "}
          <Link href={"/register"} className="font-bold">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
