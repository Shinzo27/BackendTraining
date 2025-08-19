"use client";
import AddUserDetails from "@/components/Admin/AddUserDetails";
import { redirect, useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const { id } = params;

  let roleId;
  if (id === "student" || id === "faculty" || id === "hod") {
    if (id === "student") {
      roleId = 4;
    } else if (id === "faculty") {
      roleId = 3;
    } else if (id === "hod") {
      roleId = 2;
    }
  } else redirect("/dashboard");

  return <AddUserDetails roleId={roleId as number} />;
};

export default Page;
