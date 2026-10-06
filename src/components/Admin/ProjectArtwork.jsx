function ProjectArtwork({ artworkPath, onOpenArtwork }) {
  return (
    <div className="admin-project-artwork">
      <span>Artwork</span>

      {artworkPath ? (
        <button
          type="button"
          className="admin-project-action"
          onClick={() => onOpenArtwork(artworkPath)}
        >
          View Artwork
        </button>
      ) : (
        <p>No artwork submitted.</p>
      )}
    </div>
  );
}

export default ProjectArtwork;