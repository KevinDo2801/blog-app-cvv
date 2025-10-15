import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ThemeContext } from "../context/themeContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.hamburger-btn')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Sidebar overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
      
      {/* Sidebar menu */}
      <div className={`sidebar-menu ${sidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
        <div className="sidebar-header">
          <h3>Categories</h3>
          <button className="close-btn" onClick={closeSidebar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="sidebar-links">
          <Link className="sidebar-link" to="/?cat=art" onClick={closeSidebar}>
            Art
          </Link>
          <Link className="sidebar-link" to="/?cat=science" onClick={closeSidebar}>
            Science
          </Link>
          <Link className="sidebar-link" to="/?cat=technology" onClick={closeSidebar}>
            Technology
          </Link>
          <Link className="sidebar-link" to="/?cat=cinema" onClick={closeSidebar}>
            Cinema
          </Link>
          <Link className="sidebar-link" to="/?cat=design" onClick={closeSidebar}>
            Design
          </Link>
          <Link className="sidebar-link" to="/?cat=food" onClick={closeSidebar}>
            Food
          </Link>
        </div>
      </div>

      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              <img src={Logo} alt="Blog Logo" />
            </Link>
          </div>
          <div className="navbar-actions">
            <button 
              onClick={toggleTheme} 
              className="theme-toggle"
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'day' ? 'night' : 'day'} mode`}
            >
              {theme === 'day' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
            {currentUser ? (
              <div className="user-dropdown" ref={dropdownRef}>
                <span 
                  className="user-badge" 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {currentUser.username}
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ marginLeft: '6px', transition: 'transform 0.2s' }}
                    className={dropdownOpen ? 'rotate' : ''}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link className="dropdown-item btn-primary" to="/write" onClick={() => setDropdownOpen(false)}>
                      Write
                    </Link>
                    <button className="dropdown-item btn-ghost" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link className="btn-ghost" to="/login">
                Login
              </Link>
            )}
            <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
