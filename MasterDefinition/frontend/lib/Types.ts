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

export interface IAddStaticData {
  department: string;
  className: string;
  academicYear: string;
  totalLeave: number;
  totalWorkingDays: number;
}

export interface IUpdateStaticData {
  id: number;
  department: string;
  className: string;
  academicYear: string;
  totalLeave: number;
  totalWorkingDays: number;
}

export interface IUserHighestLeaveData {
  id: string;
  name: string;
  count: number;
  department: string;
}

export interface IBelowPercentageData {
  attendancePercentage: number;
  user: {
    id: string;
    name: string;
    department: string;
  };
}

export interface IPendingLeaves {
  id: number;
  user: {
    name: string;
  };
  requestTo: {
    name: string;
  };
  reason: string;
}
