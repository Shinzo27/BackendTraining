import { hodCardData } from "@/lib/Constants";
import { HodData } from "@/lib/Types";
import DataCard from "../DataCard";

const HodLeaveData = ({ hodData }: { hodData: HodData }) => {
  const leaveDetails = hodCardData({ ...hodData });
  return (
    <div className="mt-10 flex items-center justify-center flex-wrap">
      {leaveDetails.map((data, index) => (
        <DataCard data={data} key={index} />
      ))}
    </div>
  );
};

export default HodLeaveData;
