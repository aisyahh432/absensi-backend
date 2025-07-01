import dexaDashboard from "../../assets/img/dashboard/slide1.jpg";

const DashboardHome = () => {
  return (
    <div className="container py-4">
      <div
        className="position-relative rounded overflow-hidden shadow"
        style={{ height: "400px" }}
      >
        <img
          src={dexaDashboard}
          alt="Banner Absensi Online"
          className="w-100 h-100"
          style={{ objectFit: "cover", filter: "brightness(70%)" }}
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
          <h1 className="display-5 fw-bold">Selamat Datang</h1>
          <p className="lead mb-0">
            Aplikasi Absensi Online Dexa Friends
          </p>
        </div>
      </div>
    </div>
  );
};


export default DashboardHome;