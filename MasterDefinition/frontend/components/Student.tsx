"use client";
import { useSession } from "next-auth/react";
import StudentLeaveData from "./StudentLeaveData";
import StudentLeaveForm from "./StudentLeaveForm";
import StudentLeaveHistory from "./StudentLeaveHistory";
import { leaveData } from "@/lib/Constants";

const Student = () => {
  // useEffect(() => {
  // async function getFaculties() {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:8000/api/users/getFacultyOfDepartment",
  //       { withCredentials: true }
  //     );
  //     console.log(data);
  //     if (data.success) {
  //       setFaculties(data.faculty);
  //     }
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  // }
  // getFaculties();
  // }, []);

  const { data: session } = useSession();
  return (
    <div className="mb-10 ">
      <div className="m-5">
        <h1 className="font-bold text-2xl">Student Dashboard</h1>
        <p>Welcome back, {session?.user.name}</p>
      </div>
      <StudentLeaveData leaveData={leaveData}/>
      <div className="flex items-start justify-center gap-20 mt-10">
        <StudentLeaveForm />
        <StudentLeaveHistory />
      </div>
    </div>
  );
};

export default Student;
