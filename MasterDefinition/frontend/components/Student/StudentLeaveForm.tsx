/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api, studentLeaveApply } from "@/lib/api";
import { Formik } from "formik";
import { ILeaveFormFaculty, Leave, leaveFormInitData } from "@/lib/Types";
import { leaveValidation } from "@/lib/Validations";
import StudentLeaveFormComponent from "../LeaveFormComponent";

const StudentLeaveForm = ({
  setLeaves,
  setTotalApplication,
}: {
  setLeaves: Dispatch<SetStateAction<Leave[] | []>>;
  setTotalApplication: Dispatch<SetStateAction<number>>;
}) => {
  const [faculties, setFaculties] = useState<ILeaveFormFaculty[] | undefined>();

  useEffect(() => {
    async function getFaculties() {
      try {
        const { data } = await api.get("/student/getFacultyOfDepartment", {
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
          initialValues={leaveFormInitData}
          validationSchema={leaveValidation}
          onSubmit={async (values, { resetForm }) => {
            try {
              if (
                (values.leaveType === "FirstHalf" ||
                  values.leaveType === "SecondHalf") &&
                values.startDate !== values.endDate
              ) {
                return toast.error(
                  "Half-day leave is valid for same day only!"
                );
              }
              if (values.startDate > values.endDate)
                return toast.error(
                  "Start Date should have to be lower than End Date!"
                );
              const leave = await studentLeaveApply(values);
              if (leave && leave.success) {
                toast.success(leave.message);
                setLeaves(leave.leaves);
                const length = leave.leaves.length;
                setTotalApplication(length);
                resetForm({ values: leaveFormInitData });
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
            <StudentLeaveFormComponent
              faculties={faculties as ILeaveFormFaculty[]}
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
            />
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StudentLeaveForm;
