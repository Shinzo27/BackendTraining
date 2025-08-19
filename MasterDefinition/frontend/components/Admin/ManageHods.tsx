/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { IUserDetail } from "@/lib/Types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserDetail from "./UserDetail";
import Link from "next/link";
import { Button } from "../ui/button";

const ManageHods = () => {
  const [hods, setHods] = useState<IUserDetail[] | []>([]);

  useEffect(() => {
    async function getStudents() {
      try {
        const { data } = await api.get("/admin/getHodDetails/");
        setHods(data.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getStudents();
  }, []);

  return (
    <div className="mt-2 w-full bg-neutral-800 rounded-lg p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Manage HODs</p>
          <p className="text-sm font-light">All HODs are mentioned here</p>
        </div>
        <div>
          <div>
            <Button className="bg-amber-600">
              <Link
                href={"/addUser/hod"}
                className="bg-amber-600 p-2 rounded-lg"
              >
                Add HOD
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div>
        {hods.map((hod, index) => (
          <UserDetail userData={hod} key={index} setUsers={setHods} />
        ))}
      </div>
    </div>
  );
};

export default ManageHods;
