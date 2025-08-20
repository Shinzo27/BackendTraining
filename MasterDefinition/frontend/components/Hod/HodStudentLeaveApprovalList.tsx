import { Leave } from "@/lib/Types";
import { Dispatch, SetStateAction } from "react";
import UserAppliedLeave from "../Faculty/UserAppliedLeave";

const HodStudentLeaveApprovalList = ({
  studentLeaves,
  setStudentLeaves,
}: {
  studentLeaves: Leave[] | [];
  setStudentLeaves: Dispatch<SetStateAction<[] | Leave[]>>;
}) => {
  return (
    <div className="bg-neutral-800 p-10 rounded-2xl lg:min-w-[800px] min-w-[200px] flex items-center justify-center flex-col">
      <div className="w-full flex items-start justify-center     flex-col">
        <h1 className="font-bold text-2xl">Student Leave Approval</h1>
        <h1 className="font-light text-sm">All requested leave list</h1>
      </div>
      <div className="mt-5 flex items-start justify-center flex-col gap-5 h-auto">
        {studentLeaves.length > 0 ? (
          studentLeaves?.map((leave: Leave, index: number) => (
            <UserAppliedLeave
              setUserLeaves={setStudentLeaves}
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

export default HodStudentLeaveApprovalList;
