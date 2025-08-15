import { useSession } from "next-auth/react";
import FacultyLeaveData from "./FacultyLeaveData";
import FacultyLeaveForm from "./FacultyLeaveForm";
import FacultyLeaveHistory from "./FacultyLeaveHistory";
import { useState } from "react";
import { Leave } from "@/lib/Types";
import FacultyLeaveApprovalList from "./FacultyLeaveApprovalList";

const Faculty = () => {
  const { data: session } = useSession();
  const [leaves, setLeaves] = useState<Leave[] | []>([]);
  const [totalApplication, setTotalApplication] = useState(0);

  return (
    <div className="mb-10 ">
      <div className="m-5">
        <h1 className="font-bold text-2xl">Faculty Dashboard</h1>
        <p>Welcome back, {session?.user.name}</p>
      </div>
      <FacultyLeaveData totalApplication={totalApplication} />
      <div className="flex items-start justify-center gap-20 mt-10">
        <FacultyLeaveForm
          setLeaves={setLeaves}
          setTotalApplication={setTotalApplication}
        />
        <FacultyLeaveHistory
          leaves={leaves}
          setLeaves={setLeaves}
          setTotalApplication={setTotalApplication}
        />
      </div>
      <div className="flex items-center justify-center mt-14">
        <FacultyLeaveApprovalList />
      </div>
    </div>
  );
};

export default Faculty;
