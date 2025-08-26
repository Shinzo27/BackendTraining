/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import StaticDataDetail from "./StaticDataDetail";
import { IStaticData } from "@/lib/Types";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Link from "next/link";

const ManageStaticData = () => {
  const [staticData, setStaticData] = useState<IStaticData[] | []>([]);

  useEffect(() => {
    async function getStaticData() {
      try {
        const { data } = await api.get("/admin/getStaticData/");
        setStaticData(data.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getStaticData();
  }, []);
  return (
    <div className="mt-2 w-full bg-neutral-800 rounded-lg p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Manage Static Data</p>
          <p className="text-sm font-light">
            All static data are mentioned here
          </p>
        </div>
        <div>
          <Button className="bg-amber-600">
            <Link href={"/addStaticData"}>Add Static Data</Link>
          </Button>
        </div>
      </div>
      <div>
        {staticData.map((data, index) => (
          <StaticDataDetail staticDetail={data} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ManageStaticData;
