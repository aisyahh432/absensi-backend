import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const EmployeeEdit = () => {
  const navigate = useNavigate();
  const { nik } = useParams();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/auth/find", {
          nik,
        });
        const data = response.data; 
        setName(data.name || "");
        setPhoneNumber(data.phone_number || "");
        setEmail(data.email || "");
        setRole(data.role || "");
        setUsername(data.username || "");
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert("Gagal mengambil data karyawan.");
      } finally {
        setLoading(false);
      }
    };

    if (nik) {
      fetchEmployeeData();
    }
  }, [nik]);

  const handleEmployeeUpdate = async () => {
    try {
      await axios.post("http://localhost:3001/auth/update", {
        nik,
        name,
        phone_number: phoneNumber,
        email,
        role,
        username,
        password,
      });

      alert("Data karyawan berhasil diperbarui!");
      navigate("/admin-dashboard/employee/data");
    } catch (error) {
      console.error("Gagal memperbarui karyawan:", error);
      alert("Gagal memperbarui data karyawan.");
    }
  };

  if (loading) {
    return <div className="text-center my-5">Loading data karyawan...</div>;
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <form>
            <div className="card-header">
              <h4 className="card-title">Edit Karyawan</h4>
            </div>
            <div className="card-body border-top py-0 my-3">
              <h4 className="text-muted my-3">Profil</h4>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="nik">NIK:</label>
                    <input
                      type="text"
                      id="nik"
                      className="form-control"
                      value={nik}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="name">Nama Lengkap:</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukan nama lengkap"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">No. Telp:</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Masukan no. telp"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select
                      id="role"
                      className="form-control"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Pilih Role</option>
                      <option value="employee">Employee</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukan email"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body border-top py-0 my-3">
              <h4 className="text-muted my-3">Akun</h4>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Masukan username"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="password">Password (opsional):</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Kosongkan jika tidak diubah"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEmployeeUpdate}
              >
                Simpan <i className="fa fa-save"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
