import gpxParser from "gpxparser";
import * as mapboxgl from "mapbox-gl";
import type { MultiPoints } from "../dynamic/MultiMap";
import type { RouteData } from "../dynamic/route.type";

export const renderPoint = (map: mapboxgl.Map, point: MultiPoints) => {
  const poi = new mapboxgl.Marker({
    color: point.color,
  })
    .setLngLat(point.coordinates as any) // POI coordinates
    .addTo(map);

  if (point.tooltip) {
    const popup = new mapboxgl.Popup({ closeOnClick: true }).setHTML(
      point.tooltip,
    );
    poi.setPopup(popup);
  }

  if (!point.useRadius) return;

  map.addLayer({
    id: point.id,
    type: "circle",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: point.coordinates,
        },
      } as any,
    },
    paint: {
      "circle-radius": {
        base: 1.75,
        stops: [
          [48, 20],
          [88, 360],
        ],
      }, // in pixels
      "circle-color": point.color,
      "circle-opacity": 0.5,
    },
  });
};

/**
 * Call map manipulation functions after eachother
 * @param map map element reference
 * @param args all functions related to map which should be called
 */
export const renderMapParts = (map: mapboxgl.Map, ...args: Function[]) => {
  map.on("load", () => {
    args.forEach((arg) => arg());
  });
};

/**
 * Set the center of the map
 * @param map map element reference
 * @param center center coordinates (longitude, latitude)
 */
export const setMapCenter = (map: mapboxgl.Map, center: number[]) => {
  const mapCenter: mapboxgl.LngLatLike = {
    lat: center[1],
    lng: center[0],
  };
  map.setCenter(mapCenter);
};

/**
 * This functions prints multiple routes onto the map
 * @param map map element reference
 * @param routeData array of RouteData objects
 */
export const addRoutesToMap = (map: any, routeData: RouteData[]) => {
  map.on("load", () => {
    routeData.forEach((element, index) => {
      map.addLayer({
        id: `route-${index}`,
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: element.routeCoordinates,
            },
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": element.color ? element.color : "#b33335",
          "line-width": 7,
        },
      });
    });
  });
};

/**
 * Adds a tooltip for an route layer
 * @param map map element reference
 * @param tooltip the actual tooltip which should be shown
 * @param layerName name if the route where the tooltip should be shown
 */
export const addTooltipToMap = (
  map: any,
  tooltip: string,
  layerName: string,
) => {
  const popup = new mapboxgl.Popup({ closeOnClick: false }).setHTML(tooltip);
  // Add popup on hover over the route
  map.on("mouseenter", layerName, (e: any) => {
    map.getCanvas().style.cursor = "pointer";
    popup.setLngLat(e.lngLat).addTo(map);
  });

  map.on("mouseleave", layerName, () => {
    map.getCanvas().style.cursor = ""; // Reset cursor style
    popup.remove(); // Remove popup on mouse leave
  });
};

// Function to parse GPX file and extract route coordinates
function parseGPX(gpxData: any) {
  const parser = new gpxParser();
  parser.parse(gpxData);
  const route = parser.tracks[0].points.map((point) => [point.lat, point.lon]);
  return route;
}

/**
 * Loads a GPX file from the provided route URL and returns the route coordinates
 * @param url url of the GPX file
 * @returns route coordinates
 */
export const fetchGpxFile = async (url: string) => {
  return fetch(url)
    .then((response) => response.text())
    .then((gpxData) => {
      const route = parseGPX(gpxData);
      const switchedRoute = route.map((subArray) => {
        return [subArray[1], subArray[0]];
      });
      return switchedRoute;
    })
    .catch((error) => {
      console.error("Error fetching GPX file:", error);
      throw error;
    });
};

const getMiddle = (prop: "lat" | "lng", coordinates: number[]) => {
  let min = Math.min(...coordinates);
  let max = Math.max(...coordinates);
  if (prop === "lng" && max - min > 180) {
    coordinates = coordinates.map((val) => (val < max - 180 ? val + 360 : val));
    min = Math.min(...coordinates);
    max = Math.max(...coordinates);
  }
  let result = (min + max) / 2;
  if (prop === "lng" && result > 180) {
    result -= 360;
  }
  return result;
};

export const findCenter = (coordinates: number[][]) => {
  const lat = coordinates.map((coord) => coord[0]);
  const lng = coordinates.map((coord) => coord[1]);
  return [getMiddle("lat", lat), getMiddle("lng", lng)];
};
