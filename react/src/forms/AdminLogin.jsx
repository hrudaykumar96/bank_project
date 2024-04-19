import { Link, useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import ButtonLoader from "../effects/ButtonLoader";
import { adminlogin } from "../services/admin_api";

const AdminLogin = ({ closeuserlogin, openuserlogin }) => {

  const [loading,setLoading]=useState(false);
  const [data,setData]=useState("");
  const navigate=useNavigate();
  const [count,setCount]=useState(0);


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
    onSubmit: async(values) => {
      setLoading(true);
      await adminlogin(values).then((res)=>setData(res.data));
      setLoading(false);
      setCount(count+1);
    },
  });

  useEffect(()=>{
    if (data==="" || data===null || data===undefined){
      setErrors("");
    }
    else if(data==="incorrect password"){
      setErrors({password:"incorrect password"});
    }
    else if(data==="email not registered"){
      setErrors({email:"email not registered"});
    }
    else{
      localStorage.setItem("banker_admin",data);
      setErrors("");
      navigate("/admin");
    }
  },[count]);


  return (
    <div className="admin-login">
      <form className="admin-form" onSubmit={handleSubmit}>
        <i className="fa-solid fa-xmark" onClick={closeuserlogin}></i>
        <h3 className="text-center">admin login</h3>
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
            <div className="mb-3 signup-btn">
              <input type="submit" value="login" className="btn btn-primary" />
              <div className="link">
                <Link to="/admin_reset" onClick={closeuserlogin}>
                  forgot password
                </Link>
              </div>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={openuserlogin}
              >
                personal banking
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
AdminLogin.propTypes = {
  closeuserlogin: propTypes.func,
  openuserlogin: propTypes.func,
};
export default AdminLogin;