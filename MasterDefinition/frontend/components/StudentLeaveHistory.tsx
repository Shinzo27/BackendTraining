import { leaves } from "@/lib/Constants";

const StudentLeaveHistory = () => {
    return (
        <div className="bg-neutral-800 p-10 rounded-2xl ">
          <div>
            <h1 className="font-bold text-2xl">Leave History</h1>
            <h1 className="font-light text-sm">All applied leave list</h1>
          </div>
          <div className="mt-5 flex items-start p-5 justify-center flex-col gap-5 h-auto">
            {leaves.map((leave, index) => (
              <div
                key={index}
                className="bg-neutral-950 p-5 rounded-2xl w-[450px] "
              >
                <div className="flex items-center justify-between gap-5">
                  <p className="w-72 font-semibold truncate">{leave.title}</p>
                  <p
                    className={`${
                      leave.status === "approved"
                        ? "bg-orange-500"
                        : leave.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-800"
                    } bg-orange-500 text-white p-2 rounded-lg text-sm font-semibold`}
                  >
                    {leave.status}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <p>{leave.startDate}</p>
                  <p>{leave.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
}

export default StudentLeaveHistory;