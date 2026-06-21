import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Loader2, ArrowLeft } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

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

const ReferralDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(false);
      const token = Cookies.get("jwt_token");

      try {
        const response = await fetch(
          `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        const json = await response.json();

        if (json.success && json.data) {
          const referralRow = Array.isArray(json.data.referrals)
            ? json.data.referrals.find((r) => String(r.id) === id)
            : json.data;

          if (referralRow && String(referralRow.id) === id) {
            setData(referralRow);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return (
    <div className="app-container">
      <Navbar />

      <main className="detail-main">
        {loading ? (
          <div className="loading-state">
            <Loader2 className="spinner" size={40} />
            <p>Loading details...</p>
          </div>
        ) : error || !data ? (
          <div className="not-found-state">
            <h1>Referral not found</h1>
            <Link to="/" className="back-link" aria-label="Back to dashboard">
              <ArrowLeft size={16} /> Back to dashboard
            </Link>
          </div>
        ) : (
          <div className="detail-content glass-panel">
            <Link
              to="/"
              className="back-link mb-6"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={16} /> Back to dashboard
            </Link>

            <h1 className="detail-heading">Referral Details</h1>
            <h2 className="partner-name">{data.name}</h2>

            <dl className="detail-list">
              <div className="detail-row">
                <dt>Referral ID</dt>
                <dd>{data.id}</dd>
              </div>
              <div className="detail-row">
                <dt>Service Name</dt>
                <dd>{data.serviceName}</dd>
              </div>
              <div className="detail-row">
                <dt>Date</dt>
                <dd>{formatDate(data.date)}</dd>
              </div>
              <div className="detail-row">
                <dt>Profit</dt>
                <dd>{formatCurrency(data.profit)}</dd>
              </div>
            </dl>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ReferralDetail;
