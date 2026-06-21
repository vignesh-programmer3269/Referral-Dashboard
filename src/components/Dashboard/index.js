import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Overview from "../Overview";
import ServiceSummary from "../ServiceSummary";
import ShareReferral from "../ShareReferral";
import ReferralsTable from "../ReferralsTable";
import "./index.css";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("desc");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      const token = Cookies.get("jwt_token");

      try {
        const url = new URL(
          "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals",
        );
        if (debouncedSearch) {
          url.searchParams.append("search", debouncedSearch);
        }
        if (sort) {
          url.searchParams.append("sort", sort);
        }

        const response = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await response.json();

        if (!response.ok) {
          setError(json.message || `Error: ${response.status}`);
          setLoading(false);
          return;
        }

        if (json.success && json.data) {
          setData(json.data);
        } else {
          setError("Failed to load data");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch, sort]);

  return (
    <div className="app-container">
      <Navbar />

      <main>
        <header className="dashboard-header mb-8">
          <h1>Referral Dashboard</h1>
          <p className="subtitle">
            Track your referrals, earnings, and partner activity in one place.
          </p>
        </header>

        {error && (
          <div className="error-alert mb-6" role="alert">
            {error}
          </div>
        )}

        {loading && !data ? (
          <div className="loading-state">
            <Loader2 className="spinner" size={40} />
            <p>Loading dashboard data...</p>
          </div>
        ) : data ? (
          <>
            <Overview metrics={data.metrics} />
            <div className="grid grid-cols-2 mb-8">
              <ServiceSummary summary={data.serviceSummary} />
              <ShareReferral referral={data.referral} />
            </div>
            <ReferralsTable
              referrals={data.referrals}
              search={search}
              onSearchChange={setSearch}
              sort={sort}
              onSortChange={setSort}
            />
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
