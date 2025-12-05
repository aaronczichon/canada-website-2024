import BasicMap from './BasicMap';
import { useState, useEffect, useRef } from 'preact/hooks';
import mapboxgl from 'mapbox-gl';
import type { RouteData } from './route.type';
import { ui, defaultLang } from '../../i18n/utils';
import {
	addPointCircleLayer,
	addRouteToMap,
	addTooltipToMap,
	fetchGpxFile,
	renderMapParts,
	renderPoint,
	setMapCenter,
} from '../functions/map.functions';

export type MultiPoints = {
	coordinates: number[];
	color: string;
	id: string;
	// Set to true if you want to hide real coordinations
	useRadius?: boolean;
	// Set a tooltip which is shown as soon as the user hovers over the point
	tooltip?: string;
	// Optional route ID to associate the point with a route
	routeId?: string;
};

export type MultiMapProps = {
	zoom?: number;
	mapCenter: number[];
	points?: MultiPoints[];
	routes?: RouteData[];
	// Legacy support for single route
	currentPath?: string;
	tooltip?: string;
	// Language for i18n support
	lang?: 'en' | 'de';
};

export default function MultiMap({
	zoom,
	mapCenter,
	points,
	routes,
	currentPath,
	tooltip,
	lang = defaultLang,
}: MultiMapProps) {
	const [map, setMap] = useState<mapboxgl.Map>();
	const [selectedRoutes, setSelectedRoutes] = useState<Set<string>>(new Set());
	const [loadedRoutes, setLoadedRoutes] = useState<Map<string, number[][]>>(new Map());
	const [previousSelectedRoutes, setPreviousSelectedRoutes] = useState<Set<string>>(new Set());
	const pointMarkersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());

	// Initialize selected routes (all selected by default)
	useEffect(() => {
		if (routes && routes.length > 0) {
			const initialSelection = new Set(routes.map((r) => r.id));
			setSelectedRoutes(initialSelection);
			// Don't set previousSelectedRoutes here - leave it empty so initial routes are rendered
		}
	}, [routes]);

	useEffect(() => {
		if (!map || !mapCenter || !points) return;

		// Clear existing markers
		pointMarkersRef.current.forEach((marker) => marker.remove());
		pointMarkersRef.current.clear();

		renderMapParts(
			() =>
				points.forEach((point) => {
					const marker = renderPoint(map, point);
					pointMarkersRef.current.set(point.id, marker);

					// Hide marker if it's associated with an unselected route
					if (point.routeId && !selectedRoutes.has(point.routeId)) {
						marker.remove();
					}
				}),
			() => setMapCenter(map, mapCenter),
		);
	}, [mapCenter, points, map, selectedRoutes]);

	// Load all routes from GPX files concurrently
	useEffect(() => {
		if (!routes || routes.length === 0) return;

		const loadRoutes = async () => {
			const routePromises = routes.map(async (route) => {
				try {
					const coordinates = await fetchGpxFile(route.url);
					return { id: route.id, coordinates };
				} catch (error) {
					console.error(`Error loading route ${route.id}:`, error);
					return null;
				}
			});

			const results = await Promise.allSettled(routePromises);
			const newLoadedRoutes = new Map<string, number[][]>();

			results.forEach((result) => {
				if (result.status === 'fulfilled' && result.value) {
					newLoadedRoutes.set(result.value.id, result.value.coordinates);
				}
			});

			setLoadedRoutes(newLoadedRoutes);
		};

		loadRoutes();
	}, [routes]);

	// Render selected routes on the map
	useEffect(() => {
		if (!map || !routes || loadedRoutes.size === 0) return;

		// Find routes that were deselected
		const deselected = [...previousSelectedRoutes].filter((id) => !selectedRoutes.has(id));
		// Find routes that were newly selected
		const newlySelected = [...selectedRoutes].filter((id) => !previousSelectedRoutes.has(id));

		// Remove deselected route layers
		deselected.forEach((routeId) => {
			const layerId = `route-${routeId}`;
			if (map.getLayer(layerId)) {
				map.removeLayer(layerId);
			}
			if (map.getSource(layerId)) {
				map.removeSource(layerId);
			}

			// Hide associated points
			if (points) {
				points.forEach((point) => {
					if (point.routeId === routeId) {
						const marker = pointMarkersRef.current.get(point.id);
						if (marker) {
							marker.remove();
						}
						// Remove circle layer if exists
						if (point.useRadius && map.getLayer(point.id)) {
							map.removeLayer(point.id);
						}
						if (point.useRadius && map.getSource(point.id)) {
							map.removeSource(point.id);
						}
					}
				});
			}
		});

		// Add newly selected routes
		newlySelected.forEach((routeId) => {
			const route = routes.find((r) => r.id === routeId);
			if (route) {
				const coordinates = loadedRoutes.get(route.id);
				if (coordinates) {
					addRouteToMap(map, coordinates, route.id, 4, route.color || '#2BCA2B');
					const tooltip = lang === 'de' ? route.tooltipDe : route.tooltip;
					if (tooltip) {
						addTooltipToMap(map, tooltip, `route-${route.id}`);
					}
				}
			}

			// Show associated points
			if (points) {
				points.forEach((point) => {
					if (point.routeId === routeId) {
						const marker = pointMarkersRef.current.get(point.id);
						if (marker) {
							marker.addTo(map);
						}
						// Add circle layer if needed and not already present
						if (!map.getLayer(point.id)) {
							addPointCircleLayer(map, point);
						}
					}
				});
			}
		});

		// Update previous selection
		setPreviousSelectedRoutes(new Set(selectedRoutes));
	}, [map, routes, selectedRoutes, loadedRoutes, previousSelectedRoutes, points]);

	// Legacy support for single route
	useEffect(() => {
		if (!map || !currentPath || !tooltip) return;

		fetchGpxFile(currentPath)
			.then((route) => {
				addRouteToMap(map, route, 'full-route', 4, '#2BCA2B');
				addTooltipToMap(map, tooltip, 'route-full-route');
			})
			.catch((error) => {
				console.error('Error loading legacy route:', error);
			});
	}, [map, currentPath, tooltip]);

	const toggleRoute = (routeId: string) => {
		setSelectedRoutes((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(routeId)) {
				newSet.delete(routeId);
			} else {
				newSet.add(routeId);
			}
			return newSet;
		});
	};

	const t = ui[lang as keyof typeof ui] || ui[defaultLang];

	return (
		<div>
			{routes && routes.length > 0 && (
				<div className="map-route-selection" style={{ marginBottom: '1rem' }}>
					<h3 style={{ marginTop: 0 }}>{t['map.selectRoutes']}</h3>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
						{routes.map((route) => (
							<label
								key={route.id}
								style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
							>
								<input
									type="checkbox"
									checked={selectedRoutes.has(route.id)}
									onChange={() => toggleRoute(route.id)}
									style={{ marginRight: '0.5rem' }}
								/>
								<span
									style={{
										display: 'inline-block',
										width: '20px',
										height: '3px',
										backgroundColor: route.color || '#2BCA2B',
										marginRight: '0.5rem',
									}}
								/>
								{route.name}
							</label>
						))}
					</div>
				</div>
			)}
			<BasicMap zoom={zoom} setMap={setMap} />
		</div>
	);
}
