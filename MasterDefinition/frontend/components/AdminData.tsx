import { IAdminData } from "@/lib/Types";

const AdminData = ({ adminData }: { adminData: IAdminData }) => {
  return (
    <div className="mt-10 flex items-center justify-center flex-wrap">
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Total Users</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center">
            {adminData.totalUser}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Total Requests</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-amber-300">
            {adminData.totalRequest}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Approval Percentage</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-orange-500">
            {adminData.approvalPercentage}
          </h1>
          <p className="font-light text-md">Percentage</p>
        </div>
      </div>
      <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
        <h1 className="font-bold text-xl">Pending Leaves</h1>
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <h1 className="font-bold text-2xl text-center text-red-600">
            {adminData.pendingLeaves}
          </h1>
          <p className="font-light text-md">This Academic Year</p>
        </div>
      </div>
    </div>
  );
};

export default AdminData;
