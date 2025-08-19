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
    console.log(error);
  }
};

export const updateUser = async (userData: IUpdateUserData) => {
  try {
    console.log(userData);
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
    console.log(error);
  }
};

export const addStaticData = async (staticData: IAddStaticData) => {
  try {
    const { data } = await api.post("/admin/createStaticData", {
      ...staticData,
    });
    if (data.success) return data;
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  }
};

export const updateStaticData = async (staticData: IUpdateStaticData) => {
  try {
    const { data } = await api.put(`/admin/updateStaticData/${staticData.id}`);
    if (data.success) return data;
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  }
};
