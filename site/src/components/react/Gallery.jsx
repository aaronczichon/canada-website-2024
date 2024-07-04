import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function GridGallery({ images, text }) {
  const [open, setOpen] = React.useState(false);
  const [btnText, setBtnText] = React.useState("missing.translation");

  React.useEffect(() => {
    setBtnText(text);
  }, [text]);

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
            slides={images.map((src) => ({ src }))}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
