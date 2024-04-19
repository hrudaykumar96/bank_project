import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer bg-secondary">
      <div className="icons">
        <Link to="">
          <i className="fa-brands fa-linkedin"></i>
        </Link>
        <Link to="">
          <i className="fa-brands fa-twitter"></i>
        </Link>
        <Link to="">
          <i className="fa-brands fa-github"></i>
        </Link>
        <Link to="">
          <i className="fa-brands fa-facebook"></i>
        </Link>
        <Link to="">
          <i className="fa-brands fa-instagram"></i>
        </Link>
      </div>
      <hr />
      <div className="copyright">
        copyRight <i className="fa-solid fa-copyright"></i> Hruday Kumar
      </div>
    </div>
  );
};

export default Footer;