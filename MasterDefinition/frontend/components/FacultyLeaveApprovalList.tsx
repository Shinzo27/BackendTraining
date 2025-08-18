/* eslint-disable @typescript-eslint/no-explicit-any */
// import { leaves } from "@/lib/Constants";
import { format } from "date-fns";
import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";
import { api, leaveRequestConfirm } from "@/lib/api";
import toast from "react-hot-toast";
import { Leave } from "@/lib/Types";

type StatusType = "Approved" | "Rejected";

const FacultyLeaveApprovalList = () => {
  const [leaves, setLeaves] = useState<Leave[] | []>([]);
  useEffect(() => {
    async function getApprovalList() {
      try {
        const { data } = await api.get("/faculty/getLeaveStatus");
        setLeaves(data.leaves);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getApprovalList();
  }, []);

  const handleStatusUpdate = async ({
    e,
    leaveId,
  }: {
    e: React.MouseEvent<HTMLButtonElement>;
    leaveId: number;
  }) => {
    try {
      const updateStatus = await leaveRequestConfirm(
        leaveId,
        e.currentTarget.name as StatusType
      );
      if (updateStatus.success) {
        toast.success(updateStatus.message);
        setLeaves(updateStatus.leaves);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-neutral-800 p-10 rounded-2xl lg:min-w-[800px] md:min-w-[700px] min-w-[300px] flex items-center justify-center flex-col">
      <div className="w-full flex items-start justify-center     flex-col">
        <h1 className="font-bold text-2xl">Leave Approval</h1>
        <h1 className="font-light text-sm">All requested leave list</h1>
      </div>
      <div className="mt-5 flex items-start justify-center flex-col gap-5 h-auto">
        {leaves.length > 0 ? (
          leaves?.map((leave: Leave, index: number) => (
            <div
              key={index}
              className="bg-neutral-950 p-5 rounded-2xl sm:w-[650px] w-[250px]"
            >
              <div className="flex items-center justify-between gap-5">
                <p className="w-72 font-semibold truncate">{leave.reason}</p>
                {leave.status === "Pending" ? (
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      className="bg-orange-500 text-white p-2 rounded-lg text-sm font-semibold cursor-pointer"
                      name="Approved"
                      onClick={(e) =>
                        handleStatusUpdate({ e, leaveId: leave.id })
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-red-800 text-white p-2 rounded-lg text-sm font-semibold cursor-pointer"
                      name="Rejected"
                      onClick={(e) =>
                        handleStatusUpdate({ e, leaveId: leave.id })
                      }
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <p
                    className={`${
                      leave.status === "Approved"
                        ? "bg-orange-500"
                        : leave.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-800"
                    } bg-orange-500 text-white p-2 rounded-lg text-sm font-semibold`}
                  >
                    {leave.status}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <p>Applied by - Manav Patel</p>
              </div>
              <div className="flex items-center justify-between mt-5">
                <p>{format(leave.startDate, "dd-MM-yyyy")}</p>
                <p>{format(leave.endDate, "dd-MM-yyyy")}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="font-bold text-xl">No leaves history found!</p>
        )}
      </div>
    </div>
  );
};

export default FacultyLeaveApprovalList;
