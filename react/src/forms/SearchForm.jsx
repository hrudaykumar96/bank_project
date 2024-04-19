import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import ButtonLoader from "../effects/ButtonLoader";
import { useState } from "react";
import { searchuser } from "../services/admin_api";

const SearchForm = ({ opendata, openaccount, searchdata }) => {

  const [loading, setLoading]=useState(false);
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      account_number: "",
    },
    validationSchema: yup.object({
      account_number: yup
        .string()
        .length(10, "Enter valid account number")
        .required("Enter account number"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await searchuser(values.account_number);
      searchdata(response.data);
      opendata();
      setLoading(false);
    },
  });
  
  return (
    <div className="container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col">
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
              <small className="text-danger bg-light">
                {errors.account_number}
              </small>
            )}
          </div>
          <div className="mb-3 col-sm-9">
            {loading ? (
              <ButtonLoader />
            ) : (
              <>
                <input
                  type="submit"
                  value="search"
                  className="btn btn-success"
                />
              </>
            )}
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-sm mb-3">
          <button className="btn btn-success" onClick={openaccount}>
            create new account
          </button>
        </div>
      </div>
    </div>
  );
};
SearchForm.propTypes = {
  opendata: propTypes.func,
  openaccount: propTypes.func,
  getdata:propTypes.any,
  searchdata:propTypes.any
};
export default SearchForm;