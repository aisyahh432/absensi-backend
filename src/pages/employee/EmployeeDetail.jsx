import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeDetail = () => {
  const [detail, setDetail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [photo, setPhoto] = useState("");

  const handleEmployeeDetailUpdate  = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/auth/update`, {
        nik: localStorage.getItem("nik"),
        phone_number: phoneNumber,
        photo: photo,
        password: password,
      });
      setDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Gagal fetch summary:", error);
      alert("Gagal menampilkan data absen.");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/auth/find`, {
          nik: localStorage.getItem("nik"),
        });
        setDetail(response.data);
        setPhoneNumber(response.data.phone_number || "");
        setPhoto(response.data.photo || "");
      } catch (error) {
        console.error("Gagal fetch summary:", error);
        alert("Gagal menampilkan data absen.");
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container py-4">
      <div className="row gy-4">
        {/* Kolom Foto Profil */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0">Foto Profil</h5>
            </div>
            <div className="card-body text-center">
              <img
                src={detail.photo || ""}
                alt="Foto Profil"
                className="rounded-circle img-fluid mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <div>
                <input
                  type="file"
                  className="form-control"
                  id="foto"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPhoto(reader.result); 
                    };
                    if (file) {
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>
            <div className="card-footer border-0 text-center">
              <button
                className="btn btn-primary w-100"
                onClick={handleEmployeeDetailUpdate}
              >
                Simpan <i className="fa fa-save ms-2"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0">Edit Profil</h5>
            </div>
            <div className="card-body">
              <h6 className="text-muted mb-3">Data Karyawan</h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nik" className="form-label">
                    NIK
                  </label>
                  <input
                    type="text"
                    id="nik"
                    className="form-control"
                    value={detail.nik || ""}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="nama" className="form-label">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="nama"
                    className="form-control"
                    value={detail.name || ""}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="telp" className="form-label">
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    id="telp"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={detail.email || ""}
                    required
                  />
                </div>
              </div>

              <hr className="my-4" />
              <h6 className="text-muted mb-3">Informasi Akun</h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={detail.name || ""}
                    placeholder="Masukkan username"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                  />
                  <small className="text-danger">
                    Kosongkan jika tidak ingin diubah
                  </small>
                </div>
              </div>
            </div>
            <div className="card-footer bg-white border-0 text-end">
              <button
                className="btn btn-success px-4"
                onClick={handleEmployeeDetailUpdate}
              >
                Simpan Perubahan <i className="fa fa-save ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
