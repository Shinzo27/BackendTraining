export interface UserRegister {
  name: string;
  email: string;
  password: string;
  gender: "Male" | "Female" | "Other";
  image: string;
  gr_number?: string;
  phone: string;
  address: string;
  department?: string;
  roleId: number;
  className?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface TokenUser {
  id: string;
  name: string;
  email: string;
  role: number;
  iat: number;
}

export interface UserLeaveDetail {
  id: number;
  userId: string;
  totalLeave: number;
  availableLeave: number;
  usedLeave: number;
  academicYear: string;
  totalWorkingDays: number;
  attendancePercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogDetails {
  title: string,
  content: string,
  authorId: string
}