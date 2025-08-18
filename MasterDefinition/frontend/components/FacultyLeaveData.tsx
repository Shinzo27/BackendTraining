/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { IFacultyLeaveData } from "@/lib/Types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FacultyLeaveData = ({
  totalApplication,
}: {
  totalApplication: number;
}) => {
  const [facultyData, setFacultyData] = useState<
    IFacultyLeaveData | undefined
  >();

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await api.get("/faculty/getFacultLeaveBalance");
        if (data.success) {
          setFacultyData(data.facultyData);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getData();
  }, []);

  return (
    <div className="mt-10 flex items-center justify-center flex-wrap">
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">My Applications</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center">{totalApplication}</h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Approved Leaves</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-amber-300">
            {facultyData?.approvedLeave}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Available Leaves</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-orange-500">
            {facultyData?.availableLeave}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Attendance Percentage</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-amber-300">
            {facultyData?.attendancePercentage}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Student Requests</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-fuchsia-300">
            {facultyData?.studentRequestedTo}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyLeaveData;
