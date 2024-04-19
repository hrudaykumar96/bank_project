import propTypes from "prop-types";

const Header = ({openuserlogin}) => {
  return (
    <div className="header container">
      <div className="logo">
        <h3>banker</h3>
      </div>
      <div className="user-login-button">
        <button className="btn btn-warning word" onClick={openuserlogin}>login</button>
        <button className="btn btn-warning symbol" onClick={openuserlogin}>
          <i className="fa-solid fa-user"></i>
        </button>
      </div>
    </div>
  );
};
Header.propTypes={
  openuserlogin:propTypes.func
}
export default Header;