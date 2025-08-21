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
    throw new Error(error.response.data.error);
  }
};

export const studentLeaveApply = async (values: leaveValidation) => {
  try {
    const { data } = await api.post("/student/applyStudentLeave", {
      startDate: values.startDate.trim(),
      endDate: values.endDate.trim(),
      leaveType: values.leaveType.trim(),
      requestToId: values.requestToId.trim(),
      reason: values.reason.trim(),
      status: "Pending",
    });

    if (data.success) return data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
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
    throw new Error(error.response.data.error);
  }
};

export const facultyLeaveApply = async (values: leaveValidation) => {
  try {
    const { data } = await api.post("/faculty/applyFacultyLeave", {
      startDate: values.startDate.trim(),
      endDate: values.endDate.trim(),
      leaveType: values.leaveType.trim(),
      requestToId: values.requestToId.trim(),
      reason: values.reason.trim(),
      status: "Pending",
    });

    if (data.success) return data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
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
    if (data && data.success) {
      return data;
    } else throw new Error(data.message);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
