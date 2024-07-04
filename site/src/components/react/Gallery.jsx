import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { convertAssetsToImageData } from "../functions/image.functions";

export default function GridGallery({ images, text }) {
  const [open, setOpen] = React.useState(false);
  const [btnText, setBtnText] = React.useState("missing.translation");
  const [imageData, setImageData] = React.useState([]);

  React.useEffect(() => {
    setBtnText(text);
  }, [text]);

  React.useEffect(() => {
    convertAssetsToImageData(images).then((data) => setImageData(data));
  }, [images]);

  return (
    <div className="gallery-container">
      {images.length > 0 ? (
        <>
          <button
            className="btn"
            style={{
              marginBottom: "32px",
            }}
            type="button"
            onClick={() => setOpen(true)}
          >
            {btnText}
          </button>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={imageData}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
