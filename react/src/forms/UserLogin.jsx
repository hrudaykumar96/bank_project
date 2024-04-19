import { Link, useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import { userlogin } from "../services/user_api";
import { useEffect, useState } from "react";
import ButtonLoader from "../effects/ButtonLoader";

const UserLogin = ({ closeuserlogin, openadminlogin }) => {
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count,setCount]=useState(0);
  const navigate=useNavigate();
  const { values, errors, setErrors, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
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
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await userlogin(values);
      setLogin(response.data);
      setLoading(false);
      setCount(count+1);
    },
  });

  useEffect(()=>{
    if(login==="incorrect password"){
      setErrors({password:"incorrect password"})
    }
    else if(login==="email not registered"){
      setErrors({email:"email not registered"})
    }
    else if(login===""||login===null||login===undefined){
      setErrors("");
      navigate("/");
    }
    else{
      localStorage.setItem("user_token",login);
      setErrors("");
      navigate("/home");
    }
  },[count])

  return (
    <div className="user-login">
      <form className="user-form" onSubmit={handleSubmit}>
        <i className="fa-solid fa-xmark" onClick={closeuserlogin}></i>
        <h3>personal banking</h3>
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
            onChange={handleChange}
            onBlur={handleBlur}
            style={errors.email ? { border: "2px solid red" } : { border: "" }}
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
            onBlur={handleBlur}
            onChange={handleChange}
            name="password"
            value={values.password}
            style={
              errors.password ? { border: "2px solid red" } : { border: "" }
            }
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>
        {loading ? (
          <ButtonLoader />
        ) : (
          <>
            <div className="mb-3 login-btn">
              <div className="button">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="login"
                />
              </div>
              <div className="link">
                <Link to="/reset" onClick={closeuserlogin}>
                  Forgot Password
                </Link>
              </div>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={openadminlogin}
              >
                admin login
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
UserLogin.propTypes = {
  closeuserlogin: propTypes.func,
  openadminlogin: propTypes.func,
};
export default UserLogin;