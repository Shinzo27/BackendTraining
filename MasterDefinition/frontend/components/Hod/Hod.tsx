/* eslint-disable @typescript-eslint/no-explicit-any */
import { Faculty, HodData, Leave, Student } from "@/lib/Types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import HodLeaveData from "./HodLeaveData";
import HodFacultyLeaveApprovalList from "./HodFacultyLeaveApprovalList";
import HodStudentLeaveApprovalList from "./HodStudentLeaveApprovalList";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import HodStudentList from "./HodStudentList";
import HodFacultyList from "./HodFacultyList";

const Hod = () => {
  const { data: session } = useSession();
  const [studentLeaves, setStudentLeaves] = useState<Leave[] | []>([]);
  const [facultyLeaves, setFacultyLeaves] = useState<Leave[] | []>([]);
  const [facultyList, setFacultyList] = useState<Faculty[] | []>([]);
  const [studentList, setStudentList] = useState<Student[] | []>([]);
  const [hodData, setHodData] = useState<HodData>({
    facultyLeaves: 0,
    studentLeaves: 0,
    totalFaculty: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    async function getLeaves() {
      try {
        const { data } = await api.get("/faculty/getAllLeavesOfHod");
        if (data.success) {
          setStudentLeaves(data.studentLeaves);
          setFacultyLeaves(data.facultyLeaves);
          setFacultyList(data.facultyList);
          setStudentList(data.studentList);
          setHodData(data.hodData);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getLeaves();
  }, []);
  
  return (
    <div className="mb-10 ">
      <div className="m-5">
        <h1 className="font-bold text-2xl">HOD Dashboard</h1>
        <p>Welcome back, {session?.user.name}</p>
      </div>
      <HodLeaveData hodData={hodData} />
      <div className="flex items-start justify-center gap-10 mt-10 flex-wrap">
        <HodStudentLeaveApprovalList
          studentLeaves={studentLeaves}
          setStudentLeaves={setStudentLeaves}
        />
        <HodFacultyLeaveApprovalList
          facultyLeaves={facultyLeaves}
          setFacultyLeaves={setFacultyLeaves}
        />
      </div>
      <div className="flex items-start justify-center gap-10 mt-10 flex-wrap">
        <HodStudentList studentList={studentList} />
        <HodFacultyList facultyList={facultyList} />
      </div>
    </div>
  );
};

export default Hod;
