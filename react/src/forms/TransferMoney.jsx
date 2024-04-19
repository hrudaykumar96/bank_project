import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import { transfermoney } from "../services/user_api";
import { useEffect, useState } from "react";
import ButtonLoader from "../effects/ButtonLoader";

const TransferMoney = ({ closetransfermoney, showalert, getdata, data }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [count,setCount]=useState(0);
  const { values, errors, setErrors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      from_account_number:data.accounts.account_number,
      to_account_number: "",
      amount: "",
    },
    validationSchema: yup.object({
      amount: yup
        .number()
        .required("Enter Amount")
        .positive("Negative number not allowed")
        .min(1, "Amount should be greater than 0"),
      to_account_number: yup
        .string()
        .length(10, "Enter valid account number")
        .required("Enter account number"),
      from_account_number: yup
        .string()
        .length(10, "Enter valid account number")
        .required("Enter account number"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await transfermoney(values);
      setMessage(response.data);
      setLoading(false);
      setCount(count+1);
    },
  });

  useEffect(()=>{
    if (message==="invalid account number"){
      setErrors({to_account_number:"invalid account number"});
    }
    else if(message==="transaction failed"){
      getdata();
      closetransfermoney();
      setErrors("");
      showalert("transaction failed","danger");
    }
    else if(message==="insufficient funds"){
      setErrors({amount:"insufficient funds"})
    }
    else if(message==="money transfered successfully"){
      setErrors("");
      getdata();
      closetransfermoney();
      showalert("money transferred successfully","success")
    }
    else if(message==="cannot transfer to own account"){
      setErrors({to_account_number:"cannot transfer to own account"});
    }
    else if(message===""||message===null||message===undefined){
      setErrors("");
      showalert("");
    }
    else{
      setErrors("");
      showalert("");
    }
  },[count]);

  
  return (
    <div className="transfermoney">
      <form className="transfer-form" onSubmit={handleSubmit}>
        <h3 className="text-center">money transfer</h3>
        <div className="mb-3">
          <label htmlFor="from" className="form-label">
            from:
          </label>
          <span className="imp">*</span>
          <input
            type="number"
            className="form-control"
            value={values.from_account_number}
            readOnly
            name="from_account_number"
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.from_account_number && { border: "2px solid red" }}
          />
          {errors.from_account_number && (
            <small className="text-danger">{errors.from_account_number}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="to" className="form-label">
            to:
          </label>
          <span className="imp">*</span>
          <input
            type="number"
            className="form-control"
            placeholder="enter account number"
            name="to_account_number"
            value={values.to_account_number}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.to_account_number && { border: "2px solid red" }}
          />
          {errors.to_account_number && (
            <small className="text-danger">{errors.to_account_number}</small>
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
        <div className="mb-3">
          {loading ? (
            <ButtonLoader />
          ) : (
            <>
              <input
                type="submit"
                className="btn btn-success"
                value="transfer amount"
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={closetransfermoney}
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
TransferMoney.propTypes = {
  closetransfermoney: propTypes.func,
  showalert: propTypes.func,
  getdata:propTypes.func,
  data:propTypes.any,
};
export default TransferMoney;