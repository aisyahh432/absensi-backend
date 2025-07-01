import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/id";

const DetailAbsen = () => {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [dataAbsen, setDataAbsen] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTampilkan = async () => {
    if (!bulan || !tahun) {
      alert("Pilih bulan dan tahun terlebih dahulu.");
      return;
    }

    const from = `${tahun}-${bulan}-01`;
    const to = moment(from).endOf("month").format("YYYY-MM-DD");

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3001/absen/summary?from=${from}&to=${to}`,
        { employee_nik: localStorage.getItem("nik") }
      );
      setDataAbsen(response.data);
    } catch (error) {
      console.error("Gagal fetch summary:", error);
      alert("Gagal menampilkan data absen.");
    } finally {
      setLoading(false);
    }
  };

  const groupedAbsen = dataAbsen.reduce((acc, curr) => {
    const key = curr.tanggal;
    if (!acc[key]) {
      acc[key] = {
        tanggal: curr.tanggal,
        jamMasuk: "-",
        jamKeluar: "-",
        libur: curr.libur || false
      };
    }
    if (curr.status === "check-in") acc[key].jamMasuk = curr.time;
    if (curr.status === "check-out") acc[key].jamKeluar = curr.time;
    return acc;
  }, {});
  const absenPerHari = Object.values(groupedAbsen);

  return (
    <div className="container py-4">
      <div className="row mb-3 align-items-end">
        <div className="col-md-6">
          <h4 className="fw-semibold mb-3">Rekap Absen</h4>
          <div className="row gx-2">
            <div className="col">
              <select
                className="form-select form-select-sm"
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
              >
                <option value="">-- Bulan --</option>
                <option value="01">Januari</option>
                <option value="02">Februari</option>
                <option value="03">Maret</option>
                <option value="04">April</option>
                <option value="05">Mei</option>
                <option value="06">Juni</option>
                <option value="07">Juli</option>
                <option value="08">Agustus</option>
                <option value="09">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </select>
            </div>
            <div className="col">
              <select
                className="form-select form-select-sm"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
              >
                <option value="">-- Tahun --</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div className="col">
              <button
                className="btn btn-sm btn-primary w-100"
                onClick={handleTampilkan}
                disabled={loading}
              >
                {loading ? "Memuat..." : "Tampilkan"}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 text-end">
          <small className="text-muted">
            Tanggal cetak: {moment().format("DD MMMM YYYY")}
          </small>
        </div>
      </div>

      <div className="row gx-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">
                  Detail Absen -{" "}
                  {moment(`${tahun}-${bulan}-01`).format("MMMM YYYY")}
                </h6>
              </div>

              <div className="table-responsive">
                <table className="table table-striped table-sm table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>No</th>
                      <th>Tanggal</th>
                      <th>Jam Masuk</th>
                      <th>Jam Keluar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {absenPerHari.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-muted">
                          Tidak ada data
                        </td>
                      </tr>
                    ) : (
                      absenPerHari.map((item, index) => (
                        <tr
                          key={index}
                          className={item.libur ? "bg-dark text-white" : ""}
                        >
                          <td>{index + 1}</td>
                          <td>
                            {moment(item.tanggal).format("dddd, DD-MM-YYYY")}
                          </td>
                          {item.libur ? (
                            <td colSpan="2" className="text-center">
                              Libur
                            </td>
                          ) : (
                            <>
                              <td>{item.jamMasuk}</td>
                              <td>{item.jamKeluar}</td>
                            </>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="text-end mt-3">
                <div className="dropdown d-inline">
                  <button
                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-print me-2"></i> Export
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="fa fa-file-pdf-o me-2"></i> PDF
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="fa fa-file-excel-o me-2"></i> Excel
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAbsen;
