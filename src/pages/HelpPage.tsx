import { Home, Info } from 'lucide-react';
import { Helmet } from 'react-helmet';
import DynamicBreadcrumb from '@/components/BreadCrumb';
import HelpFeedbackForm from '@/components/HelpForm';
import Footer from '@/components/Footer';

function HelpPage() {
  const breadcrumbItems = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Bantuan', icon: Info },
  ];
  const title = 'Bantuan dan Umpan Balik';
  return (
    <>
      <Helmet>
        <title>GeometPop - {title}</title>
        <meta
          name="description"
          content="Aplikasi GeometPop untuk pemodelan pertumbuhan populasi dengan deret geometri."
        />
        <link rel="canonical" href="/help" />
      </Helmet>
      <div className="min-h-screen py-8 bg-custom-gray/10 font-nunitosans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 cursor-pointer">
              <DynamicBreadcrumb pages={breadcrumbItems} />
            </div>
            <h1 className="text-3xl font-bold text-dark-blue mb-6">Bantuan</h1>
            <HelpFeedbackForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HelpPage;
