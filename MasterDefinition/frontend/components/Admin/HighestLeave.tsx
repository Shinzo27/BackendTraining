/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from "@/lib/api";
import {
  IBelowPercentageData,
  IPendingLeaves,
  IUserHighestLeaveData,
} from "@/lib/Types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LeaveTable from "../LeaveTable";
import BelowPercentageTable from "../BelowPercentageTable";
import PendingLeaveTable from "../PendingLeaveTable";

const HighestLeave = () => {
  const [studentData, setStudentData] = useState<IUserHighestLeaveData[] | []>(
    []
  );
  const [facultyData, setFacultyData] = useState<IUserHighestLeaveData[] | []>(
    []
  );
  const [belowPercentageData, setBelowPercentageData] = useState<
    IBelowPercentageData[] | []
  >([]);
  const [pendingLeaves, setPendingLeaves] = useState<IPendingLeaves[] | []>([]);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await api.get(`/admin/getLeaveReportData`);
        setStudentData(data.studentDetails);
        setFacultyData(data.facultyDetails);
        setBelowPercentageData(data.belowPercentageAttendance);
        setPendingLeaves(data.pendingLeaves);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getData();
  });

  return (
    <div className="mt-2 w-full bg-neutral-800 rounded-lg p-5">
      <div className="p-2">
        <p className="text-lg font-semibold">Leave Request Data</p>
        <p className="text-sm font-light">Students & Faculties Data</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 mt-5">
        <div className="flex items-center justify-center gap-10">
          <LeaveTable data={studentData} title="Student Highest Request" />
          <LeaveTable data={facultyData} title="Faculty Highest Request" />
        </div>
        <div className="flex items-center justify-center gap-10">
          <BelowPercentageTable
            data={belowPercentageData}
            title="Below 75% Attendance"
          />
          <PendingLeaveTable data={pendingLeaves} title="Pending Leaves" />
        </div>
      </div>
    </div>
  );
};

export default HighestLeave;
