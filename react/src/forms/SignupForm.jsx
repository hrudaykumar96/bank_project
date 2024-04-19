import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import ButtonLoader from "../effects/ButtonLoader";
import propTypes from "prop-types";
import { createuser } from "../services/admin_api";

const SignupForm = ({showalert, closeall}) => {

  const [count,setCount]=useState(0);
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState(null);


  const { values, handleSubmit, setErrors, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      dob: "",
      gender: "",
      address: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(4, "name should be atleast 4 characters")
        .required("enter your name"),
      email: yup
        .string()
        .email("enter valid email")
        .required("enter your email"),
      mobile: yup
        .string()
        .length(10, "enter valid mobile number")
        .required("enter your mobile number"),
      dob: yup.string().required("please select your date of birth"),
      gender: yup.string().required("Please select gender"),
      address: yup
        .string()
        .min(5, "enter your full address")
        .required("enter your address"),
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
      const response=await createuser(values);
      setMessage(response.data);
      setLoading(false);
      setCount(count+1);
    },
  });

  useEffect(() => {
    if (message === "" || message === null || message === undefined) {
      showalert("", "");
    } else if (message === "email already registered") {
      setErrors({email:"email already registered"});
    } else if (message === "mobile number already registered") {
      setErrors({mobile:"mobile number already registered"});
    } else if (message === "user created successfully") {
      closeall();
      showalert("user created successfully", "success");
    } else {
      showalert("");
      setErrors("");
    }
  },[count]);
  

  return (
    <div className="signup">
      <form className="signup-form container row" onSubmit={handleSubmit}>
        <h3 className="text-center text-light">create account</h3>
        <div className="mb-3 col-md-6">
          <label htmlFor="name" className="form-label">
            name:
          </label>
          <span className="imp">*</span>
          <input
            type="text"
            placeholder="enter your full name"
            className="form-control"
            name="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.name && { border: "2px solid red" }}
          />
          {errors.name && (
            <small className="bg-light text-danger">{errors.name}</small>
          )}
        </div>
        <div className="mb-3 col-md-6">
          <label htmlFor="email" className="form-label">
            email:
          </label>
          <span className="imp">*</span>
          <input
            type="email"
            placeholder="enter your email address"
            className="form-control"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.email && { border: "2px solid red" }}
          />
          {errors.email && (
            <small className="bg-light text-danger">{errors.email}</small>
          )}
        </div>
        <div className="mb-3 col-md-6">
          <label htmlFor="number" className="form-label">
            mobile number:
          </label>
          <span className="imp">*</span>
          <input
            type="number"
            placeholder="enter your mobile number"
            className="form-control"
            name="mobile"
            value={values.mobile}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.mobile && { border: "2px solid red" }}
          />
          {errors.mobile && (
            <small className="bg-light text-danger">{errors.mobile}</small>
          )}
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="date" className="form-label">
            date of birth
          </label>
          <span className="text-danger">*</span>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={values.dob}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.dob && { border: "2px solid red" }}
          />
          {errors.dob && (
            <small className="bg-light text-danger">{errors.dob}</small>
          )}
        </div>
        <div className="mb-3 col-md-6">
          <label htmlFor="gender" className="form-label">
            gender:
          </label>
          <span className="imp">*</span>
          <br />
          <div className="form-check form-check-inline">
            <label htmlFor="male" className="form-check-label">
              male
            </label>
            <input
              type="radio"
              value="male"
              name="gender"
              className="form-check-input"
              style={errors.gender && { border: "2px solid red" }}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className="form-check form-check-inline">
            <label htmlFor="female" className="form-check-label">
              female
            </label>
            <input
              type="radio"
              value="female"
              name="gender"
              className="form-check-input"
              style={errors.gender && { border: "2px solid red" }}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className="form-check form-check-inline">
            <label htmlFor="transgender" className="form-check-label">
              transgender
            </label>
            <input
              type="radio"
              value="transgender"
              name="gender"
              className="form-check-input"
              style={errors.gender && { border: "2px solid red" }}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <br />
          {errors.gender && (
            <small className="bg-light text-danger">{errors.gender}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            address:
          </label>
          <span className="imp">*</span>
          <textarea
            cols="30"
            rows="10"
            className="form-control"
            placeholder="enter your address"
            name="address"
            value={values.address}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.address && { border: "2px solid red" }}
          ></textarea>
          {errors.address && (
            <small className="bg-light text-danger">{errors.address}</small>
          )}
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <span className="text-danger">*</span>
          <input
            type="password"
            className="form-control"
            placeholder="enter your password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.password && { border: "2px solid red" }}
          />
          {errors.password && (
            <small className="bg-light text-danger">{errors.password}</small>
          )}
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="cnfpassword" className="form-label">
            confirm password
          </label>
          <span className="text-danger">*</span>
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
            <small className="bg-light text-danger">
              {errors.confirm_password}
            </small>
          )}
        </div>
        <div className="mb-3">
          {loading ? (
            <ButtonLoader />
          ) : (
            <input
              type="submit"
              value="create account"
              className="btn btn-success"
            />
          )}
        </div>
      </form>
    </div>
  );
};
SignupForm.propTypes={
  showalert:propTypes.func,
  closeall:propTypes.func
}
export default SignupForm;