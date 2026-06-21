import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AlertCircle, Loader2, ArrowRight } from "lucide-react";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const responseJson = await response.json();

      if (!response.ok) {
        setError(responseJson.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      if (responseJson.data && responseJson.data.token) {
        Cookies.set("jwt_token", responseJson.data.token, { expires: 7 }); // 7 days expiration
        navigate("/");
      } else {
        setError("Unexpected response from server");
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-panel">
        <div className="login-header text-center mb-6">
          <div className="brand-logo mx-auto">GB</div>
          <h1 className="brand-title">Go Business</h1>
          <p className="tagline">Sign in to open your referral dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mb-8">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? <Loader2 className="spinner" size={20} /> : "Sign in"}
            {!loading && <ArrowRight size={18} className="btn-icon" />}
          </button>

          {error && (
            <div className="error-message" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
