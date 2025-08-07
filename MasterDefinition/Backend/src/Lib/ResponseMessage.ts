export const ResponseMessages = {
  USER: {
    LOGIN: "User logged in!",
    REGISTER: "User registered!",
    LOGOUT: "User logged out!",
  },
  ROLE: {
    CREATED: "Role created!",
    FETCHED: "Roles fetched!",
  },
  STUDENT: {
    DETAILS_FETCHED: "Student Details Fetched!",
    LEAVE_BALANCE_FETCHED: "Leave Balance Fetched!"
  },
  LEAVE: {
    REQUESTED: "Leave request applied!",
    FETCHED: "Leave request fetched!",
    UPDATED: "Leave status updated!"
  },
  ADMIN: {
    LEAVELIST: "Leave list fetched!",
    LEAVEREPORT: "Leave report fetched!",
  },
  STATICDATA: {
    CREATED: "Static data created!",
    FETCHED: "Static data fetched!",
    UPDATED: "Static data updated!"
  },
  ERROR: {
    BAD_REQUEST: "Bad Request!",
    NOT_FOUND: "Not Found!",
    UNAUTHORIZE: "You are not authorized to access this route!",
    USER: {
      NOT_FOUND: "User Not Found!",
      ALREADY_EXISTS: "User already exists!",
      WRONG_PASSWORD: "Incorrect Password!",
      NOT_LOGGEDIN: "User is not logged in!",
    },
    STUDENT: {
      NOT_VALID: "User requesting to is not valid!",
      NOT_AVAILABLE_LEAVE: "No available leave left!",
      NOT_ENOUGH_LEAVE: "Not enough available leave!"
    },
    ROLE: {
      NOT_FOUND: "Role Not Found!",
      ALREADY_EXISTS: "Role already exists!",
    },
    VALIDATION_ERROR: "Validation Error!",
    WENT_WRONG: "Something went wrong!",
  },
};
