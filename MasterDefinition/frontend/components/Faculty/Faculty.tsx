/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "next-auth/react";
import FacultyLeaveData from "./FacultyLeaveData";
import FacultyLeaveForm from "./FacultyLeaveForm";
import FacultyLeaveHistory from "./FacultyLeaveHistory";
import { useEffect, useState } from "react";
import { IFacultyLeaveData, Leave } from "@/lib/Types";
import FacultyLeaveApprovalList from "./FacultyLeaveApprovalList";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import Loader from "../Loader";

const Faculty = () => {
  const { data: session } = useSession();
  const [leaves, setLeaves] = useState<Leave[] | []>([]);
  const [totalApplication, setTotalApplication] = useState(0);
  const [facultyData, setFacultyData] = useState<
    IFacultyLeaveData | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await api.get("/faculty/getFacultLeaveBalance");
        if (data.success) {
          setFacultyData(data.facultyData);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="mb-20">
      <div className="m-5">
        <h1 className="font-bold text-2xl">Faculty Dashboard</h1>
        <p>Welcome back, {session?.user.name}</p>
      </div>
      <FacultyLeaveData
        totalApplication={totalApplication}
        facultyData={facultyData as IFacultyLeaveData}
      />
      <div className="flex lg:items-start items-center justify-center gap-20 mt-10 lg:flex-row flex-col">
        <FacultyLeaveForm
          setLeaves={setLeaves}
          setTotalApplication={setTotalApplication}
        />
        <FacultyLeaveHistory
          leaves={leaves}
          setLeaves={setLeaves}
          setTotalApplication={setTotalApplication}
        />
      </div>
      <div className="flex items-center justify-center mt-14">
        <FacultyLeaveApprovalList />
      </div>
    </div>
  );
};

export default Faculty;
