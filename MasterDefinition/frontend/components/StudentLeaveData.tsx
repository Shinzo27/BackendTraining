import { studentCardData } from "@/lib/Constants";
import { LeaveData } from "@/lib/Types";
import DataCard from "./DataCard";

const StudentLeaveData = ({
  totalApplication,
  leaveData,
}: {
  totalApplication: number;
  leaveData: LeaveData;
}) => {
  const leaveDetails = studentCardData({ totalApplication, ...leaveData });
  return (
    <div className="mt-10 flex items-center justify-center flex-wrap">
      {leaveDetails.map((data, index) => (
        <DataCard data={data} key={index} />
      ))}
    </div>
  );
};

export default StudentLeaveData;
