import { adminCardData } from "@/lib/Constants";
import { IAdminData } from "@/lib/Types";
import DataCard from "../DataCard";

const AdminData = ({ adminData }: { adminData: IAdminData }) => {
  const data = adminCardData({ ...adminData });

  return (
    <div className="mt-10 flex items-center justify-center flex-wrap">
      {data.map((card, index) => (
        <DataCard data={card} key={index} />
      ))}
    </div>
  );
};

export default AdminData;
