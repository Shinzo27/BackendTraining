'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Formik } from "formik";
import { resetValidations } from "@/lib/Types";

const page = () => {
    return (
        <div className="flex items-center justify-center gap-5 flex-col mt-48">
      <div className="bg-neutral-800 p-10 px-20 rounded-xl flex flex-col items-center justify-center gap-7">
        <Link href={"/login"} className="flex items-start justify-start w-full">
          <ArrowLeft />
        </Link>
        <div className=" flex items-center justify-center flex-col text-xl font-bold">
          <p className="">Reset password</p>
          <p className="text-sm pt-3 font-light">
            Enter your email.
          </p>
        </div>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={resetValidations}
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
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-7">
              <Input
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="px-4 py-6"
                placeholder="Enter your email"
              />
              {errors.email && touched.email && errors.email}
              <Button className="px-7 py-6 bg-neutral-950 font-bold text-lg">
                Get OTP
              </Button> 
            </form>
          )}
        </Formik>
      </div>
    </div>
    );
}

export default page;