/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { IUserDetail } from "@/lib/Types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserDetail from "./UserDetail";
import Link from "next/link";
import { Button } from "../ui/button";

const ManageFaculties = () => {
  const [faculties, setFaculties] = useState<IUserDetail[] | []>([]);

  useEffect(() => {
    async function getStudents() {
      try {
        const { data } = await api.get("/admin/getFacultyDetails/");
        setFaculties(data.data);
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
          <p className="text-lg font-semibold">Manage Faculties</p>
          <p className="text-sm font-light">All faculties are mentioned here</p>
        </div>
        <div>
          <Button className="bg-amber-600">
            <Link
              href={"/addUser/faculty"}
              className="bg-amber-600 p-2 rounded-lg"
            >
              Add Faculty
            </Link>
          </Button>
        </div>
      </div>
      <div>
        {/* <p className="mt-5 w-full bg-neutral-900 p-2 rounded-lg">Bsc.It</p> */}
        {faculties.map((faculty, index) => (
          <UserDetail userData={faculty} key={index} setUsers={setFaculties} />
        ))}
      </div>
    </div>
  );
};

export default ManageFaculties;
