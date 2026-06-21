import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

const NotFound = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="detail-main not-found-main">
        <h1>404</h1>
        <h2>
          Page not found
        </h2>
        <Link
          to="/"
          className="btn btn-primary not-found-link"
        >
          <ArrowLeft size={18} /> Back to dashboard
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
