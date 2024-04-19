import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Maarquee from "../components/Maarquee";
import Section from "../components/Section";
import UserLogin from "../forms/UserLogin";
import AdminLogin from "../forms/AdminLogin";

const Home = () => {
  const [userLogin, setUserLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);

  const openuserlogin = () => {
    setUserLogin(true);
    setAdminLogin(false);
  };
  const closeuserlogin = () => {
    setUserLogin(false);
    setAdminLogin(false);
  };
  const openadminlogin = () => {
    setAdminLogin(true);
    setUserLogin(false);
  };
  return (
    <div className="home">
      <Header openuserlogin={openuserlogin} />
      <Maarquee />
      {userLogin && (
        <UserLogin
          closeuserlogin={closeuserlogin}
          openadminlogin={openadminlogin}
        />
      )}
      {adminLogin && (
        <AdminLogin
          closeuserlogin={closeuserlogin}
          openuserlogin={openuserlogin}
        />
      )}
      <Section />
      <Footer />
    </div>
  );
};

export default Home;