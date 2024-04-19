import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import ButtonLoader from "../effects/ButtonLoader";
import { depositamount } from "../services/admin_api";

const DepositForm = ({ closeform, showalert }) => {

  const [msg,setMsg]=useState("");
  const [loading,setLoading]=useState(false);
  const [count,setCount]=useState(0);
  const { values, errors, setErrors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      account_number: "",
      amount: "",
    },
    validationSchema: yup.object({
      account_number: yup
        .string()
        .required("enter account number")
        .length(10, "invalid account number"),
      amount: yup
        .number()
        .required("Enter Amount")
        .positive("Negative number not allowed")
        .min(1, "Amount should be greater than 0"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response=await depositamount(values);
      setMsg(response.data);
      setLoading(false);
      setCount(count+1);
    },
  });

  useEffect(()=>{
    if(msg===""||msg===null||msg===undefined){
      showalert(null)
    }
    else if(msg==="deposited successfully"){
      closeform();
      showalert("deposited successfully","success")
    }
    else if(msg==="data not found"){
      setErrors({account_number: "invalid account number"})
    }
    else{
      setErrors(null);
    }
  },[count])

  return (
    <div className="deposit">
      <form className="deposit-form" onSubmit={handleSubmit}>
        <h3 className="text-center">deposit amount</h3>
        <div className="mb-3">
          <label htmlFor="to" className="form-label">
            account number:
          </label>
          <span className="imp">*</span>
          <input
            type="number"
            className="form-control"
            placeholder="enter account number"
            name="account_number"
            value={values.account_number}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.account_number && { border: "2px solid red" }}
          />
          {errors.account_number && (
            <small className="text-danger">{errors.account_number}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            amount:
          </label>
          <span className="imp">*</span>
          <input
            type="number"
            className="form-control"
            placeholder="enter amount"
            name="amount"
            value={values.amount}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.amount && { border: "2px solid red" }}
          />
          {errors.amount && (
            <small className="text-danger">{errors.amount}</small>
          )}
        </div>
        <div className="mb-3 button">
          {loading ? (
            <ButtonLoader />
          ) : (
            <>
              <input
                type="submit"
                className="btn btn-success"
                value="deposit"
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={closeform}
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
DepositForm.propTypes = {
  closeform: propTypes.func,
  showalert: propTypes.func,
};
export default DepositForm;