/* eslint-disable @typescript-eslint/no-explicit-any */
import { leaveRequestConfirm } from "@/lib/api";
import { Leave } from "@/lib/Types";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { format } from "date-fns";

type StatusType = "Approved" | "Rejected";

const UserAppliedLeave = ({
  setUserLeaves,
  leave,
}: {
  setUserLeaves: React.Dispatch<React.SetStateAction<[] | Leave[]>>;
  leave: Leave;
}) => {
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
        console.log(updateStatus.leaves);
        toast.success(updateStatus.message);
        setUserLeaves(updateStatus.leaves);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-neutral-950 p-5 rounded-2xl sm:w-[650px] w-[250px]">
      <div className="flex items-center justify-between gap-5">
        <p className="w-72 font-semibold truncate">{leave.reason}</p>
        {leave.status === "Pending" ? (
          <div className="flex items-center justify-center gap-3">
            <Button
              className="bg-orange-500 text-white p-2 rounded-lg text-sm font-semibold cursor-pointer"
              name="Approved"
              onClick={(e) => handleStatusUpdate({ e, leaveId: leave.id })}
            >
              Approve
            </Button>
            <Button
              className="bg-red-800 text-white p-2 rounded-lg text-sm font-semibold cursor-pointer"
              name="Rejected"
              onClick={(e) => handleStatusUpdate({ e, leaveId: leave.id })}
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
        <p>Applied by - {leave.user.name}</p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p>{format(leave.startDate, "dd-MM-yyyy")}</p>
        <p>{format(leave.endDate, "dd-MM-yyyy")}</p>
      </div>
    </div>
  );
};

export default UserAppliedLeave;
