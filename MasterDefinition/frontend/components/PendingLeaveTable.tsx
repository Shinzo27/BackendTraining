import { IPendingLeaves } from "@/lib/Types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const PendingLeaveTable = ({
  data,
  title,
}: {
  data: IPendingLeaves[];
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
              <TableHead className="text-center">Requested To</TableHead>
              <TableHead className="text-center">Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((user: IPendingLeaves, index: number) => (
              <TableRow key={index}>
                <TableCell className="max-w-40 font-medium truncate text-center">
                  {user.user.name}
                </TableCell>
                <TableCell className="text-center">{user.user.name}</TableCell>
                <TableCell className="text-center">
                  {user.requestTo.name}
                </TableCell>
                <TableCell className="max-w-40 truncate text-center">
                  {user.reason}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="mt-5 text-lg font-bold">No Pending Leaves Found</p>
      )}
    </div>
  );
};

export default PendingLeaveTable;
