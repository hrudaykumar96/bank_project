import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { resetuserpassword } from "../services/user_api";
import { useEffect, useState } from "react";
import propTypes from "prop-types";
import ButtonLoader from "../effects/ButtonLoader";

const ForgotPassword = ({ showalert }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const { values, errors, setErrors, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        email: "",
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
        const response = await resetuserpassword(values);
        setMessage(response.data);
        setLoading(false);
        setCount(count + 1);
      },
    });

  useEffect(() => {
    if (message === null || message === "" || message === undefined) {
      showalert(null);
    } else if (message === "password changed successfully") {
      navigate("/");
      showalert("password updated successfully", "success");
    } else if (message === "email not registered") {
      setErrors({ email: "email not registered" });
    } else if (message === "please try again later") {
      navigate("/");
      showalert("please try again later", "warning");
    } else {
      showalert(null);
    }
  }, [count]);

  return (
    <div className="reset-password bg-secondary">
      <form className="reset-form" onSubmit={handleSubmit}>
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
            name="email"
            value={values.email}
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
        <div className="mb-3">
          {loading ? (
            <ButtonLoader />
          ) : (
            <>
              <div className="button mb-3">
                <input
                  type="submit"
                  className="btn btn-success w-100"
                  value="change password"
                />
              </div>
              <div className="link w-100 text-center mb-3">
                <Link to="/">Move to Home Page</Link>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
ForgotPassword.propTypes = {
  showalert: propTypes.func,
};
export default ForgotPassword;