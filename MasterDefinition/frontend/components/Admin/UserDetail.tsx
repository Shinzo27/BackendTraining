import { IUserDetail } from "@/lib/Types";
import { DeleteIcon, Edit2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteUser } from "@/services/AdminManagement";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

const UserDetail = ({
  userData,
  setUsers,
}: {
  userData: IUserDetail;
  setUsers: Dispatch<SetStateAction<[] | IUserDetail[]>>;
}) => {
  const handleDelete = async (id: string) => {
    const data = await deleteUser(id);
    if (data.success) {
      toast.success(data.message);
      setUsers(data.users);
    }
  };
  return (
    <div className="mt-5 flex items-center justify-between p-5 bg-neutral-700 rounded-lg">
      <div>
        <p className="font-semibold text-lg">{userData.name}</p>
        <p className="font-medium text-sm">{userData.email}</p>
        <p className="font-medium text-sm">
          <span className="text-sm font-light">Department- </span>{" "}
          {userData.department}
        </p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button>
          <Link
            className="bg-amber-700 p-2 rounded-lg flex items-center gap-2 text-sm cursor-pointer"
            href={`/updateUser/${userData.id}`}
          >
            <Edit2 /> Edit
          </Link>
        </Button>
        <Button
          className="bg-red-700 p-2 rounded-lg flex items-center gap-2 text-sm cursor-pointer"
          onClick={() => handleDelete(userData.id)}
        >
          <DeleteIcon /> Delete
        </Button>
      </div>
    </div>
  );
};

export default UserDetail;
