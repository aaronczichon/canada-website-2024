import { useState, useEffect } from 'preact/hooks';

import BasicMap from './BasicMap';
import {addTooltipToMap, addRoutesToMap, fetchGpxFile, findCenter } from '../functions/map.functions';

export default function PathDynamicMap({gpxInfo, zoom, tooltip}) {
  const [map, setMap] = useState(null);
  const [popup, setPopup] = useState(null);
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    if (!map || !gpxInfo || gpxInfo.length === 0) return;

    Promise.all(gpxInfo.map((info) => fetchGpxFile(info.url)
    .then(route => ({ tooltip: info.tooltip, url: info.url, routeCoordinates: route, color: '#CA2B2B' }))))
    .then((routes) => setRouteData(routes));
  }, [gpxInfo, map]);

  useEffect(() => {
    // Add route to map
    if (!map || !routeData || routeData.length === 0) return;
        addRoutesToMap(map, routeData);
      routeData.forEach((element, index) => {
        if (element.tooltip) addTooltipToMap(map, element.tooltip, `route-${index}`);
      });
      const allCoordinates = routeData.map((route) => route.routeCoordinates).flat();
      const center = findCenter(allCoordinates);
      map.setCenter(center);
  }, [map, routeData, popup, tooltip]);

  return (
    <BasicMap zoom={zoom} setMap={setMap} />
  );
}