import { IBelowPercentageData } from "@/lib/Types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const BelowPercentageTable = ({
  data,
  title,
}: {
  data: IBelowPercentageData[];
  title: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-start bg-neutral-900 p-10 rounded-lg min-h-[260px] min-w-[570px]">
      <p className="font-bold text-xl">{title}</p>
      {data?.length > 0 ? (
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Id</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Department</TableHead>
              <TableHead className="text-center">Percentange</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((user: IBelowPercentageData, index: number) => (
              <TableRow key={index}>
                <TableCell className="max-w-40 font-medium truncate text-center">
                  {user.user.id}
                </TableCell>
                <TableCell className="text-center">{user.user.name}</TableCell>
                <TableCell className="text-center">
                  {user.user.department}
                </TableCell>
                <TableCell className="text-center">
                  {user.attendancePercentage}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="font-bold text-2xl">No Leaves Found</p>
      )}
    </div>
  );
};

export default BelowPercentageTable;
