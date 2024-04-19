import propTypes from "prop-types";
import SearchForm from "../forms/SearchForm";
import AccountUserData from "./AccountUserData";
import SignupForm from "../forms/SignupForm";
import { useState } from "react";

const AdminSection = ({ opendata, data, openaccount, account, showalert, closeall }) => {

  const [userdata,setUserdata]=useState([]);

  const searchdata=(values)=>{
    setUserdata(values);
  };

  return (
    <div className="adminsection">
      <SearchForm opendata={opendata} openaccount={openaccount} searchdata={searchdata} />
      {data && <AccountUserData showalert={showalert} userdata={userdata.user} closeall={closeall}/>}
      {account && <SignupForm showalert={showalert} closeall={closeall}/>}
    </div>
  );
};
AdminSection.propTypes = {
  opendata: propTypes.func,
  data: propTypes.bool,
  openaccount: propTypes.func,
  account: propTypes.bool,
  showalert:propTypes.any,
  closeall:propTypes.func
};
export default AdminSection;