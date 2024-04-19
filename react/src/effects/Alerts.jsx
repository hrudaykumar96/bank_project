import propTypes from "prop-types";

const Alerts = ({ status, message }) => {
  return (
    <div className="alert">
      {message && 
      <div className={`alert alert-${status}`} role="alert">
        {message}
      </div>
      }
    </div>
  );
};

Alerts.propTypes={
  message:propTypes.string,
  status:propTypes.string
}
export default Alerts;