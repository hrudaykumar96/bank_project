import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Userdashboard from "./pages/Userdashboard.jsx";
import Admin from "./pages/Admin.jsx";
import Alerts from "../src/effects/Alerts.jsx";
import { useState } from "react";
import AdminForgotPassword from "./pages/AdminForgotPassword.jsx";

const App = () => {
  const [status, setStatus]=useState("");
  const [message, setMessage]=useState("");

  const showalert=(message,status)=>{
    setStatus(status), setMessage(message);
  };

  setTimeout(() => {
    showalert("","");
  }, 5000);

  return (
    <BrowserRouter>
    <Alerts status={status} message={message}/>
      <Routes>
        <Route path="/" element={<Home showalert={showalert}/>} />
        <Route path="/reset" element={<ForgotPassword showalert={showalert}/>} />
        <Route path="/home" element={<Userdashboard showalert={showalert}/>} />
        <Route path="/admin" element={<Admin showalert={showalert}/>}/>
        <Route path="/admin_reset" element={<AdminForgotPassword showalert={showalert}/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;