
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="min-h-screen py-8 bg-custom-gray/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-dark-blue mb-6">Tentang Deret Geometri</h1>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-dark-blue mb-4">Konsep Dasar</h2>
              <p className="text-gray-700 mb-4">
                Deret geometri adalah penjumlahan dari rangkaian bilangan di mana rasio antara suku yang berurutan adalah konstan.
                Bentuk umum dari deret geometri adalah:
              </p>
              
              <div className="bg-dark-blue/5 p-4 rounded-lg mb-6 text-center">
                <p className="text-lg font-medium">a + ar + ar² + ar³ + ... + ar^(n-1)</p>
              </div>
              
              <p className="text-gray-700 mb-4">
                Di mana:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>a</strong> adalah suku pertama</li>
                <li><strong>r</strong> adalah rasio umum (common ratio)</li>
                <li><strong>n</strong> adalah jumlah suku</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-dark-blue mt-6 mb-3">Jumlah Deret Geometri Terbatas</h3>
              <p className="text-gray-700 mb-4">
                Rumus untuk menghitung jumlah n suku pertama dari deret geometri adalah:
              </p>
              
              <div className="bg-dark-blue/5 p-4 rounded-lg mb-6">
                <p className="text-center text-lg font-medium">S<sub>n</sub> = a(1-r<sup>n</sup>)/(1-r), untuk r ≠ 1</p>
                <p className="text-center text-lg font-medium mt-2">S<sub>n</sub> = na, untuk r = 1</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-dark-blue mb-4">Deret Geometri Tak Hingga</h2>
              <p className="text-gray-700 mb-4">
                Deret geometri tak hingga adalah penjumlahan semua suku dalam deret geometri hingga tak terhingga. 
                Jumlah deret geometri tak hingga hanya konvergen (memiliki nilai terbatas) jika |r| &lt; 1.
              </p>
              
              <div className="bg-dark-blue/5 p-4 rounded-lg mb-6">
                <p className="text-center text-lg font-medium">
                  S<sub>∞</sub> = a / (1-r), untuk |r| &lt; 1
                </p>
                <p className="text-center text-lg font-medium mt-2">
                  S<sub>∞</sub> = ∞ (divergen), untuk |r| ≥ 1
                </p>
              </div>
              
              <p className="text-gray-700 mb-4">
                Dalam konteks pertumbuhan populasi, jika tingkat pertumbuhan r lebih besar dari 0, populasi akan terus bertambah 
                tak terbatas dalam waktu yang sangat panjang, kecuali ada batasan lingkungan atau faktor pembatas lainnya.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-dark-blue mb-4">Aplikasi dalam Pemodelan Populasi</h2>
              <p className="text-gray-700 mb-4">
                Deret geometri memiliki aplikasi yang kuat dalam pemodelan pertumbuhan populasi:
              </p>
              
              <h3 className="text-xl font-semibold text-dark-blue mt-6 mb-3">Model Pertumbuhan Eksponensial</h3>
              <p className="text-gray-700 mb-4">
                Model pertumbuhan eksponensial menggunakan deret geometri di mana ukuran populasi pada waktu t dapat dinyatakan sebagai:
              </p>
              <div className="bg-dark-blue/5 p-4 rounded-lg mb-6">
                <p className="text-center text-lg font-medium">P(t) = P<sub>0</sub> × (1+r)<sup>t</sup></p>
              </div>
              <p className="text-gray-700 mb-4">
                Di mana P<sub>0</sub> adalah populasi awal dan r adalah tingkat pertumbuhan per periode waktu.
              </p>
              
              <h3 className="text-xl font-semibold text-dark-blue mt-6 mb-3">Model Pertumbuhan Logistik</h3>
              <p className="text-gray-700 mb-4">
                Model pertumbuhan logistik menggabungkan deret geometri dengan faktor pembatas (daya dukung lingkungan):
              </p>
              <div className="bg-dark-blue/5 p-4 rounded-lg mb-6">
                <p className="text-center text-lg font-medium">P(t+1) = P(t) + r × P(t) × (1 - P(t)/K)</p>
              </div>
              <p className="text-gray-700 mb-4">
                Di mana K adalah daya dukung lingkungan, yaitu ukuran populasi maksimum yang dapat didukung lingkungan tersebut.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
