import React from "react";

// Definir los tipos de las propiedades (props)
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <nav className="d-flex justify-content-end">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" onClick={() => handlePageClick(currentPage - 1)}>
            Anterior
          </a>
        </li>

        {/* Mostrar números de páginas */}
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index + 1}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}

        <li className="page-item">
          <a className="page-link" href="#" onClick={() => handlePageClick(currentPage + 1)}>
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
