/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { IHodLeaveData } from "@/lib/Types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const HodLeaveData = () => {
  const [facultyData, setFacultyData] = useState<IHodLeaveData | undefined>();

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await api.get("/faculty/getHodData");
        if (data.success) {
          console.log(data);
          setFacultyData(data.data);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getData();
  }, []);

  return (
    <div className="mt-10 flex items-center justify-center w-screen">
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Faculty Leaves</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-amber-300">
            {facultyData?.facultyLeaves}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Student Leaves</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-orange-500">
            {facultyData?.studentLeaves}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Total Students</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-amber-300">
            {facultyData?.totalStudents}
          </h1>
          <p className="font-light text-md">Students</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Total Faculties</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-fuchsia-300">
            {facultyData?.totalFaculty}
          </h1>
          <p className="font-light text-md">Faculties</p>
        </div>
      </div>
    </div>
  );
};

export default HodLeaveData;
