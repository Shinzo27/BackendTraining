"use client";
import { useSession } from "next-auth/react";
import StudentLeaveData from "./StudentLeaveData";
import StudentLeaveForm from "./StudentLeaveForm";
import StudentLeaveHistory from "./StudentLeaveHistory";
import { useState } from "react";
import { Leave } from "@/lib/Types";

const Student = () => {
  const { data: session } = useSession();
  const [leaves, setLeaves] = useState<Leave[] | []>([]);
  const [totalApplication, setTotalApplication] = useState(0);

  return (
    <div className="mb-10 ">
      <div className="m-5">
        <h1 className="font-bold text-2xl">Student Dashboard</h1>
        <p>Welcome back, {session?.user.name}</p>
      </div>
      <StudentLeaveData totalApplication={totalApplication} />
      <div className="flex items-start justify-center gap-20 mt-10">
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
