"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { IUserDetails } from "@/lib/Types";
import { Formik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [userDetails, setUserDetails] = useState<IUserDetails | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [imagePath, setImagePath] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await api.get("/users/userDetails");
        if (data.success) {
          setUserDetails(data.data);
          setImagePath(data.data.image);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const handleOnChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setImage(e.target.files[0]);
  };

  const handleUpdateImage = async () => {
    if (!image) return toast.error("Select correct file");
    const formData = new FormData();
    formData.append("image", image, image.name);

    const object = Object.fromEntries(formData.entries());
    console.log(object);
    const { data } = await api.put(
      "/users/updateImage",
      { ...object },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
      console.log(data.user.image);
      setImagePath(data.user.image);
      setImageName(undefined);
    } else {
      console.log(data);
      toast.error("Something went wrong!");
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="mt-5 mx-10">
      <div>
        <div className="">
          <h1 className="font-bold text-2xl">User Profile</h1>
        </div>
      </div>
      <div className="mt-4 mx-10 bg-neutral-800 w-fit p-10 rounded-lg flex items-center gap-10">
        <div className="flex flex-col gap-6">
          <Image
            src={`/${imagePath}`}
            alt="profile"
            width={300}
            height={100}
            className="rounded-lg"
            priority
          />
          <Input
            type="file"
            accept=".jpg"
            required
            name="image"
            value={imageName}
            onChange={(e) => handleOnChangeFile(e)}
          />
          <Button className="bg-neutral-900 w-fit" onClick={handleUpdateImage}>
            Update Image
          </Button>
        </div>
        <Formik
          initialValues={{ ...userDetails }}
          // validationSchema={}
          onSubmit={async (values, { resetForm }) => {
            try {
              const payload = {
                id: values.id,
                name: values.name,
                email: values.email,
                gender: values.gender,
                department: values.department,
                className: values.class,
                image: values.image,
                gr_number: values.gr_number,
                phone: values.phone,
                roleId: values.roleId,
                address: values.address,
              };
              const { data } = await api.put("/users/updateUserDetails", {
                ...payload,
              });
              if (data.success) {
                toast.success("User Updated Successfully!");
                values = data.user;
                resetForm();
              }
            } catch (error: any) {
              toast.error(error.message);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form
              className="p-10 bg-neutral-700 rounded-lg flex flex-col gap-6 w-[500px]"
              onSubmit={handleSubmit}
            >
              <div className="flex items-start flex-col gap-3">
                <Label>Name</Label>
                <Input
                  defaultValue={values.name}
                  name="name"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && errors.name}
              </div>
              <div className="flex items-start flex-col gap-3">
                <Label>Email</Label>
                <Input
                  defaultValue={values.email}
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && errors.email}
              </div>
              <div className="flex items-start flex-col gap-3">
                <Label>Phone</Label>
                <Input
                  defaultValue={values.phone}
                  name="phone"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && errors.name}
              </div>
              <div className="flex items-start flex-col gap-3">
                <Label>Address</Label>
                <Input
                  defaultValue={values.address}
                  type="text"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address && errors.address}
              </div>
              <div className="flex items-center gap-3">
                <Label>Gender: </Label>
                <Label className="text-lg font-bold">{values.gender}</Label>
              </div>
              <div className="flex items-center gap-3">
                <Label>Department: </Label>
                <Label className="text-lg font-bold">{values.department}</Label>
                <div className="flex items-center gap-3">
                  <Label>Class: </Label>
                  <Label className="text-lg font-bold">{values.class}</Label>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Label>Gr Number: </Label>
                <Label className="text-lg font-bold">{values.gr_number}</Label>
              </div>
              <div className="flex items-center gap-3">
                <Label>Role: </Label>
                <Label className="text-lg font-bold">
                  {values?.roleId === 4
                    ? "Student"
                    : values?.roleId === 3
                    ? "Faculty"
                    : values?.roleId === 2
                    ? "HOD"
                    : "Admin"}
                </Label>
              </div>
              <Button type="submit" className="bg-neutral-900 w-fit">
                Update Details
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Page;
