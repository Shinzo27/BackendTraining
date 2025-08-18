import { api } from "@/lib/api";
import { LeaveData } from "@/lib/Types";
import { useEffect, useState } from "react";

const StudentLeaveData = ({
  totalApplication,
}: {
  totalApplication: number;
}) => {
  const [leaveData, setLeaveData] = useState<LeaveData | undefined>();

  useEffect(() => {
    async function getLeaveData() {
      try {
        const { data } = await api.get("/student/getLeaveBalance");
        console.log(data.data);
        setLeaveData(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getLeaveData();
  }, []);

  return (
    <div className="mt-10 flex items-center justify-center flex-wrap">
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Total Applications</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center">{totalApplication}</h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Available Leaves</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-amber-300">
            {leaveData?.availableLeave}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Approved Leaves</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-orange-500">
            {leaveData?.approvedLeave}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Rejected Leaves</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-red-600">
            {leaveData?.rejectedLeave}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Attendance Percentage</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-orange-300">
            {leaveData?.attendancePercentage}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
    </div>
  );
};

export default StudentLeaveData;
