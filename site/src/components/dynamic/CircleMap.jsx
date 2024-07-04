import BasicMap from "./BasicMap";
import { useState, useEffect } from "preact/hooks";

export default function CircleDynamicMap({ zoom, center, circleCenter }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Fetch and parse GPX file
    if (map && circleCenter && center) {
      map.addLayer({
        id: "circleLayer",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: circleCenter,
            },
          },
        },
        paint: {
          "circle-radius": {
            base: 1.75,
            stops: [
              [48, 40],
              [88, 720],
            ],
          }, // in pixels
          "circle-color": "blue",
          "circle-opacity": 0.5,
        },
      });
      map.setCenter(center);
    }
  }, [center, circleCenter, map]);

  return <BasicMap zoom={zoom} setMap={setMap} />;
}
