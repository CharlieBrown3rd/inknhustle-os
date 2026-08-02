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
       {selectedFile && (
  <div className="artwork-file-preview">
    <div>
      <span className="artwork-file-status">
        File selected
      </span>

      <strong>{selectedFile.name}</strong>

      <small>
        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
      </small>
    </div>

    <button
      type="button"
      className="artwork-remove-button"
      onClick={(event) => {
        event.stopPropagation();
        setSelectedFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }}
    >
      Remove
    </button>
  </div>
)}
<div className="artwork-guidelines">
  <h4>Accepted File Types</h4>

  <div className="artwork-file-types">
    <span>AI</span>
    <span>EPS</span>
    <span>SVG</span>
    <span>PDF</span>
    <span>PSD</span>
    <span>PNG</span>
  </div>

  <p>
    Vector artwork is recommended for the
    highest print quality.
  </p>

  <div className="artwork-policy">
  <h4>Artwork Policy</h4>

  <p>
    Customers must provide print-ready artwork.
    InknHustle does not recreate, redesign,
    redraw, or modify submitted artwork.
  </p>

  <p>
    By uploading artwork, you confirm that you
    have the rights or permission to reproduce
    the submitted design.
  </p>
</div>
</div>
    </section>
    
    
  );
}

export default ArtworkUploader;