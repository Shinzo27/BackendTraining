/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import UpdateStaticDetails from "@/components/Admin/UpdateStaticDetails";
import Loader from "@/components/Loader";
import { api } from "@/lib/api";
import { IUpdateStaticData } from "@/lib/Types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [staticData, setStaticData] = useState<IUpdateStaticData>();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function getStaticData() {
      try {
        const { data } = await api.get(`/admin/getStaticDataById/${id}`);
        setStaticData(data.data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getStaticData();
  }, [id]);

  return isLoading ? (
    <Loader />
  ) : (
    <UpdateStaticDetails staticData={staticData as IUpdateStaticData} />
  );
};

export default Page;
