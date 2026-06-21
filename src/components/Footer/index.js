import { Link } from "react-router-dom";
import { Copyright } from "lucide-react";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="brand footer-brand">
        Go Business
      </div>
      <nav className="footer-nav" aria-label="Footer">
        <Link to="#" className="footer-link">
          About
        </Link>
        <Link to="#" className="footer-link">
          Contact
        </Link>
        <Link to="#" className="footer-link">
          Privacy
        </Link>
        <Link to="#" className="footer-link">
          Terms
        </Link>
      </nav>
      <div>
        <Copyright size={16} /> 2024 Go Business
      </div>
    </footer>
  );
};

export default Footer;
