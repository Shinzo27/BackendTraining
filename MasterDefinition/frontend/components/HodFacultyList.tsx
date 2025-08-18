import { Faculty } from "@/lib/Types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const HodFacultyList = ({ facultyList }: { facultyList: Faculty[] }) => {
  return (
    <div className="bg-neutral-800 p-10 rounded-2xl lg:min-w-[800px] flex items-center justify-center flex-col">
      <div className="w-full flex items-start justify-center     flex-col">
        <h1 className="font-bold text-2xl">Faculty List</h1>
        <h1 className="font-light text-sm">All faculty list</h1>
      </div>
      <div className="mt-5 flex items-start justify-center flex-col gap-5 h-auto">
        <Table className="w-[650px]">
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
            {facultyList.map((faculty: Faculty, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium max-w-32 truncate ">
                  {faculty.id}
                </TableCell>
                <TableCell>{faculty.name}</TableCell>
                <TableCell>{faculty.email}</TableCell>
                <TableCell className="">{faculty.department}</TableCell>
                <TableCell className="">{faculty.class}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HodFacultyList;
