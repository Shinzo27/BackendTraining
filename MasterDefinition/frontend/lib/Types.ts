import * as Yup from "yup";

export const loginValidations = Yup.object({
  email: Yup.string().email("Enter email correctly!").required("Required"),
  password: Yup.string().required("Required"),
});

export const resetValidations = Yup.object({
  email: Yup.string().email("Enter email correctly!").required("Required")
})

export const registerValidations = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  gender: Yup.string().required(),
  gr_number: Yup.number().integer().required().typeError("Only Numbers allowed!"),
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
}