import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import { resetpassword } from "../services/admin_api";
import { useEffect, useState } from "react";
import ButtonLoader from "../effects/ButtonLoader";

const ChangePassword = ({ closepasswordform, userdata, showalert }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [count,setCount]=useState(0);
  const { values, errors, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: userdata.email,
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("enter valid email")
        .required("enter your email"),
      password: yup
        .string()
        .required("enter your password")
        .min(5, "password should be atleast 5 characters")
        .max(12, "password should not exceeds greater than 12 characters"),
      confirm_password: yup
        .string()
        .required("enter confirm password")
        .oneOf(
          [yup.ref("password")],
          "password does not match with confirm password"
        ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await resetpassword(values);
      setMessage(response.data);
      setLoading(false);
      setCount(count+1);
    },
  });

  useEffect(() => {
    if (message === null || message === "" || message === undefined) {
      showalert(null);
    } else if (message === "password changed successfully") {
      closepasswordform();
      showalert("password updated successfully", "success");
    } else if (message === "email not registered") {
      closepasswordform();
      showalert("email not registered", "info");
    } else if (message === "please try again later") {
      closepasswordform();
      showalert("please try again later", "warning");
    } else {
      showalert(null);
    }
  },[count]);
  
  return (
    <div className="reset-page">
      <form className="changepassword-form" onSubmit={handleSubmit}>
        <h3 className="text-center">reset password</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email:
          </label>
          <span className="imp">*</span>
          <input
            type="email"
            className="form-control"
            placeholder="enter email address"
            value={values.email}
            disabled
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.email && { border: "2px solid red" }}
          />
          {errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password:
          </label>
          <span className="imp">*</span>
          <input
            type="password"
            className="form-control"
            placeholder="enter password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.password && { border: "2px solid red" }}
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="confirm password" className="form-label">
            confirm password:
          </label>
          <span className="imp">*</span>
          <input
            type="password"
            className="form-control"
            placeholder="enter confirm password"
            name="confirm_password"
            value={values.confirm_password}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.confirm_password && { border: "2px solid red" }}
          />
          {errors.confirm_password && (
            <small className="text-danger">{errors.confirm_password}</small>
          )}
        </div>
        <div className="mb-3 pwd-btn">
          {loading ? (
            <ButtonLoader />
          ) : (
            <>
              <input
                type="submit"
                className="btn btn-success"
                value="change password"
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={closepasswordform}
              >
                cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
ChangePassword.propTypes = {
  closepasswordform: propTypes.func,
  userdata: propTypes.any,
  showalert: propTypes.func,
};
export default ChangePassword;