import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useState } from "react";
import axios from "axios";
import dexalogo from "../assets/img/dexa.png";
import { useNavigate } from "react-router-dom";

 const LoginPage = ({ setIsLoggedIn }) => {
  const [username,setUsername ] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("nik", user.nik);
      localStorage.setItem("role", user.role);

      setIsLoggedIn(true);
      alert("Login Success");

      if (user.role === "employee") {
        navigate("/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/unauthorized");
      }

    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong!");
      }
    }
  };


  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <img
            src={dexalogo}
            alt="Logo Indoexpress"
            className="img-fluid mb-2"
            style={{ maxHeight: "60px" }}
          />
          <h5 className="text-muted">Masuk untuk melakukan absensi</h5>
        </div>

        {errorMsg && (
          <div className="alert alert-danger text-center py-2">{errorMsg}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="fa fa-user text-secondary"></i>
              </span>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control border-start-0"
                autoComplete="username"
                placeholder="Masukan username anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="fa fa-lock text-secondary"></i>
              </span>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control border-start-0"
                autoComplete="current-password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 shadow-sm">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
