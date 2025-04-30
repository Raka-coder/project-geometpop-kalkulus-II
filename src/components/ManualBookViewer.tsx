import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Download } from 'lucide-react';
import { Button } from './ui/button';

const ManualBookViewer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDownload = () => {
    // Mengarahkan pengguna ke file manual book untuk diunduh
    window.open('/manual-book.pdf', '_blank');
  };

  return (
    <>
      {/* Tombol Lihat Manual Book */}
      <Button
        onClick={openModal}
        className="bg-custom-yellow text-dark-blue hover:bg-custom-yellow/90 text-base"
      >
        Lihat Manual Book <BookOpen size={16} />
      </Button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative"
          >
            {/* Tombol Tutup Modal */}
            <Button
              onClick={closeModal}
              variant="ghost"
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-sm md:top-4 md:right-4 sm:top-4 sm:right-4"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Judul Modal */}
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
              Manual Book GeometPop
            </h2>

            {/* Viewer PDF */}
            <div className="mb-4 border rounded-lg overflow-hidden">
              <iframe
                src="/manual-book.pdf"
                title="Manual Book"
                className="w-full h-[280px]"
              ></iframe>
            </div>

            {/* Tombol Unduh */}
            <Button
              variant="outline"
              onClick={handleDownload}
              className="bg-custom-yellow text-dark-blue hover:bg-custom-yellow/90 text-base"
            >
              Unduh Manual Book <Download size={16} />
            </Button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ManualBookViewer;
