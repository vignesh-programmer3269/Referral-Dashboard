import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const ReferralsTable = ({
  referrals,
  search,
  onSearchChange,
  sort,
  onSortChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const rowsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort]);

  const total = referrals ? referrals.length : 0;
  const totalPages = Math.ceil(total / rowsPerPage) || 1;
  const from = total === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const to = Math.min(currentPage * rowsPerPage, total);

  const currentRows = referrals ? referrals.slice(from - 1, to) : [];

  const handleRowClick = (id) => {
    navigate(`/referral/${id}`);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderPageNumbers = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`btn-page ${currentPage === i ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <section
      className="dashboard-section table-section"
      aria-label="All referrals"
    >
      <h2 className="section-title">All referrals</h2>

      <div className="table-controls">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="form-control search-input"
            placeholder="Name or service…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search referrals"
          />
        </div>

        <label className="sort-wrapper">
          <span className="sort-label">Sort by date:</span>
          <select
            className="form-control sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </label>
      </div>

      <div className="table-container glass-panel">
        <table className="referrals-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => handleRowClick(row.id)}
                  className="clickable-row"
                >
                  <td>{row.name}</td>
                  <td>{row.serviceName}</td>
                  <td>{formatDate(row.date)}</td>
                  <td>{formatCurrency(row.profit)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center empty-state">
                  No matching entries
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination-footer">
          <div className="summary-text">
            Showing {from}–{to} of {total} entries
          </div>
          <div className="pagination-controls">
            <button
              className="btn-pagination"
              disabled={currentPage === 1 || total === 0}
              onClick={handlePrev}
            >
              Previous
            </button>
            <div className="page-numbers">{renderPageNumbers()}</div>
            <button
              className="btn-pagination"
              disabled={currentPage === totalPages || total === 0}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralsTable;
