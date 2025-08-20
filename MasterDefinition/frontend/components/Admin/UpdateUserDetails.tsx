"use client";
import { IUpdateUserData } from "@/lib/Types";
import { updateUserData } from "@/lib/Validations";
import { Formik } from "formik";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { updateUser } from "@/services/AdminManagement";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
          onSubmit={async (values) => {
            const updateData = await updateUser(values);
            if (updateData.success) {
              toast.success(updateData.message);
              router.push("/dashboard");
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
            <form
              className="flex flex-col items-center justify-center gap-7"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center justify-center gap-5">
                <div className="flex items-center justify-center flex-col gap-3">
                  <Input
                    type="string"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.name}
                    className="px-4 py-6"
                  />
                  <h1>{errors.name && touched.name && errors.name}</h1>
                </div>
                <div className="flex items-center justify-center flex-col gap-3">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.email}
                    className="px-4 py-6"
                  />
                  {errors.email && touched.email && errors.email}
                </div>
              </div>
              <div className="flex items-center justify-center gap-5">
                <div className="flex items-center justify-center flex-col gap-3">
                  <Input
                    type="string"
                    name="gr_number"
                    placeholder="Enter your gr_number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.gr_number}
                    className="px-4 py-6"
                  />
                  {errors.gr_number && touched.gr_number && errors.gr_number}
                </div>
              </div>
              <div className="flex items-center justify-center gap-5">
                <div className="flex items-center justify-center flex-col gap-3">
                  <Input
                    type="string"
                    name="phone"
                    placeholder="Enter your contact"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.phone}
                    className="px-4 py-6"
                  />
                  {errors.phone && touched.phone && errors.phone}
                </div>
                <div className="flex items-center justify-center flex-col gap-3">
                  <Input
                    type="string"
                    name="address"
                    placeholder="Enter your address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.address}
                    className="px-4 py-6"
                  />
                  {errors.address && touched.address && errors.address}
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 flex-col">
                <p className="font-bold">Gender</p>
                <RadioGroup
                  className="flex items-center justify-center gap-3"
                  name="gender"
                  defaultValue={values.gender}
                  onValueChange={(value) => setFieldValue("gender", value)}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Male" id="Male" />
                    <Label htmlFor="Male">Male</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Female" id="Female" />
                    <Label htmlFor="Female">Female</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Other" id="Other" />
                    <Label htmlFor="Other">Other</Label>
                  </div>
                </RadioGroup>
                {errors.gender && touched.gender && errors.gender}
              </div>
              <div className="flex items-center justify-center gap-5">
                <div className="flex items-center justify-center flex-col gap-3">
                  <Select
                    name="department"
                    defaultValue={values.department}
                    onValueChange={(value) => {
                      setFieldValue("department", value);
                    }}
                  >
                    <SelectTrigger className="w-[200px] bg-neutral-800 font-semibold">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent
                      onChange={handleChange}
                      className="bg-neutral-800 font-semibold"
                    >
                      {departments.map(
                        (department: { department: string }, index) => (
                          <SelectItem value={department.department} key={index}>
                            {department.department}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  {errors.department && touched.department && errors.department}
                </div>
                <div className="flex items-center justify-center flex-col gap-3">
                  <Select
                    name="className"
                    defaultValue={values.className}
                    onValueChange={(value) => {
                      setFieldValue("className", value);
                    }}
                  >
                    <SelectTrigger className="w-[200px] bg-neutral-800 font-semibold">
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 font-semibold">
                      <SelectItem value="A">A</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.className && touched.className && errors.className}
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="px-7 py-6 bg-neutral-950 font-bold text-lg"
                >
                  Update User
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateUserDetails;
