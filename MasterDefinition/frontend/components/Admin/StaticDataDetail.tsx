import { IStaticData } from "@/lib/Types";
import { Edit2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const StaticDataDetail = ({ staticDetail }: { staticDetail: IStaticData }) => {
  return (
    <div className="mt-5 flex items-center justify-between p-5 bg-neutral-700 rounded-lg">
      <div>
        <p className="font-semibold text-lg">{staticDetail.department}</p>
        <div className="flex items-center justify-start gap-3">
          <p className="font-medium text-sm">class - {staticDetail.class}</p>
          <span>|</span>
          <p className="font-medium text-sm">
            academic Year- {staticDetail.academicYear}
          </p>
        </div>
        <div className="flex items-center justify-start gap-3">
          <p className="font-medium text-sm">
            Total Leave - {staticDetail.totalLeave}
          </p>
          <span>|</span>
          <p className="font-medium text-sm">
            Working Days - {staticDetail.totalWorkingDays}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <Button>
          <Link
            href={`/updateStaticData/${staticDetail.id}`}
            className="bg-amber-700 p-2 rounded-lg flex items-center gap-2 text-sm cursor-pointer"
          >
            <Edit2 /> Edit
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StaticDataDetail;
