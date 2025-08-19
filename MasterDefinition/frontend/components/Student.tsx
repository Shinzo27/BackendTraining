"use client";
import { useSession } from "next-auth/react";
import StudentLeaveData from "./StudentLeaveData";
import StudentLeaveForm from "./StudentLeaveForm";
import StudentLeaveHistory from "./StudentLeaveHistory";
import { useEffect, useState } from "react";
import { Leave, LeaveData } from "@/lib/Types";
import { api } from "@/lib/api";

const Student = () => {
  const { data: session } = useSession();
  const [leaves, setLeaves] = useState<Leave[] | []>([]);
  const [totalApplication, setTotalApplication] = useState(0);
  const [leaveData, setLeaveData] = useState<LeaveData | undefined>();

  useEffect(() => {
    async function getLeaveData() {
      try {
        const { data } = await api.get("/student/getLeaveBalance");
        console.log(data.data);
        setLeaveData(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getLeaveData();
  }, []);

  return (
    <div className="mb-10 ">
      <div className="m-5">
        <h1 className="font-bold text-2xl">Student Dashboard</h1>
        <p>Welcome back, {session?.user.name}</p>
      </div>
      <StudentLeaveData
        leaveData={leaveData as LeaveData}
        totalApplication={totalApplication}
      />
      <div className="flex items-start justify-center gap-20 mt-10 flex-wrap">
        <StudentLeaveForm
          setLeaves={setLeaves}
          setTotalApplication={setTotalApplication}
        />
        <StudentLeaveHistory
          leaves={leaves}
          setLeaves={setLeaves}
          setTotalApplication={setTotalApplication}
        />
      </div>
    </div>
  );
};

export default Student;
