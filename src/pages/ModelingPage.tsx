import { Home, Box } from 'lucide-react';
import { Helmet } from 'react-helmet';
import DynamicBreadcrumb from '@/components/BreadCrumb';
import PopulationCalculator from '@/components/PopulationCalculator';
import Footer from '@/components/Footer';

const ModelingPage = () => {
  const breadcrumbItems = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Pemodelan', icon: Box },
  ];

  const title = 'Pemodelan Pertumbuhan Populasi';

  return (
    <>
      <Helmet>
        <title>GeometPop - {title}</title>
        <meta
          name="description"
          content="Aplikasi GeometPop untuk pemodelan pertumbuhan populasi dengan deret geometri."
        />
        <link rel="canonical" href="/modeling" />
      </Helmet>
      <div className="min-h-screen py-8 bg-custom-gray/10 font-nunitosans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-4 cursor-pointer">
              <DynamicBreadcrumb pages={breadcrumbItems} />
            </div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-dark-blue">
              Pemodelan Pertumbuhan Populasi
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Eksplorasi dan analisis pertumbuhan populasi dengan model deret
              geometri dan faktor lingkungan
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <PopulationCalculator />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ModelingPage;
