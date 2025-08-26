import { Dispatch, SetStateAction } from "react";
import { Leave } from "@/lib/Types";
import UserAppliedLeave from "../Faculty/UserAppliedLeave";

const HodFacultyLeaveApprovalList = ({
  facultyLeaves,
  setFacultyLeaves,
}: {
  facultyLeaves: Leave[] | [];
  setFacultyLeaves: Dispatch<SetStateAction<[] | Leave[]>>;
}) => {
  return (
    <div className="bg-neutral-800 p-10 rounded-2xl lg:min-w-[800px] min-w-[200px] flex items-center justify-start flex-col min-h-[500px]">
      <div className="w-full flex items-start justify-center     flex-col">
        <h1 className="font-bold text-2xl">Facaulty Leave Approval</h1>
        <h1 className="font-light text-sm">All requested leave list</h1>
      </div>
      <div className="mt-5 flex items-start justify-center flex-col gap-5 h-auto">
        {facultyLeaves.length > 0 ? (
          facultyLeaves?.map((leave: Leave, index: number) => (
            <UserAppliedLeave
              leave={leave}
              key={index}
              setUserLeaves={setFacultyLeaves}
            />
          ))
        ) : (
          <p className="font-bold text-xl">No leaves history found!</p>
        )}
      </div>
    </div>
  );
};

export default HodFacultyLeaveApprovalList;
