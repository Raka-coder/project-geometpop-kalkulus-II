import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import RobotNotFound from "@/assets/robot.webp";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    document.title = "404 Not Found | GeometPop";
  }, []);

  return (
    <>
      <Helmet>
        <title>{document.title}</title>
        <meta
          name="description"
          content="Halaman tidak ditemukan. Mungkin Anda salah mengetik alamat URL atau halaman tersebut belum dibuat."
        />
        <link rel="canonical" href="/404" />
      </Helmet>
      <div className="min-h-{window.innerHeight} flex items-center justify-center font-nunitosans">
        <div className="text-center pt-12">
          <img
            src={RobotNotFound}
            alt="404 Image"
            className="mx-auto mb-4 w-48 h-48"
            loading="lazy"
          />
          <h1 className="text-4xl font-extrabold mb-4 text-dark-blue">Oops!</h1>
          <p className="text-xl text-gray-600 mb-4">
            Halaman yang Anda cari tidak ditemukan.
          </p>
          <p className="text-xl text-gray-600 mb-6">
            Mungkin Anda salah mengetik alamat URL atau halaman tersebut belum
            dibuat.
          </p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
