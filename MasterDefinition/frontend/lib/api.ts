/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { leaveValidation } from "./Types";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export const login = async (email: string, password: string) => {
  try {
    const { data } = await api.post("/users/signin", { email, password });
    if (data.success) return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const studentLeaveApply = async (values: leaveValidation) => {
  try {
    const { data } = await api.post("/student/applyStudentLeave", {
      startDate: values.startDate,
      endDate: values.endDate,
      leaveType: values.leaveType,
      requestToId: values.requestToId,
      reason: values.reason,
      status: "Pending",
    });

    if (data.success) return data;
  } catch (error: any) {
    return error.message;
  }
};

export const leaveRequestConfirm = async (
  id: number,
  status: "Approved" | "Rejected"
) => {
  try {
    const { data } = await api.put(`/faculty/approveLeave/${id}`, { status });
    if (data.success) return data;
  } catch (error: any) {
    return error.message;
  }
};

export const facultyLeaveApply = async (values: leaveValidation) => {
  try {
    const { data } = await api.post("/faculty/applyFacultyLeave", {
      startDate: values.startDate,
      endDate: values.endDate,
      leaveType: values.leaveType,
      requestToId: values.requestToId,
      reason: values.reason,
      status: "Pending",
    });

    if (data.success) return data;
  } catch (error: any) {
    return error.message;
  }
};

export const leaveRequestConfirmHod = async (
  id: number,
  status: "Approved" | "Rejected"
) => {
  try {
    const { data } = await api.put(`/faculty/approveLeaveHod/${id}`, {
      status,
    });
    if (data.success) return data;
  } catch (error: any) {
    return error.message;
  }
};
