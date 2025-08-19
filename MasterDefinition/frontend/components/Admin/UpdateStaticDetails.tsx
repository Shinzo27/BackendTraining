"use client";
import { IUpdateStaticData } from "@/lib/Types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Formik } from "formik";
import { staticDataValidations } from "@/lib/Types";
import toast from "react-hot-toast";
import { updateStaticData } from "@/services/AdminManagement";
import { useRouter } from "next/navigation";

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
          <p className="">Add Static Data</p>
          <p className="text-sm pt-3 font-light">Enter all details properly!</p>
        </div>
        <Formik
          initialValues={{ ...staticData }}
          validationSchema={staticDataValidations}
          onSubmit={async (values) => {
            const updateData = await updateStaticData(values);
            if (updateData.success) {
              toast.success(updateData.message);
              router.push("/dashboard");
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
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col items-center justify-center gap-7"
            >
              <Input
                type="department"
                name="department"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.department}
                className="px-4 py-6"
                placeholder="Enter department name"
              />
              {errors.department && touched.department && errors.department}
              <Input
                type="className"
                name="className"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.className}
                className="px-4 py-6"
                placeholder="Enter your className"
              />
              {errors.className && touched.className && errors.className}
              <Input
                type="academicYear"
                name="academicYear"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.academicYear}
                className="px-4 py-6"
                placeholder="Enter your academicYear"
              />
              {errors.academicYear &&
                touched.academicYear &&
                errors.academicYear}
              <Input
                type="totalLeave"
                name="totalLeave"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.totalLeave}
                className="px-4 py-6"
                placeholder="Enter your totalLeave"
              />
              {errors.totalLeave && touched.totalLeave && errors.totalLeave}
              <Input
                type="totalWorkingDays"
                name="totalWorkingDays"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.totalWorkingDays}
                className="px-4 py-6"
                placeholder="Enter your totalWorkingDays"
              />
              {errors.totalWorkingDays &&
                touched.totalWorkingDays &&
                errors.totalWorkingDays}
              <Button
                type="submit"
                className="px-7 py-6 bg-neutral-950 font-bold text-lg"
              >
                Add Static Data
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateStaticDetails;
