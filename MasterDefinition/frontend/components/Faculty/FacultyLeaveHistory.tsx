import { api } from "@/lib/api";
import { Leave } from "@/lib/Types";
import { Dispatch, SetStateAction, useEffect } from "react";
import LeaveDetails from "../LeaveDetails";

const FacultyLeaveHistory = ({
  leaves,
  setLeaves,
  setTotalApplication,
}: {
  leaves: Leave[] | [];
  setLeaves: Dispatch<SetStateAction<Leave[] | []>>;
  setTotalApplication: Dispatch<SetStateAction<number>>;
}) => {
  useEffect(() => {
    async function getLeaves() {
      const { data } = await api.get("/faculty/getFacultyLeaves");
      setLeaves(data.leaves);
      const length = data.leaves.length;
      setTotalApplication(length);
    }
    getLeaves();
  }, [setLeaves, setTotalApplication]);

  return (
    <div className="bg-neutral-800 p-10 rounded-2xl sm:min-w-[575px] min-w-[300px]">
      <div>
        <h1 className="font-bold text-2xl">Leave History</h1>
        <h1 className="font-light text-sm">All applied leave list</h1>
      </div>
      <div className="mt-5 flex items-start justify-center flex-col gap-5 h-auto">
        {leaves?.length > 0 ? (
          leaves?.map((leave: Leave, index: number) => (
            <LeaveDetails leave={leave} key={index} />
          ))
        ) : (
          <p className="font-bold text-xl">No leaves history found!</p>
        )}
      </div>
    </div>
  );
};

export default FacultyLeaveHistory;
