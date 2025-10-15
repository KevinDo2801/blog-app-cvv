import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={Logo} alt="Blog Logo" />
        </div>
        <div className="footer-content">
          <p className="footer-text">Made with ♥️ by React.js</p>
          <span className="footer-divider">•</span>
          <p className="footer-copyright">© 2025 Blog App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
