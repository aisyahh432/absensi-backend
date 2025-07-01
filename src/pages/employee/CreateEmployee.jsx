import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState("");
  const [nik, setNik] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [photo] = useState("");
  const handleEmployeeCreate = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/auth/register`, {
        nik,
        role,
        phone_number: phoneNumber,
        photo,
        username,
        email,
        name,
        password,
      });
      setDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Gagal tambah karyawan:", error);
      alert("Gagal menambahkan karyawan.");
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <form>
            <div className="card-header">
              <h4 className="card-title">Tambah Karyawan</h4>
            </div>
            <div className="card-body border-top py-0 my-3">
              <h4 className="text-muted my-3">Profil</h4>
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="nik">NIK :</label>
                    <input
                      type="text"
                      id="nik"
                      className="form-control"
                      placeholder="Masukan NIK Karyawan"
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="name">Nama Lengkap :</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Masukan Nama Lengkap Karyawan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">No. Telp :</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      className="form-control"
                      placeholder="Masukan No. Telp"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="role">Role :</label>
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
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <div className="form-group">
                    <label htmlFor="email">E-mail :</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Masukan Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body border-top py-0 my-3">
              <h4 className="text-muted my-3">Akun</h4>
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Masukan Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEmployeeCreate}
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

export default EmployeeCreate;
