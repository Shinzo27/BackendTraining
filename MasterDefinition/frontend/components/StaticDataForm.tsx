/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const StaticDataForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  type,
}: {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleBlur: any;
  handleSubmit: any;
  type: "add" | "update";
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col items-center justify-center gap-7"
    >
      <div className="flex flex-col gap-4">
        <Label>Department</Label>
        <Input
          type="department"
          name="department"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.department}
          className="px-4 py-6"
          placeholder="Enter department name"
        />
        {errors.department && touched.department && errors.department}
      </div>
      <div className="flex flex-col gap-4">
        <Label>Class</Label>
        <Input
          type="className"
          name="className"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.className}
          className="px-4 py-6"
          placeholder="Enter your className"
        />
        {errors.className && touched.className && errors.className}
      </div>
      <div className="flex flex-col gap-4">
        <Label>Academic Year</Label>
        <Input
          type="academicYear"
          name="academicYear"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.academicYear}
          className="px-4 py-6"
          placeholder="Enter your academicYear"
        />
        {errors.academicYear && touched.academicYear && errors.academicYear}
      </div>
      <div className="flex flex-col gap-4">
        <Label>Total Leave</Label>
        <Input
          type="totalLeave"
          name="totalLeave"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.totalLeave}
          className="px-4 py-6"
          placeholder="Enter your totalLeave"
        />
        {errors.totalLeave && touched.totalLeave && errors.totalLeave}
      </div>
      <div className="flex flex-col gap-4">
        <Label>Total Working Days</Label>
        <Input
          type="totalWorkingDays"
          name="totalWorkingDays"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.totalWorkingDays}
          className="px-4 py-6"
          placeholder="Enter your totalWorkingDays"
        />
        {errors.totalWorkingDays &&
          touched.totalWorkingDays &&
          errors.totalWorkingDays}
      </div>
      <Button
        type="submit"
        className="px-7 py-6 bg-neutral-950 font-bold text-lg"
      >
        {type === "add" ? <p>Add Static Data</p> : <p>Update Static Data</p>}
      </Button>
    </form>
  );
};

export default StaticDataForm;
