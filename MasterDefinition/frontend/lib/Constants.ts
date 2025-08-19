export const leaves = [
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    startDate: "12/07/2025",
    endDate: "16/07/2025",
    status: "Pending",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    startDate: "12/07/2025",
    endDate: "16/07/2025",
    status: "Approved",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    startDate: "12/07/2025",
    endDate: "16/07/2025",
    status: "Rejected",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    startDate: "12/07/2025",
    endDate: "16/07/2025",
    status: "Approved",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    startDate: "12/07/2025",
    endDate: "16/07/2025",
    status: "Approved",
  },
];

export const leaveData = {
  totalApplication: 1,
  availableLeave: 10,
  approvedLeave: 5,
  rejectedLeave: 2,
  attendancePercentage: 75,
};

export const adminCardData = ({
  approvalPercentage,
  pendingLeaves,
  totalRequest,
  totalUser,
}: {
  approvalPercentage: number;
  pendingLeaves: number;
  totalRequest: number;
  totalUser: number;
}) => [
  {
    title: "Total Users",
    data: totalUser,
    subtitle: "Users",
    fontColor: "text-white",
  },
  {
    title: "Total Requests",
    data: totalRequest,
    subtitle: "Requests",
    fontColor: "text-amber-300",
  },
  {
    title: "Approval Percentage",
    data: approvalPercentage,
    subtitle: "Percentage",
    fontColor: "text-orange-500",
  },
  {
    title: "Pending Leaves",
    data: pendingLeaves,
    subtitle: "Leaves",
    fontColor: "text-red-600",
  },
];

export const facultyCardData = ({
  totalApplication,
  availableLeave,
  approvedLeave,
  studentRequestedTo,
  attendancePercentage,
}: {
  totalApplication: number;
  availableLeave: number;
  approvedLeave: number;
  studentRequestedTo: number;
  attendancePercentage: number;
}) => [
  {
    title: "My Applications",
    data: totalApplication,
    subtitle: "Applications",
    fontColor: "text-white",
  },
  {
    title: "Approved Leaves",
    data: approvedLeave,
    subtitle: "Leaves",
    fontColor: "text-amber-300",
  },
  {
    title: "Available Leaves",
    data: availableLeave,
    subtitle: "Leaves",
    fontColor: "text-orange-500",
  },
  {
    title: "Attendance Percentage",
    data: attendancePercentage,
    subtitle: "Percentage",
    fontColor: "text-amber-300",
  },
  {
    title: "Student Requests",
    data: studentRequestedTo,
    subtitle: "Requests",
    fontColor: "text-fuchsia-300",
  },
];

// Faculty Leaves
// Student Leaves
// Total Students
// Total Faculties

export const hodCardData = ({
  facultyLeaves,
  studentLeaves,
  totalStudents,
  totalFaculty,
}: {
  facultyLeaves: number;
  studentLeaves: number;
  totalStudents: number;
  totalFaculty: number;
}) => [
  {
    title: "Faculty Leaves",
    data: facultyLeaves,
    subtitle: "Applications",
    fontColor: "text-white",
  },
  {
    title: "Students Leaves",
    data: studentLeaves,
    subtitle: "Leaves",
    fontColor: "text-amber-300",
  },
  {
    title: "Total Students",
    data: totalStudents,
    subtitle: "Students",
    fontColor: "text-orange-500",
  },
  {
    title: "Total Faculties",
    data: totalFaculty,
    subtitle: "Faculties",
    fontColor: "text-amber-300",
  },
];

export const studentCardData = ({
  totalApplication,
  availableLeave,
  approvedLeave,
  rejectedLeave,
  attendancePercentage,
}: {
  totalApplication: number;
  availableLeave: number;
  approvedLeave: number;
  rejectedLeave: number;
  attendancePercentage: number;
}) => [
  {
    title: "My Applications",
    data: totalApplication,
    subtitle: "Applications",
    fontColor: "text-white",
  },
  {
    title: "Available Leaves",
    data: availableLeave,
    subtitle: "Leaves",
    fontColor: "text-amber-300",
  },
  {
    title: "Approved Leaves",
    data: approvedLeave,
    subtitle: "Leaves",
    fontColor: "text-orange-500",
  },
  {
    title: "Rejected Leaves",
    data: rejectedLeave,
    subtitle: "Leaves",
    fontColor: "text-red-600",
  },
  {
    title: "Attendance Percentage",
    data: attendancePercentage,
    subtitle: "Percentage",
    fontColor: "text-orange-300",
  },
];
