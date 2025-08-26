import { facultyCardData } from "@/lib/Constants";
import { IFacultyLeaveData } from "@/lib/Types";
import DataCard from "../DataCard";

const FacultyLeaveData = ({
  totalApplication,
  facultyData,
}: {
  totalApplication: number;
  facultyData: IFacultyLeaveData;
}) => {
  const facultyCardDetails = facultyCardData({
    totalApplication,
    ...facultyData,
  });

  return (
    <div className="mt-10 flex items-center justify-center flex-wrap">
      {facultyCardDetails.map((data, index) => (
        <DataCard data={data} key={index} />
      ))}
    </div>
  );
};

export default FacultyLeaveData;
