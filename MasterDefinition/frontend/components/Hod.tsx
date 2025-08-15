/* eslint-disable @typescript-eslint/no-explicit-any */
import { Leave } from "@/lib/Types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import HodLeaveData from "./HodLeaveData";
import HodFacultyLeaveApprovalList from "./HodFacultyLeaveApprovalList";
import HodStudentLeaveApprovalList from "./HodStudentLeaveApprovalList";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

const Hod = () => {
  const { data: session } = useSession();
  const [studentLeaves, setStudentLeaves] = useState<Leave[] | []>([]);
  const [facultyLeaves, setFacultyLeaves] = useState<Leave[] | []>([]);
  useEffect(() => {
    async function getLeaves() {
      try {
        const { data } = await api.get("/faculty/getAllLeavesOfHod");
        if (data.success) {
          console.log(data);
          setStudentLeaves(data.studentLeaves);
          setFacultyLeaves(data.facultyLeaves);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getLeaves();
  }, []);
  return (
    <div className="mb-10 ">
      <div className="m-5">
        <h1 className="font-bold text-2xl">HOD Dashboard</h1>
        <p>Welcome back, {session?.user.name}</p>
      </div>
      <HodLeaveData />
      <div className="flex items-start justify-center gap-20 mt-10">
        <HodStudentLeaveApprovalList
          studentLeaves={studentLeaves}
          setStudentLeaves={setStudentLeaves}
        />
        <HodFacultyLeaveApprovalList
          facultyLeaves={facultyLeaves}
          setFacultyLeaves={setFacultyLeaves}
        />
      </div>
    </div>
  );
};

export default Hod;
