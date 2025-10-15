import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

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
      await axios.post("/auth/register", inputs);
      navigate("/login");
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
          setError("Registration failed. Please try again.");
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
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join us and start sharing your stories</p>
            <form className="auth-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  required
                  type="text"
                  id="username"
                  placeholder="Choose a username"
                  name="username"
                  onChange={handleChange}
                  autoComplete="username"
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleChange}
                  autoComplete="email"
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  required
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  name="password"
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="input-text"
                />
              </div>
              {err && <p className="error-message">{err}</p>}
              <button onClick={handleSubmit} className="btn-primary">Register</button>
              <p className="auth-link">
                Already have an account? <Link to="/login" className="link-accent">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
