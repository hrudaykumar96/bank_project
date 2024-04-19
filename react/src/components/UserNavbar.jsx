import { Link } from "react-router-dom";
import propTypes from "prop-types";

const UserNavbar = ({ openpasswordform, opentransfermoney, logout, data }) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/home">
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
                  onClick={opentransfermoney}
                >
                  money transfer
                </Link>
              </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-light"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {data.name}
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
UserNavbar.propTypes = {
  openpasswordform: propTypes.func,
  opentransfermoney: propTypes.func,
  logout: propTypes.func,
  data:propTypes.any
};
export default UserNavbar;