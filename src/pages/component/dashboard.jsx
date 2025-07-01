import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../../assets/css/light-bootstrap-dashboard.css";
import dexalogo from "../../assets/img/dexa.png";

const DashboardLayout = ({ children, setIsLoggedIn }) => {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime({
        hours: String(now.getHours()).padStart(2, "0"),
        minutes: String(now.getMinutes()).padStart(2, "0"),
        seconds: String(now.getSeconds()).padStart(2, "0"),
      });
    };
    const interval = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(interval);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      alert("Logout Success");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      alert("Logout failed!");
    }
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-3 d-flex flex-column" style={{ width: "250px" }}>
        <div className="text-center mb-4">
          <img src={dexalogo} alt="Dexa Logo" className="img-fluid" style={{ maxHeight: "60px" }} />
        </div>
        <div className="text-center mb-3">
          <h5 className="fw-bold">{time.hours}:{time.minutes}:{time.seconds}</h5>
        </div>
        <nav className="nav flex-column gap-2">
          <Link to="/dashboard" className="nav-link text-white">
            <i className="nc-icon nc-chart-pie-35 me-2"></i> Dashboard
          </Link>
          <Link to="/absensi" className="nav-link text-white">
            <i className="nc-icon nc-time-alarm me-2"></i> Absensi
          </Link>
          <Link to="/summary" className="nav-link text-white">
            <i className="nc-icon nc-bullet-list me-2"></i> Summary
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column bg-light">
        {/* Navbar */}
        <header className="navbar navbar-light bg-white border-bottom shadow-sm px-4 d-flex justify-content-between align-items-center">
          <span className="navbar-brand mb-0 h5">Absensi</span>
          <div className="d-flex gap-3 align-items-center">
            <Link to="/employee" className="btn btn-outline-dark btn-sm">
              <i className="nc-icon nc-circle-09 me-1"></i> Profil
            </Link>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              <i className="nc-icon nc-button-power me-1"></i> Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow-1 overflow-auto px-4 py-4">
          <div id="alert">{/* Alert message placeholder */}</div>
          {children}
        </main>

        {/* Footer */}
        <footer className="text-center py-3 bg-white border-top shadow-sm small text-muted">
          &copy; 2025 <a href="https://www.dexagroup.com/id/" className="text-decoration-none">Dexa Group</a>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
