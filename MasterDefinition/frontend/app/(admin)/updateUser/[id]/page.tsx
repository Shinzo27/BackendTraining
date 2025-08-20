/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import UpdateUserDetails from "@/components/Admin/UpdateUserDetails";
import Loader from "@/components/Loader";
import { api } from "@/lib/api";
import { IUpdateUserData } from "@/lib/Types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [departments, setDepartments] = useState([]);
  const [userData, setUserData] = useState<IUpdateUserData>();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get("/statics/getDepartments", {
          withCredentials: true,
        });
        setDepartments(data.department);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    async function getUserData() {
      try {
        const { data } = await api.get(`/admin/getUserData/${id}`);
        setUserData(data.data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    getUserData();
  }, [id]);

  return isLoading ? (
    <Loader />
  ) : (
    <UpdateUserDetails
      departments={departments}
      userData={userData as IUpdateUserData}
    />
  );
};

export default Page;
