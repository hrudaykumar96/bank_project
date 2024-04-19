import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import Accounts from "../components/Accounts";
import ChangePassword from "../forms/ChangePassword";
import { useEffect, useReducer, useState } from "react";
import TransferMoney from "../forms/TransferMoney";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { getuserdata } from "../services/user_api";
import Loader from "../effects/Loader";
import propTypes from "prop-types";

const Userdashboard = ({showalert}) => {
  const [changepwd, setChangepwd] = useState(false);
  const [transferform, setTransferform] = useState(false);
  const [auth, setAuth] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("user_token");
  const fetch_init = "fetch_init";
  const fetch_end = "fetch_end";
  const initialstate = {
    loading: true,
    data: "",
  };

  const datahandler = (state, action) => {
    switch (action.type) {
      case fetch_init:
        return { ...state, loading: true };
      case fetch_end:
        return { ...state, loading: false, data: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(datahandler, initialstate);

  useEffect(() => {
    if (token) {
      setAuth(true);
      navigate("/home");
    } else {
      setAuth(false);
      navigate("/");
    }
  }, [navigate, token]);

  const openpasswordform = () => {
    setChangepwd(true);
  };

  const closepasswordform = () => {
    setChangepwd(false);
  };

  const opentransfermoney = () => {
    setTransferform(true);
  };

  const closetransfermoney = () => {
    setTransferform(false);
  };

  const getdata = async () => {
    dispatch({ type: fetch_init });
    const response = await getuserdata();
    dispatch({ type: fetch_end, payload: response.data });
  };

  useEffect(() => {
    if (token) {
      getdata();
    }
  },[token]);

  const logout=()=>{
    localStorage.removeItem("user_token");
    setAuth(false);
    navigate("/");
    showalert("logged out successfully","success");
  };

  return (
    <>
      {state.loading ? (
        <Loader />
      ) : (
        <>
          {auth ? (
            <div className="dashboard">
              <UserNavbar
                openpasswordform={openpasswordform}
                opentransfermoney={opentransfermoney}
                logout={logout}
                data={state.data}
              />
              <Accounts data={state.data} />
              {changepwd && (
                <ChangePassword closepasswordform={closepasswordform} userdata={state.data} showalert={showalert}/>
              )}
              {transferform && (
                <TransferMoney
                  opentransfermoney={opentransfermoney}
                  closetransfermoney={closetransfermoney}
                  showalert={showalert}
                  getdata={getdata}
                  data={state.data}
                />
              )}
              <Footer />
            </div>
          ) : (
            <Home />
          )}
        </>
      )}
    </>
  );
};
Userdashboard.propTypes={
  showalert:propTypes.func
}
export default Userdashboard;