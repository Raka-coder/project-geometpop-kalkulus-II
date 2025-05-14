import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Alert } from './ui/alert';
import PDFViewer from './PDFViewer'; 
import Panduan from '/docs/Panduan_Penggunaan.pdf'; 

const ManualBookViewer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDownload = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      const link = document.createElement('a');
      link.href = Panduan;
      link.setAttribute('download', 'Panduan Penggunaan.pdf');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  return (
    <>
      <Button
        onClick={openModal}
        className="bg-custom-yellow text-dark-blue hover:bg-custom-yellow/90 text-base"
      >
        Lihat Manual Book <BookOpen size={16} />
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative"
          >
            <Button
              onClick={closeModal}
              variant="ghost"
              className="absolute top-1.5 right-1.5 text-gray-600 hover:text-gray-800 md:top-4 md:right-4 sm:top-4 sm:right-4"
            >
              <X className="w-8 h-8 md:h-6 md:w-6" />
            </Button>

            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
              Manual Book GeometPop
            </h2>

            {/* Gunakan komponen PDFViewer */}
            <PDFViewer pdfUrl={Panduan} />

            <Button
              variant="outline"
              onClick={handleDownload}
              className="bg-custom-yellow text-dark-blue hover:bg-custom-yellow/90 text-base mt-4"
            >
              Unduh Manual Book <Download size={16} />
            </Button>

            {showAlert && (
              <Alert variant="default" className="mt-4">
                <div className="flex justify-between items-center">
                  <span>Manual book akan diunduh dalam beberapa detik</span>
                  <Button
                    onClick={() => setShowAlert(false)}
                    className="text-gray-600 hover:text-gray-800 ml-4"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Alert>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ManualBookViewer;