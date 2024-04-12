import BasicMap from "./BasicMap";
import { useState, useEffect } from "preact/hooks";
import * as mapboxgl from "mapbox-gl";
import {
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
};

export default function MultiMap({ zoom, mapCenter, points }: MultiMapProps) {
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

  return <BasicMap zoom={zoom} setMap={setMap} />;
}
