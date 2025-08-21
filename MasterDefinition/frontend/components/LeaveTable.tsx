import { IUserHighestLeaveData } from "@/lib/Types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const LeaveTable = ({
  data,
  title,
}: {
  data: IUserHighestLeaveData[];
  title: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-start bg-neutral-900 p-10 rounded-lg min-h-[260px] min-w-[550px]">
      <p className="font-bold text-xl">{title}</p>
      {data?.length > 0 ? (
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Id</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Department</TableHead>
              <TableHead className="text-center">Request Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user: IUserHighestLeaveData, index: number) => (
              <TableRow key={index}>
                <TableCell className="max-w-40 font-medium truncate">
                  {user.id}
                </TableCell>
                <TableCell className="text-center">{user.name}</TableCell>
                <TableCell className="text-center">{user.department}</TableCell>
                <TableCell className="text-center">{user.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="font-bold text-2xl">No Leaves Found!</p>
      )}
    </div>
  );
};

export default LeaveTable;
