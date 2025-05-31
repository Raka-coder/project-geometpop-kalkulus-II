import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css'; // CSS untuk styling
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; // CSS untuk layout default

const PDFViewer = ({ pdfUrl }) => {
  // Plugin untuk layout default
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div
      className="pdf-viewer-container"
      style={{ height: '400px', border: '1px solid #ddd' }}
    >
      {/* Worker untuk merender PDF */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {/* Viewer untuk menampilkan PDF */}
        <Viewer
          fileUrl={pdfUrl}
          plugins={[defaultLayoutPluginInstance]} // Gunakan plugin default layout
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;
