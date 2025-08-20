/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import UserDetail from "./UserDetail";
import { api } from "@/lib/api";
import { IUserDetail } from "@/lib/Types";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Link from "next/link";

const ManageStudent = () => {
  const [students, setStudents] = useState<IUserDetail[] | []>([]);

  useEffect(() => {
    async function getStudents() {
      try {
        const { data } = await api.get("/admin/getStudentDetails/");
        setStudents(data.data);
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
          <p className="text-lg font-semibold">Manage Student</p>
          <p className="text-sm font-light">All students are mentioned here</p>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <Button className="bg-amber-600">
              <Link href={"/addUser/student"}>Add Student</Link>
            </Button>
          </div>
        </div>
      </div>
      <div>
        {/* <p className="mt-5 w-full bg-neutral-900 p-2 rounded-lg">Bsc.It</p> */}
        {students.map((student, index) => (
          <UserDetail userData={student} key={index} setUsers={setStudents} />
        ))}
      </div>
    </div>
  );
};

export default ManageStudent;
