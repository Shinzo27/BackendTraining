"use client";
import { IUpdateStaticData } from "@/lib/Types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Formik } from "formik";
import { staticDataValidations } from "@/lib/Validations";
import toast from "react-hot-toast";
import { updateStaticData } from "@/services/AdminManagement";
import { useRouter } from "next/navigation";
import StaticDataForm from "../StaticDataForm";

const UpdateStaticDetails = ({
  staticData,
}: {
  staticData: IUpdateStaticData;
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center gap-5 flex-col h-screen">
      <div className="bg-neutral-800 p-10 px-20 rounded-xl flex flex-col items-center justify-center gap-7">
        <Link
          href={"/dashboard"}
          className="flex items-start justify-start w-full"
        >
          <ArrowLeft />
        </Link>
        <div className=" flex items-center justify-center flex-col text-xl font-bold">
          <p className="">Update Static Data</p>
          <p className="text-sm pt-3 font-light">Enter all details properly!</p>
        </div>
        <Formik
          initialValues={{ ...staticData }}
          validationSchema={staticDataValidations}
          onSubmit={async (values, { resetForm }) => {
            const updateData = await updateStaticData(values);
            if (updateData.success) {
              toast.success(updateData.message);
              router.push("/dashboard");
              resetForm();
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
            <StaticDataForm
              type="update"
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateStaticDetails;
