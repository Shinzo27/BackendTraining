import * as Yup from "yup";

export const loginValidations = Yup.object({
  email: Yup.string().email("Enter email correctly!").required("Required"),
  password: Yup.string().required("Required"),
});

export const resetValidations = Yup.object({
  email: Yup.string().email("Enter email correctly!").required("Required"),
});

export const verifyOtpValidation = Yup.object({
  email: Yup.string().email("Enter email correctly!").required("Required"),
  otp: Yup.number()
    .integer()
    .required("Required")
    .min(100000, "6 numbers required!")
    .max(999999, "Only 6 numbers are allowed")
    .typeError("Only numbers are allowed"),
});

export const resetPasswordValidation = Yup.object({
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string().required("Required"),
});

export const registerValidations = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  gender: Yup.string().required(),
  gr_number: Yup.number()
    .integer()
    .required()
    .typeError("Only Numbers allowed!"),
  phone: Yup.string().required(),
  address: Yup.string().required(),
  department: Yup.string().required(),
  className: Yup.string().required(),
});

export const registerInitialValue = {
  name: "",
  email: "",
  password: "",
  gender: "",
  gr_number: "",
  phone: "",
  address: "",
  department: "",
  className: "",
};

export interface registerStudent {
  name: string;
  email: string;
  password: string;
  gender: string;
  gr_number: string;
  phone: string;
  address: string;
  department: string;
  className: string;
}

export interface LeaveData {
  availableLeave: number;
  approvedLeave: number;
  rejectedLeave: number;
  attendancePercentage: number;
}

export interface IFacultyLeaveData {
  availableLeave: number;
  approvedLeave: number;
  studentRequestedTo: number;
  attendancePercentage: number;
}

export interface IHodLeaveData {
  facultyLeaves: number;
  studentLeaves: number;
  totalFaculty: number;
  totalStudents: number;
}

export const leaveValidation = Yup.object({
  startDate: Yup.string().required("Required"),
  endDate: Yup.string().required("Required"),
  requestToId: Yup.string().required("Required"),
  leaveType: Yup.string().required("Required"),
  reason: Yup.string().required(),
});

export interface leaveValidation {
  startDate: string;
  endDate: string;
  requestToId: string;
  leaveType: string;
  reason: string;
}

export interface Leave {
  createdAt: string;
  endDate: string;
  id: number;
  leaveType: string;
  reason: string;
  requestToId: string;
  startDate: string;
  status: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
  };
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  class: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  class: string;
}

export interface HodData {
  facultyLeaves: number;
  studentLeaves: number;
  totalFaculty: number;
  totalStudents: number;
}

export interface IAdminData {
  totalUser: number;
  pendingLeaves: number;
  approvalPercentage: number;
  totalRequest: number;
}

export interface IUserDetail {
  name: string;
  email: string;
  department: string;
  id: string;
}

export interface IStaticData {
  id: number;
  department: string;
  class: string;
  academicYear: string;
  totalLeave: number;
  totalWorkingDays: number;
}

export interface IDataCard {
  title: string;
  data: number;
  subtitle: string;
  fontColor: string;
}

export const updateUserData = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email().required("Required!"),
  gender: Yup.string().required("Required!"),
  address: Yup.string().required("Required!"),
  className: Yup.string().required("Required!"),
  department: Yup.string().required("Required!"),
  phone: Yup.string().required("Required!"),
  gr_number: Yup.string().required("Required"),
});

export interface IUpdateUserData {
  name: string;
  id: string;
  email: string;
  gender: string;
  address: string;
  className: string;
  department: string;
  phone: string;
  roleId: number;
  gr_number: string;
}

export const staticDataValidations = Yup.object({
  department: Yup.string().required("Required"),
  className: Yup.string().required("Required"),
  academicYear: Yup.string().required("Required"),
  totalLeave: Yup.number()
    .integer()
    .required("Required")
    .typeError("Only number allowed!"),
  totalWorkingDays: Yup.number()
    .integer()
    .required("Required")
    .typeError("Only number allowed!"),
});

export interface IAddStaticData {
  department: string;
  className: string;
  academicYear: string;
  totalLeave: number;
  totalWorkingDays: number;
}

export interface IUpdateStaticData {
  id: number,
  department: string;
  className: string;
  academicYear: string;
  totalLeave: number;
  totalWorkingDays: number;
}