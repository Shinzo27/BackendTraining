export const RESPONSE_MESSAGES = {
  USER: {
    Signin: "User Logged In Successfully!",
    Signup: "User Registered Successfully!",
    FETCHED: "User Profile Fetched Successfully!",
    UPDATED: "User Profile Updated Successfully!",
  },
  COMPANY: {
    FETCHED: "Company profile fetched successfully!",
    UPDATED: "Company profile updated successfully!",
    CREATED: "Company profile created successfully!",
  },
  JOB: {
    FETCHED: "Jobs fetched successfully!",
    UPDATED: "Job updated successfully!",
    CREATED: "Job created successfully!",
    DELETED: "Job deleted successfully!",
  },
  APPLICATIONS: {
    CREATED: "Applied for the job!",
    FETCHED: "Job Application Fetched!",
  },
  ERROR: {
    BAD_REQUEST: "Bad Request.",
    NOT_FOUND: "Not Found",
    VALIDATION_ERROR: "Validation Error",
    USER: {
      INCORRECT_PASSWORD: "Password is incorrect!",
      NOT_FOUND: "User Not Found!",
      ALREADY_EXISTS: "Email is already registered!",
      NOT_LOGGEDIN: "User is not logged in.",
    },
    COMPANY: {
      NOT_VALID: "Not valid user to register a company!",
      ALREADY_EXISTS: "Company with this name already exists!",
    },
    JOBS: {
      NOT_VALID: "Not valid user to create a job!",
    },
    APPLICATIONS: {
      ALREADY_EXISTS: "Application for this job already exists!"
    },
    UNAUTHORIZED: "You are not authorized to access this route!",
  },
};
