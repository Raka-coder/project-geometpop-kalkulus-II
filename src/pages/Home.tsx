
import Hero from '@/components/Hero';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-12 bg-custom-gray/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-blue mb-6">Deret Geometri dalam Pertumbuhan Populasi</h2>
            <p className="text-lg mb-8 text-gray-700">
              Deret geometri adalah rangkaian bilangan di mana setiap suku berikutnya diperoleh dengan mengalikan suku sebelumnya 
              dengan rasio tetap. Model pertumbuhan populasi sederhana mengikuti pola deret geometri ini.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-dark-blue mb-3">Rasio Pertumbuhan</h3>
                <p className="text-gray-600">
                  Rasio dari satu periode ke periode berikutnya mencerminkan tingkat pertumbuhan populasi.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-dark-blue mb-3">Deret Terbatas</h3>
                <p className="text-gray-600">
                  Dalam waktu terbatas, ukuran populasi dapat dimodelkan sebagai jumlah deret geometri terbatas.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-dark-blue mb-3">Batas Lingkungan</h3>
                <p className="text-gray-600">
                  Daya dukung lingkungan memberi batasan alami pada pertumbuhan deret, mengarah ke model logistik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
