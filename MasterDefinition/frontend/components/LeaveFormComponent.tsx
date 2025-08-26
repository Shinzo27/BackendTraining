/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDownIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { ILeaveFormFaculty } from "@/lib/Types";
import { format } from "date-fns";

const LeaveFormComponent = ({
  faculties,
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  setFieldValue,
}: {
  faculties: ILeaveFormFaculty[];
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleSubmit: any;
  setFieldValue: any;
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <form
      className="mt-6 flex items-center justify-center gap-10 flex-col "
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex items-center justify-center gap-6 flex-col sm:flex-row">
        <div className="flex flex-col gap-4 items-center">
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
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
            <PopoverTrigger asChild className="py-6">
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {endDate ? endDate.toLocaleDateString() : "Select end date"}
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
                  setFieldValue("endDate", format(date as Date, "MM/dd/yyyy"));
                  setEndDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          {errors.endDate && touched.endDate && errors.endDate}
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 sm:flex-row flex-col">
        <div className="flex flex-col gap-4 items-center">
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
          {errors.requestToId && touched.requestToId && errors.requestToId}
        </div>
        <div className="flex flex-col gap-4 items-center">
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
      </div>
      <div className="flex items-center justify-center gap-5">
        <div className="flex flex-col gap-4 items-center">
          <Textarea
            name="reason"
            className="px-4 py-6 sm:w-[445px] w-[250px]"
            placeholder="Enter the reason "
            defaultValue={values.reason}
            onChange={handleChange}
          />
          {errors.reason && touched.reason && errors.reason}
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <Button
          type="submit"
          className="px-7 py-6 bg-neutral-950 font-bold text-lg cursor-pointer"
        >
          Apply Leave
        </Button>
      </div>
    </form>
  );
};

export default LeaveFormComponent;
