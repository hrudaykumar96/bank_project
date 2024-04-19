import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import ChangePassword from "../forms/ChangePassword";
import AdminSection from "../components/AdminSection";
import DepositForm from "../forms/DepositForm";
import WithdrawForm from "../forms/WithdrawForm";
import propTypes from "prop-types";
import Loader from "../effects/Loader";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { adminuserdata } from "../services/admin_api";

const Admin = ({ showalert }) => {
  const [changepwd, setChangepwd] = useState(false);
  const [depositform, setDepositform] = useState(false);
  const [withdrawform, setWithdrawform] = useState(false);
  const [account, setAccount] = useState(false);
  const [data, setData] = useState(false);
  const [auth, setAuth] = useState(true);
  const [loading,setLoading]=useState(true);
  const token=localStorage.getItem("banker_admin");
  const navigate=useNavigate();
  const [userdata,setUserdata]=useState([]);

  const openpasswordform1 = () => {
    setChangepwd(true);
  };

  const closepasswordform = () => {
    setChangepwd(false);
  };

  const opendepositform = () => {
    setDepositform(true);
  };

  const openwithdrawform = () => {
    setWithdrawform(true);
  };

  const closeform = () => {
    setDepositform(false);
    setWithdrawform(false);
    setChangepwd(false);
  };

  const opendata = () => {
    setAccount(false);
    setData(true);
  };

  const openaccount = () => {
    setAccount(true);
    setData(false);
  };

  const closeall=()=>{
    setAccount(false);
    setData(false);
  }

  const fetchData=async()=>{
    const response=await adminuserdata();
    setUserdata(response.data);
    setLoading(false);
  };

  useEffect(()=>{
    if(token){
      setAuth(false);
      fetchData();
      navigate("/admin");
    }
    else{
      navigate("/");
      setAuth(true);
      setUserdata(null);
    }
    
  },[token,navigate]);

  return (
    <div>
      {auth ? (
        <Home />
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <AdminNavbar
                openpasswordform={openpasswordform1}
                opendepositform={opendepositform}
                openwithdrawform={openwithdrawform}
                showalert={showalert}
                userdata={userdata}
              />
              {changepwd && (
                <ChangePassword closepasswordform={closepasswordform} userdata={userdata} showalert={showalert}/>
              )}
              <AdminSection
                opendata={opendata}
                data={data}
                openaccount={openaccount}
                account={account}
                showalert={showalert}
                closeall={closeall}
              />
              {depositform && (
                <DepositForm closeform={closeform} showalert={showalert} />
              )}
              {withdrawform && (
                <WithdrawForm closeform={closeform} showalert={showalert} />
              )}
              <Footer />
            </>
          )}
        </>
      )}
    </div>
  );
};
Admin.propTypes = {
  showalert: propTypes.any,
};
export default Admin;