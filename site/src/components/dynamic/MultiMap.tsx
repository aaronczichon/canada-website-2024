import BasicMap from "./BasicMap";
import { useState, useEffect } from "preact/hooks";
import mapboxgl from "mapbox-gl";
import {
  addRouteToMap,
  addTooltipToMap,
  fetchGpxFile,
  renderMapParts,
  renderPoint,
  setMapCenter,
} from "../functions/map.functions";

export type MultiPoints = {
  coordinates: number[];
  color: string;
  id: string;
  // Set to true if you want to hide real coordinations
  useRadius?: boolean;
  // Set a tooltip which is shown as soon as the user hovers over the point
  tooltip?: string;
};

export type MultiMapProps = {
  zoom?: number;
  mapCenter: number[];
  points?: MultiPoints[];
  currentPath: string;
  tooltip: string;
};

export default function MultiMap({
  zoom,
  mapCenter,
  points,
  currentPath,
  tooltip,
}: MultiMapProps) {
  const [map, setMap] = useState<mapboxgl.Map>();

  useEffect(() => {
    if (!map || !mapCenter || !points) return;
    renderMapParts(
      map,
      () =>
        points.forEach((point) => {
          console.log(point);
          renderPoint(map, point);
        }),
      () => setMapCenter(map, mapCenter),
    );
  }, [mapCenter, points, map]);

  useEffect(() => {
    if (!map || !currentPath || !tooltip) return;

    fetchGpxFile(currentPath).then((route) => {
      addRouteToMap(map, route, "full-route", 4, "#2BCA2B");
      addTooltipToMap(map, tooltip, "route-full-route");
    });
  }, [map, currentPath, tooltip]);

  return <BasicMap zoom={zoom} setMap={setMap} />;
}
