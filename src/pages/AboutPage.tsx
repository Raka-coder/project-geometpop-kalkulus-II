import { motion } from 'framer-motion';
import { Home, Info } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import DynamicBreadcrumb from '@/components/BreadCrumb';
import MathRenderer from '@/components/MathRenderer';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const breadcrumbItems = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Tentang Deret', icon: Info },
  ];

  const title = 'Tentang Deret Geometri';

  return (
    <>
      <Helmet>
        <title>GeometPop - {title}</title>
        <meta
          name="description"
          content="Aplikasi GeometPop untuk pemodelan pertumbuhan populasi dengan deret geometri."
        />
        <link rel="canonical" href="/about" />
      </Helmet>
      <div className="min-h-screen py-8 bg-custom-gray/10 font-nunitosans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 cursor-pointer">
              <DynamicBreadcrumb pages={breadcrumbItems} />
            </div>
            <h1 className="text-3xl font-bold text-dark-blue mb-6">
              Tentang Deret Geometri
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 50 }} // Awal: tidak terlihat dan sedikit ke bawah
              whileInView={{ opacity: 1, y: 0 }} // Ketika masuk viewport: muncul dan naik
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }} // Durasi dan easing
              viewport={{ once: false }} // Animasi hanya berulang kali
            >
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-dark-blue mb-4">
                    Konsep Dasar
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Deret geometri adalah penjumlahan dari rangkaian bilangan di
                    mana rasio antara suku yang berurutan adalah konstan. Bentuk
                    umum dari deret geometri adalah:
                  </p>

                  <div className="bg-dark-blue/5 p-4 rounded-lg mb-6 text-center">
                    <p className="text-sm font-bold text-dark-blue">
                      <MathRenderer
                        type="block"
                        formula="a + ar + ar^2 + ar^3 + \dots + ar^{(n-1)}"
                      />
                    </p>
                  </div>

                  <p className="text-gray-700 mb-4">Di mana:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <MathRenderer type="inline" formula="a" />= suku pertama
                    </li>
                    <li className="flex items-center gap-2">
                      <MathRenderer type="inline" formula="r" />= rasio umum
                      (common ratio)
                    </li>
                    <li className="flex items-center gap-2">
                      <MathRenderer type="inline" formula="n" />= jumlah suku
                    </li>
                  </ul>
                  <h3 className="text-xl font-semibold text-dark-blue mt-6 mb-3">
                    Jumlah Deret Geometri Terbatas
                  </h3>
                  <p className="text-gray-700 mb-4 flex items-center gap-2">
                    Rumus untuk menghitung jumlah n suku pertama dari deret
                    geometri adalah:
                  </p>
                  <div className="bg-dark-blue/5 p-4 rounded-lg mb-6 flex flex-col items-center justify-center gap-4">
                    <p className="text-sm font-bold text-dark-blue">
                      <MathRenderer
                        type="inline"
                        formula="S_n = \frac{a(1 - r^n)}{1 - r}, \text{ untuk } r \neq 1"
                      />
                    </p>
                    <p className="text-sm font-bold text-dark-blue">
                      <MathRenderer
                        type="inline"
                        formula="S_n = na, \text{ untuk } r = 1"
                      />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-dark-blue mb-4">
                  Deret Geometri Tak Hingga
                </h2>
                <p className="text-gray-700 mb-4">
                  Deret geometri tak hingga adalah penjumlahan semua suku dalam
                  deret geometri hingga tak terhingga. Jumlah deret geometri tak
                  hingga hanya konvergen (memiliki nilai terbatas) jika | r |
                  &lt; 1.
                </p>
                <div className="bg-dark-blue/5 p-4 rounded-lg mb-6 gap-4 flex flex-col items-center justify-center">
                  <p className="text-center text-sm font-bold text-dark-blue">
                    <MathRenderer
                      type="inline"
                      formula="S_\infty = \frac{a}{1 - r}, \text{ untuk } |r| < 1"
                    />
                  </p>
                  <p className="text-center text-sm font-bold text-dark-blue">
                    <MathRenderer
                      type="inline"
                      formula="S_\infty = \infty, \text{ untuk } |r| \geq 1"
                    />
                  </p>
                </div>
                <p className="text-gray-700 mb-4">
                  Dalam konteks pertumbuhan populasi, jika tingkat pertumbuhan r
                  lebih besar dari 0, populasi akan terus bertambah tak terbatas
                  dalam waktu yang sangat panjang, kecuali ada batasan
                  lingkungan atau faktor pembatas lainnya.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-dark-blue mb-4">
                  Aplikasi dalam Pemodelan Populasi
                </h2>
                <p className="text-gray-700 mb-4">
                  Deret geometri memiliki aplikasi yang kuat dalam pemodelan
                  pertumbuhan populasi:
                </p>

                <h3 className="text-xl font-semibold text-dark-blue mt-6 mb-3">
                  Model Pertumbuhan Eksponensial
                </h3>
                <p className="text-gray-700 mb-4">
                  Model pertumbuhan eksponensial menggunakan deret geometri di
                  mana ukuran populasi pada waktu t dapat dinyatakan sebagai:
                </p>
                <div className="bg-dark-blue/5 p-4 rounded-lg mb-6 flex flex-col items-center justify-center gap-4">
                  <p className="text-center text-sm font-bold text-dark-blue">
                    <MathRenderer
                      type="inline"
                      formula="P(t) = P_0 \times (1 + r)^t"
                    />
                  </p>
                </div>
                <p className="text-gray-700 mb-4">
                  Di mana P<sub>0</sub> adalah populasi awal dan r adalah
                  tingkat pertumbuhan per periode waktu.
                </p>

                <h3 className="text-xl font-semibold text-dark-blue mt-6 mb-3">
                  Model Pertumbuhan Logistik
                </h3>
                <p className="text-gray-700 mb-4">
                  Model pertumbuhan logistik menggabungkan deret geometri dengan
                  faktor pembatas (daya dukung lingkungan):
                </p>
                <div className="bg-dark-blue/5 p-4 rounded-lg mb-6 flex flex-col items-center justify-center gap-4">
                  <p className="text-center text-sm font-bold text-dark-blue">
                    <MathRenderer
                      type="inline"
                      formula="P(t+1) = P(t) + r \times P(t) \times (1 - \frac{P(t)}{K})"
                    />
                  </p>
                </div>
                <p className="text-gray-700 mb-4">
                  Di mana K adalah daya dukung lingkungan, yaitu ukuran populasi
                  maksimum yang dapat didukung lingkungan tersebut.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
