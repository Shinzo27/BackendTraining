/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Leave } from "@/lib/Types";
import { Dispatch, SetStateAction } from "react";
import { leaveRequestConfirmHod } from "@/lib/api";
import toast from "react-hot-toast";

type StatusType = "Approved" | "Rejected";

const HodStudentLeaveApprovalList = ({
  studentLeaves,
  setStudentLeaves,
}: {
  studentLeaves: Leave[] | [];
  setStudentLeaves: Dispatch<SetStateAction<[] | Leave[]>>;
}) => {
  const handleStatusUpdate = async ({
    e,
    leaveId,
  }: {
    e: React.MouseEvent<HTMLButtonElement>;
    leaveId: number;
  }) => {
    try {
      const updateStatus = await leaveRequestConfirmHod(
        leaveId,
        e.currentTarget.name as StatusType
      );
      console.log(updateStatus);
      if (updateStatus && updateStatus.success) {
        console.log(updateStatus.studentLeaves);
        toast.success(updateStatus.message);
        setStudentLeaves(updateStatus.studentLeaves);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-neutral-800 p-10 rounded-2xl lg:min-w-[800px] min-w-[200px] flex items-center justify-center flex-col">
      <div className="w-full flex items-start justify-center     flex-col">
        <h1 className="font-bold text-2xl">Student Leave Approval</h1>
        <h1 className="font-light text-sm">All requested leave list</h1>
      </div>
      <div className="mt-5 flex items-start justify-center flex-col gap-5 h-auto">
        {studentLeaves.length > 0 ? (
          studentLeaves?.map((leave: Leave, index: number) => (
            <div
              key={index}
              className="bg-neutral-950 p-5 rounded-2xl sm:w-[650px] w-[350px]"
            >
              <div className="flex items-center justify-between gap-5">
                <div className="flex flex-col justify-center">
                  <p className="sm:w-72 w-20 font-semibold truncate">
                    {leave.reason}
                  </p>
                  <p className="font-light text-xs">
                    Applied By - {leave.user.name}
                  </p>
                </div>
                {leave.status === "Pending" ? (
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      className="bg-orange-500 text-white p-2 rounded-lg text-sm font-semibold cursor-pointer"
                      name="Approved"
                      onClick={(e) => {
                        handleStatusUpdate({ e, leaveId: leave.id });
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-red-800 text-white p-2 rounded-lg text-sm font-semibold cursor-pointer"
                      name="Rejected"
                      onClick={(e) => {
                        console.log(e);
                        handleStatusUpdate({ e, leaveId: leave.id });
                      }}
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

export default HodStudentLeaveApprovalList;
