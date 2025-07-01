import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/id";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";

const DailyAttendance = () => {
  const [absenStatus, setAbsenStatus] = useState(0); 
  const [isWeekend, setIsWeekend] = useState(false);

  useEffect(() => {
    const today = new Date();
    const day = today.getDay();
    setIsWeekend(day === 0 || day === 6);
  }, []);

  const handleAttendance = async (statusType) => {
    try {
      const status = statusType === "check-in" ? "check-in" : "check-out";
      const response = await axios.post("http://localhost:3001/absen/attendance", {
        employee_nik: localStorage.getItem("nik"),
        status: status,
      });
      console.log(response.data);

      if (status === "check-in") {
        setAbsenStatus(1);
      } else if (status === "check-out") {
        setAbsenStatus(2);
      }

      alert(`Absen ${status} berhasil!`);
    } catch (error) {
      console.error("Gagal absen:", error);
      alert("Gagal melakukan absen.");
    }
  };

  const handleAbsenMasuk = () => {
    if (absenStatus === 0) {
      handleAttendance("check-in");
    }
  };

  const handleAbsenPulang = () => {
    if (absenStatus === 1) {
      handleAttendance("check-out");
    }
  };

  const getStatus = () => {
    if (absenStatus === 0) {
      return { icon: "clock-o", text: "Belum Absen", color: "secondary" };
    }
    if (absenStatus === 1) {
      return { icon: "sign-in", text: "Sudah Absen Masuk", color: "warning" };
    }
    return { icon: "check-circle", text: "Absen Lengkap", color: "success" };
  };

  const status = getStatus();

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0 text-dark">Absen Harian</h5>
              <span className="badge bg-light text-dark">
                {moment().format("dddd, D MMMM YYYY")}
              </span>
            </div>

            <div className="card-body">
              {isWeekend ? (
                <div className="alert alert-light border text-center fw-semibold text-danger">
                  <i className="fa fa-calendar-times-o me-2"></i>
                  Hari ini adalah hari libur.
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <i className={`fa fa-3x fa-${status.icon} text-${status.color}`}></i>
                    <p className={`mt-2 fw-semibold text-${status.color}`}>
                      {status.text}
                    </p>
                  </div>

                  <div className="d-flex justify-content-center gap-3">
                    <button
                      className="btn btn-outline-dark px-4"
                      onClick={handleAbsenMasuk}
                      disabled={absenStatus >= 1}
                    >
                      <i className="fa fa-sign-in me-2"></i> Absen Masuk
                    </button>
                    <button
                      className="btn btn-outline-success px-4"
                      onClick={handleAbsenPulang}
                      disabled={absenStatus !== 1}
                    >
                      <i className="fa fa-sign-out me-2"></i> Absen Pulang
                    </button>
                  </div>
                </div>
              )}
            </div>

            {!isWeekend && (
              <div className="card-footer bg-white border-top text-end">
                <span className={`badge bg-${status.color}`}>
                  <i className={`fa fa-${status.icon} me-1`}></i>
                  {status.text}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyAttendance;
