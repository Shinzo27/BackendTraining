"use client";
import { IUpdateUserData } from "@/lib/Types";
import { updateUserData } from "@/lib/Validations";
import { Formik } from "formik";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { updateUser } from "@/services/AdminManagement";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import UpdateUserForm from "../UpdateUserForm";

const UpdateUserDetails = ({
  departments,
  userData,
}: {
  departments: { department: string }[];
  userData: IUpdateUserData;
}) => {
  const router = useRouter();
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
          <p className="">Update User</p>
          <p className="text-sm pt-3 font-light">Enter details correctly!</p>
        </div>
        <Formik
          initialValues={{ ...userData }}
          validationSchema={updateUserData}
          onSubmit={async (values, { resetForm }) => {
            const updateData = await updateUser(values);
            if (updateData.success) {
              toast.success(updateData.message);
              router.push("/dashboard");
              resetForm();
            } else {
              toast.error("Something went wrong!");
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
            <UpdateUserForm
              departments={departments}
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
            />
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateUserDetails;
