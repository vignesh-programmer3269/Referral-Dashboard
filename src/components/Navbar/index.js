import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand" aria-label="Go to dashboard home">
        <div className="navbar-brand-logo">
          GB
        </div>
        Go Business
      </Link>

      <nav className="nav-links" aria-label="Primary">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="btn-logout navbar-logout-btn"
        >
          <LogOut size={16} />
          Log out
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
