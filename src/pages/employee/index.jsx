import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
export const EmployeeData = () => {
  const [detail, setDetail] = useState([]);

  const handleEmployeeTable = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/auth/find`, {
        nik: null,
      });
      setDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Gagal mengambil data karyawan:", error);
      alert("Gagal menampilkan data karyawan.");
    }
  };

 const handleDeleteEmployee = async (nik) => {
    try {
      const response = await axios.post(`http://localhost:3001/auth/delete`, {
        nik: nik,
      });
      console.log(response.data);
      handleEmployeeTable();
    } catch (error) {
      console.error("Gagal mengambil data karyawan:", error);    }
  };


  useEffect(() => {
    handleEmployeeTable();
  }, []);
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header d-block">
            <h4 className="card-title float-left">Data Karyawan</h4>
            <div className="d-inline ml-auto float-right">
              <Link
                to="/admin-dashboard/employee/data/create"
                className="btn btn-success btn-sm"
              >
                <i className="fa fa-plus"></i> Tambah
              </Link>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped datatable">
                <thead>
                  <tr>
                    <th>No</th>
                    <th width="30%">Karyawan</th>
                    <th>Kontak</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    detail.map((employee, index) => (
                      <tr key={employee.nik || index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="row">
                            <div className="col-4 pr-1">
                              <img
                                src="assets/img/profil/default.jpg"
                                alt="Profil"
                                className="img-thumbnail rounded-circle w-100"
                              />
                            </div>
                            <div className="col-8 pl-1 mt-3">
                              <span className="font-weight-bold">
                                {employee.name}
                              </span>
                              <br />
                              <span className="text-muted">
                                {employee.role}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <address>
                            Email: {employee.email} <br />
                            Telp: {employee.phone_number}
                          </address>
                        </td>
                        <td>
                          <Link
                            to={`/admin-dashboard/employee/data/edit/${employee.nik}`}
                            className="btn btn-success btn-sm"
                          >
                            <i className="fa fa-pencil"></i> Edit
                          </Link>
                          <a href="#" className="btn btn-danger btn-sm ml-2" onClick={()=> handleDeleteEmployee (employee.nik)}>
                            <i className="fa fa-trash"></i> Hapus
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeData;
