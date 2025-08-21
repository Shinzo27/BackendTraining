"use client";
import { registerInitialValue } from "@/lib/Types";
import { registerValidations } from "@/lib/Validations";
import { Formik } from "formik";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { registerStudentService } from "@/services/authServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import RegisterForm from "@/components/RegisterForm";

const Page = () => {
  const [departments, setDepartments] = useState([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get("/statics/getDepartments", {
        withCredentials: true,
      });
      setDepartments(data.department);
    }
    fetchData();
  }, []);

  const handleUpdateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFile(e.target.files[0]);
  };
  const router = useRouter();

  return (
    <div className="flex items-center justify-center gap-5 flex-col mt-8">
      <div className="bg-neutral-800 p-10 px-20 rounded-xl flex flex-col items-center justify-center gap-7">
        <Link href={"/"} className="flex items-start justify-start w-full">
          <ArrowLeft />
        </Link>
        <div className=" flex items-center justify-center flex-col text-xl font-bold">
          <p className="">Register</p>
          <p className="text-sm pt-3 font-light">Enter details correctly!</p>
        </div>
        <Formik
          initialValues={registerInitialValue}
          validationSchema={registerValidations}
          onSubmit={async (values, { resetForm }) => {
            if (!file) return toast.error("Select correct file");
            const register = await registerStudentService(values, file, "4");
            if (register.success) {
              toast.success(register.message);
              router.push("/login");
              resetForm();
            } else {
              toast.error(register);
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
            setFieldValue,
          }) => (
            <RegisterForm
              handleUpdateFile={handleUpdateFile}
              departments={departments}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
            />
          )}
        </Formik>
        <div className="font-light">
          Already Logged In?{" "}
          <Link href={"/login"} className="font-bold">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
