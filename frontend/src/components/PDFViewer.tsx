// components/PdfViewer.jsx
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
const PdfViewer = ({ url }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  console.log("url", url);
  return (
    <div className="h-screen w-screen">
      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer fileUrl={url} />
      </Worker> */}
      <object data={url} type="application/pdf" width="100%" height="100%">
        <p>
          Alternative text - include a link <a href={url}>to the PDF!</a>
        </p>
      </object>
    </div>
  );
};
export default PdfViewer;
