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

interface Faculty {
  id: string;
  name: string;
}

const StudentLeaveForm = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [faculties, setFaculties] = useState<Faculty[] | undefined>();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-neutral-800 p-10 rounded-2xl">
      <div>
        <h1 className="font-bold text-xl">Apply Leave</h1>
        <p className="text-sm">Enter details to apply for leave</p>
      </div>
      <div className="mt-6 flex items-center justify-center gap-10 flex-col">
        <div className="flex items-center justify-center gap-14">
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
            >
              <Calendar
                mode="single"
                selected={startDate as Date}
                captionLayout="dropdown"
                hidden={{ before: today }}
                onSelect={(date) => {
                  setStartDate(date);
                  setStartDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
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
            >
              <Calendar
                mode="single"
                selected={endDate as Date}
                hidden={{ before: today }}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setEndDate(date);
                  setEndDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Select name="requestToId">
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
          <Select name="leaveType">
            <SelectTrigger className="px-10 py-6 bg-neutral-800 font-semibold">
              <SelectValue placeholder="Leave Type" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 font-semibold">
              <SelectItem value="firstHalf">First Half</SelectItem>
              <SelectItem value="secondHalf">Second Half</SelectItem>
              <SelectItem value="fullDay">Full Day</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Textarea
            name="email"
            className="px-4 py-6 w-[445px]"
            placeholder="Enter the reason "
          />
        </div>
        <div className="flex items-center justify-center gap-5">
          <Button className="px-7 py-6 bg-neutral-950 font-bold text-lg">
            Apply Leave
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentLeaveForm;
