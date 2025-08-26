/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { Leave } from "@/lib/Types";
import StudentAppliedLeave from "./UserAppliedLeave";

const FacultyLeaveApprovalList = () => {
  const [leaves, setLeaves] = useState<Leave[] | []>([]);

  useEffect(() => {
    async function getApprovalList() {
      try {
        const { data } = await api.get("/faculty/getLeaveStatus");
        console.log(data.leaves);
        setLeaves(data.leaves);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getApprovalList();
  }, []);

  return (
    <div className="bg-neutral-800 p-10 rounded-2xl lg:min-w-[800px] md:min-w-[700px] min-w-[300px] flex items-center justify-center flex-col">
      <div className="w-full flex items-start justify-center     flex-col">
        <h1 className="font-bold text-2xl">Leave Approval</h1>
        <h1 className="font-light text-sm">All requested leave list</h1>
      </div>
      <div className="mt-5 flex items-start justify-center flex-col gap-5 h-auto">
        {leaves.length > 0 ? (
          leaves?.map((leave: Leave, index: number) => (
            <StudentAppliedLeave
              setUserLeaves={setLeaves}
              leave={leave}
              key={index}
            />
          ))
        ) : (
          <p className="font-bold text-xl">No leaves history found!</p>
        )}
      </div>
    </div>
  );
};

export default FacultyLeaveApprovalList;
