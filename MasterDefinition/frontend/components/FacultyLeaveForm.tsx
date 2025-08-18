/* eslint-disable @typescript-eslint/no-explicit-any */
import { api, facultyLeaveApply } from "@/lib/api";
import { Leave, leaveValidation } from "@/lib/Types";
import { Formik } from "formik";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Faculty {
  id: string;
  name: string;
}

const FacultyLeaveForm = ({
  setLeaves,
  setTotalApplication,
}: {
  setLeaves: Dispatch<SetStateAction<Leave[] | []>>;
  setTotalApplication: Dispatch<SetStateAction<number>>;
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [faculties, setFaculties] = useState<Faculty[] | undefined>();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    async function getFaculties() {
      try {
        const { data } = await api.get("/faculty/getFacultyOfDepartment", {
          withCredentials: true,
        });

        if (data.success) {
          setFaculties(data.faculty);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getFaculties();
  }, []);
  return (
    <div className="bg-neutral-800 p-10 rounded-2xl">
      <div>
        <h1 className="font-bold text-xl">Apply Leave</h1>
        <p className="text-sm">Enter details to apply for leave</p>
      </div>
      <div className="mt-6 flex items-center justify-center gap-10 flex-col">
        <Formik
          initialValues={{
            startDate: "",
            endDate: "",
            requestToId: "",
            leaveType: "",
            reason: "",
          }}
          validationSchema={leaveValidation}
          onSubmit={async (values) => {
            try {
              const leave = await facultyLeaveApply(values);
              if (leave.success) {
                toast.success(leave.message);
                setLeaves(leave.leaves);
                const length = leave.leaves.length;
                setTotalApplication(length);
              }
            } catch (error: any) {
              toast.error(error.message);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form
              className="mt-6 flex items-center justify-center gap-10 flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex items-center justify-center gap-6 sm:flex-row flex-col">
                <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                  <PopoverTrigger asChild className="py-6">
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                    >
                      {startDate
                        ? startDate.toLocaleDateString()
                        : "Select start date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0 bg-neutral-800 px-4 py-6"
                    align="start"
                    defaultValue={values.startDate}
                    id="startDate"
                  >
                    <Calendar
                      mode="single"
                      selected={startDate as Date}
                      captionLayout="dropdown"
                      hidden={{ before: today }}
                      onSelect={(date) => {
                        setStartDate(date);
                        setFieldValue(
                          "startDate",
                          format(date as Date, "MM/dd/yyyy")
                        );
                        setStartDateOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {errors.startDate && touched.startDate && errors.startDate}
                <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                  <PopoverTrigger asChild className="py-6">
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                    >
                      {endDate
                        ? endDate.toLocaleDateString()
                        : "Select end date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0 bg-neutral-800 px-4 py-6"
                    align="start"
                    defaultValue={values.endDate}
                    id="endDate"
                  >
                    <Calendar
                      id="endDate"
                      mode="single"
                      selected={endDate as Date}
                      hidden={{ before: today }}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setEndDate(date);
                        setFieldValue(
                          "endDate",
                          format(date as Date, "MM/dd/yyyy")
                        );
                        setEndDateOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {errors.endDate && touched.endDate && errors.endDate}
              </div>
              <div className="flex items-center justify-center gap-5 sm:flex-row flex-col">
                <Select
                  name="requestToId"
                  defaultValue={values.requestToId}
                  onValueChange={(value) => setFieldValue("requestToId", value)}
                >
                  <SelectTrigger className="px-10 py-6 bg-neutral-800 font-semibold">
                    <SelectValue placeholder="Request To" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 font-semibold">
                    {faculties?.map((faculty, index) => (
                      <SelectItem value={faculty.id} key={index}>
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.requestToId &&
                  touched.requestToId &&
                  errors.requestToId}
                <Select
                  name="leaveType"
                  defaultValue={values.leaveType}
                  onValueChange={(value) => setFieldValue("leaveType", value)}
                >
                  <SelectTrigger className="px-10 py-6 bg-neutral-800 font-semibold">
                    <SelectValue placeholder="Leave Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 font-semibold">
                    <SelectItem value="FirstHalf">First Half</SelectItem>
                    <SelectItem value="SecondHalf">Second Half</SelectItem>
                    <SelectItem value="FullDay">Full Day</SelectItem>
                  </SelectContent>
                </Select>
                {errors.leaveType && touched.leaveType && errors.leaveType}
              </div>
              <div className="flex items-center justify-center gap-5">
                <Textarea
                  name="reason"
                  className="px-4 py-6 sm:w-[445px] w-[250px]"
                  placeholder="Enter the reason "
                  defaultValue={values.reason}
                  onChange={handleChange}
                />
                {errors.reason && touched.reason && errors.reason}
              </div>
              <div className="flex items-center justify-center gap-5">
                <Button
                  type="submit"
                  className="px-7 py-6 bg-neutral-950 font-bold text-lg"
                >
                  Apply Leave
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FacultyLeaveForm;
