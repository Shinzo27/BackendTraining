export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    role: "APPLICANT" | "RECRUITER",
    createdAt: Date
}

export interface TokenUser {
  id: number;
  name: string;
  role: "RECRUITER" | "APPLICANT";
  email: string;
  iat: number;
}