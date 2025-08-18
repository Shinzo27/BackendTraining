import { Student } from "@/lib/Types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const HodStudentList = ({ studentList }: { studentList: Student[] }) => {
  return (
    <div className="bg-neutral-800 p-10 rounded-2xl lg:min-w-[800px] flex items-center justify-center flex-col">
      <div className="w-full flex items-start justify-center     flex-col">
        <h1 className="font-bold text-2xl">Students List</h1>
        <h1 className="font-light text-sm">All students list</h1>
      </div>
      <div className="mt-5 flex items-start justify-center flex-col gap-5 h-auto">
        <Table className="sm:w-[650px] w-[200px]">
          <TableHeader>
            <TableRow className="">
              <TableHead className="">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Class</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentList.map((student: Student, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium max-w-32 truncate ">
                  {student.id}
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell className="">{student.department}</TableCell>
                <TableCell className="">{student.class}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HodStudentList;
