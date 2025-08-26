/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "next-auth/react";
import AdminData from "./AdminData";
import { useEffect, useState } from "react";
import { IAdminData } from "@/lib/Types";
import { api } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ManageStudent from "./ManageStudent";
import ManageFaculties from "./ManageFaculties";
import ManageHods from "./ManageHods";
import ManageStaticData from "./ManageStaticData";
import toast from "react-hot-toast";
import Loader from "../Loader";
import HighestLeave from "./HighestLeave";

const Admin = () => {
  const { data: session } = useSession();
  const [adminData, setAdminData] = useState<IAdminData>({
    totalUser: 0,
    pendingLeaves: 0,
    approvalPercentage: 0,
    totalRequest: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await api.get("/admin/getLeaveReport");
        setAdminData(data.leaveData);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="mb-20 ">
      <div className="m-5">
        <h1 className="font-bold text-2xl">Admin Dashboard</h1>
        <p>Welcome back, {session?.user.name}</p>
      </div>
      <AdminData adminData={adminData} />
      <div className="flex items-start justify-center gap-20 mt-10 flex-wrap">
        <Tabs defaultValue="students" className="w-[1300px]">
          <TabsList className="grid w-full grid-cols-5 bg-neutral-800">
            <TabsTrigger
              className="data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
              value="students"
            >
              Manage Student
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
              value="faculties"
            >
              Manage Faculty
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
              value="hods"
            >
              Manage HODs
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
              value="staticData"
            >
              Manage Static Data
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
              value="highestLeave"
            >
              Leave Request Data
            </TabsTrigger>
          </TabsList>
          <TabsContent value="students">
            <ManageStudent />
          </TabsContent>
          <TabsContent value="faculties">
            <ManageFaculties />
          </TabsContent>
          <TabsContent value="hods">
            <ManageHods />
          </TabsContent>
          <TabsContent value="staticData">
            <ManageStaticData />
          </TabsContent>
          <TabsContent value="highestLeave">
            <HighestLeave />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
