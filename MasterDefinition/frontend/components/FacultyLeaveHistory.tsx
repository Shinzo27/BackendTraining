import { api } from "@/lib/api";
import { Leave } from "@/lib/Types";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useEffect } from "react";

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
    <div className="bg-neutral-800 p-10 rounded-2xl min-w-[575px]">
      <div>
        <h1 className="font-bold text-2xl">Leave History</h1>
        <h1 className="font-light text-sm">All applied leave list</h1>
      </div>
      <div className="mt-5 flex items-start justify-center flex-col gap-5 h-auto">
        {leaves?.length > 0 ? (
          leaves?.map((leave: Leave, index: number) => (
            <div
              key={index}
              className="bg-neutral-950 p-5 rounded-2xl w-[450px] "
            >
              <div className="flex items-center justify-between gap-5">
                <p className="w-72 font-semibold truncate">{leave.reason}</p>
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

export default FacultyLeaveHistory;
