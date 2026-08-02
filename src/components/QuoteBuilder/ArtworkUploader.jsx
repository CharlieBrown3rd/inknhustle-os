import { useRef, useState } from "react";

function ArtworkUploader() {
  const fileInputRef = useRef(null);
const [selectedFile, setSelectedFile] = useState(null);
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };


  return (
    <section className="artwork-uploader">
      <div className="artwork-uploader-header">
        <span>Artwork Submission</span>

        <h3>Upload Print-Ready Artwork</h3>

        <p>
          Provide the final artwork that InknHustle will use
          for production.
        </p>
      </div>

      <div
        className="artwork-dropzone"
        role="button"
        tabIndex="0"
        onClick={openFilePicker}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            openFilePicker();
          }
        }}
      >
        <span className="artwork-dropzone-icon">
          +
        </span>

        <h4>Drag and drop your artwork here</h4>

        <p>or click to browse your files</p>

        <button
          type="button"
          className="artwork-browse-button"
          onClick={(event) => {
            event.stopPropagation();
            openFilePicker();
          }}
        >
          Browse Files
        </button>

        <input
          ref={fileInputRef}
          className="artwork-file-input"
          type="file"
          accept=".ai,.eps,.svg,.pdf,.psd,.png"
          onChange={(event) => {
  const file = event.target.files?.[0] ?? null;
  setSelectedFile(file);
}}
        />
      </div>
    </section>
  );
}

export default ArtworkUploader;