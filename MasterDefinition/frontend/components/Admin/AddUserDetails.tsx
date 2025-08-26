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
import AddUserForm from "../AddUserForm";

const AddUserDetails = ({ roleId }: { roleId: number }) => {
  const [departments, setDepartments] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

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

  return (
    <div className="flex items-center justify-center gap-5 flex-col mt-20">
      <div className="bg-neutral-800 p-10 px-20 rounded-xl flex flex-col items-center justify-center gap-7">
        <Link
          href={"/dashboard"}
          className="flex items-start justify-start w-full"
        >
          <ArrowLeft />
        </Link>
        <div className=" flex items-center justify-center flex-col text-xl font-bold">
          <p className="">Add User</p>
          <p className="text-sm pt-3 font-light">Enter details correctly!</p>
        </div>
        <Formik
          initialValues={registerInitialValue}
          validationSchema={registerValidations}
          onSubmit={async (values, { resetForm }) => {
            if (!file) return toast.error("Select correct file");
            const register = await registerStudentService(
              values,
              file,
              roleId.toString()
            );
            if (register.success) {
              resetForm();
              router.push("/dashboard");
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
            <AddUserForm
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
              handleUpdateFile={handleUpdateFile}
              departments={departments}
            />
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUserDetails;
