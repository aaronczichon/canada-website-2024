import React from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function GridGallery({ imageData }) {
  const [galleryData, setGalleryData] = React.useState([]);
  const [index, setIndex] = React.useState(-1);

  React.useEffect(() => {
    const gallery = imageData.map((image) => ({
      src: `${image.base}?fit=cover&width=300&height=200`,
      width: 300,
      height: 200,
    }));
    setGalleryData(gallery);
  }, [imageData]);

  return (
    <div className="gallery-container">
      <PhotoAlbum
        layout="rows"
        photos={galleryData}
        targetRowHeight={150}
        onClick={({ index: current }) => setIndex(current)}
      />
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={imageData}
      />
    </div>
  );
}
