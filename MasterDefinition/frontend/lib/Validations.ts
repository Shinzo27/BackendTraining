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

export const leaveValidation = Yup.object({
  startDate: Yup.string().required("Required"),
  endDate: Yup.string().required("Required"),
  requestToId: Yup.string().required("Required"),
  leaveType: Yup.string().required("Required"),
  reason: Yup.string().required(),
});

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
