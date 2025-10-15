import axios from "../axios";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      // Handle different error response formats
      if (err.response?.data) {
        const errorData = err.response.data;
        // If error is a string, use it directly
        if (typeof errorData === 'string') {
          setError(errorData);
        } 
        // If error is an object with a message property
        else if (errorData.message) {
          setError(errorData.message);
        }
        // If error is an object (like database error), show generic message
        else {
          setError("Login failed. Please try again.");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-card">
          <div className="card-inner">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Login to continue to your account</p>
            <form className="auth-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  required
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  name="username"
                  onChange={handleChange}
                  autoComplete="username"
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  required
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="input-text"
                />
              </div>
              {err && <p className="error-message">{err}</p>}
              <button onClick={handleSubmit} className="btn-primary">Login</button>
              <p className="auth-link">
                Don't have an account? <Link to="/register" className="link-accent">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
