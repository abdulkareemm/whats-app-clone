import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required.")
    .matches(/^[a-zA-Z_ ]*$/, "no special characters allowed.")
    .min(3, "Name must be between 3 and 16 characters.")
    .max(16, "Name must be between 3 and 16 characters."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email address is required."),
  password: Yup.string()
    .required("Password in required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters,1 uppercase ,1 lowercase 1 number and 1 special character."
    ),
});
export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email address is required."),
  password: Yup.string()
    .required("Password in required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters,1 uppercase ,1 lowercase 1 number and 1 special character."
    ),
});
