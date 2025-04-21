import { Ratio, Box, Rows2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen font-nunitosans">
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
              { }
              <motion.div className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: false }} // Animasi hanya berulang kali  
              >
                <div className="flex items-center mb-3">
                  <span className="bg-custom-yellow rounded-full p-2">
                    <Ratio className="h-5 w-5 text-dark-blue" />
                  </span>
                  <h3 className="text-xl font-semibold text-dark-blue ml-2 md:ml-0">Rasio Pertumbuhan</h3>
                </div>
                <p className="text-gray-600">
                  Rasio dari satu periode ke periode berikutnya mencerminkan tingkat pertumbuhan populasi.
                </p>
              </motion.div>
              { }
              <motion.div className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: false }}
              >
                <div className="flex items-center mb-3">
                  <span className="bg-custom-yellow  rounded-full p-2">
                    <Box className="h-5 w-5 text-dark-blue" />
                  </span>
                  <h3 className="text-xl font-semibold text-dark-blue mr-8 ml-2 md:ml-0">Deret Terbatas</h3>
                </div>
                <p className="text-gray-600">
                  Dalam waktu terbatas, ukuran populasi dapat dimodelkan sebagai jumlah deret geometri terbatas.
                </p>
              </motion.div>
              { }
              <motion.div className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                viewport={{ once: false }}
              >
                <div className="flex items-center mb-3">
                  <span className="bg-custom-yellow rounded-full p-2">
                    <Rows2 className="h-5 w-5 text-dark-blue" />
                  </span>
                  <h3 className="text-xl font-semibold text-dark-blue ml-2 md:ml-0">Batas Lingkungan</h3>
                </div>
                <p className="text-gray-600">
                  Daya dukung lingkungan memberi batasan alami pada pertumbuhan deret, mengarah ke model logistik.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;

