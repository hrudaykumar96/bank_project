import { Link, useNavigate } from "react-router-dom";
import propTypes from "prop-types";


const AdminNavbar = ({
  openpasswordform,
  opendepositform,
  openwithdrawform,
  showalert,
  userdata
}) => {

  const navigate=useNavigate();

  const logout=()=>{
    localStorage.removeItem("banker_admin");
    navigate("/");
    showalert("logged out successfully","success");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/admin">
          <img
            src="/assets/logo.png"
            alt="logo"
            height="50"
            width="150"
          />
        </Link>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link text-light"
                aria-current="page"
                onClick={opendepositform}
              >
                deposit
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-light"
                aria-current="page"
                onClick={openwithdrawform}
              >
                withdraw
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-light"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userdata.name}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" onClick={openpasswordform}>
                    change password
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={logout}>sign out</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
AdminNavbar.propTypes = {
  openpasswordform: propTypes.func,
  openwithdrawform: propTypes.func,
  opendepositform: propTypes.func,
  user:propTypes.any,
  showalert:propTypes.func,
  userdata:propTypes.any
};
export default AdminNavbar;