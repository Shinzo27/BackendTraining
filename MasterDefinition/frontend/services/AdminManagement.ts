/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import {
  IAddStaticData,
  IUpdateStaticData,
  IUpdateUserData,
} from "@/lib/Types";
import toast from "react-hot-toast";

export const deleteUser = async (id: string) => {
  try {
    const { data } = await api.delete(`/admin/deleteUser/${id}`);

    if (data.success) return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const updateUser = async (userData: IUpdateUserData) => {
  try {
    const payload = {
      name: userData.name,
      email: userData.email,
      gender: userData.gender,
      gr_number: userData.gr_number,
      phone: userData.phone,
      address: userData.address,
      department: userData.department,
      className: userData.className,
      roleId: userData.roleId,
    };
    const { data } = await api.put(`/admin/updateUserDetails/${userData.id}`, {
      ...payload,
    });

    if (data.success) return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const addStaticData = async (staticData: IAddStaticData) => {
  try {
    const { data } = await api.post("/admin/createStaticData", {
      ...staticData,
    });
    if (data.success) return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const updateStaticData = async (staticData: IUpdateStaticData) => {
  try {
    const payload = {
      id: staticData.id,
      department: staticData.department,
      academicYear: staticData.academicYear,
      totalLeave: staticData.totalLeave,
      totalWorkingDays: staticData.totalWorkingDays,
      className: staticData.className,
    };
    const { data } = await api.put(`/admin/updateStaticData/${staticData.id}`, {
      ...payload,
    });
    if (data.success) return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};
