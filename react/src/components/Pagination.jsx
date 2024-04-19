import propTypes from "prop-types";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handleClick = (page) => {
    onPageChange(page);
  };

  return (
    <div>
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handleClick(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
Pagination.propTypes={
  totalPages:propTypes.any,
  currentPage:propTypes.any,
  onPageChange:propTypes.any
}
export default Pagination;