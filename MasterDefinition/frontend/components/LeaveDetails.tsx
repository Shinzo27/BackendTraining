import { Leave } from "@/lib/Types";
import { format } from "date-fns";

const LeaveDetails = ({ leave }: { leave: Leave }) => {
  return (
    <div className="bg-neutral-950 p-5 rounded-2xl sm:w-[450px] w-[250px]">
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
  );
};

export default LeaveDetails;
