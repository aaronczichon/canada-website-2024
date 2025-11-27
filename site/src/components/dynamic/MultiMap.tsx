import BasicMap from './BasicMap';
import { useState, useEffect } from 'preact/hooks';
import mapboxgl from 'mapbox-gl';
import type { RouteData } from './route.type';
import {
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
};

export type MultiMapProps = {
	zoom?: number;
	mapCenter: number[];
	points?: MultiPoints[];
	routes?: RouteData[];
	// Legacy support for single route
	currentPath?: string;
	tooltip?: string;
};

export default function MultiMap({
	zoom,
	mapCenter,
	points,
	routes,
	currentPath,
	tooltip,
}: MultiMapProps) {
	const [map, setMap] = useState<mapboxgl.Map>();
	const [selectedRoutes, setSelectedRoutes] = useState<Set<string>>(new Set());
	const [loadedRoutes, setLoadedRoutes] = useState<Map<string, number[][]>>(new Map());
	const [previousSelectedRoutes, setPreviousSelectedRoutes] = useState<Set<string>>(new Set());

	// Initialize selected routes (all selected by default)
	useEffect(() => {
		if (routes && routes.length > 0) {
			const initialSelection = new Set(routes.map((r) => r.id));
			setSelectedRoutes(initialSelection);
			setPreviousSelectedRoutes(initialSelection);
		}
	}, [routes]);

	useEffect(() => {
		if (!map || !mapCenter || !points) return;
		renderMapParts(
			() =>
				points.forEach((point) => {
					console.log(point);
					renderPoint(map, point);
				}),
			() => setMapCenter(map, mapCenter),
		);
	}, [mapCenter, points, map]);

	// Load all routes from GPX files
	useEffect(() => {
		if (!routes || routes.length === 0) return;

		const loadRoutes = async () => {
			const newLoadedRoutes = new Map<string, number[][]>();
			for (const route of routes) {
				try {
					const coordinates = await fetchGpxFile(route.url);
					newLoadedRoutes.set(route.id, coordinates);
				} catch (error) {
					console.error(`Error loading route ${route.id}:`, error);
				}
			}
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
		});

		// Add newly selected routes
		newlySelected.forEach((routeId) => {
			const route = routes.find((r) => r.id === routeId);
			if (route) {
				const coordinates = loadedRoutes.get(route.id);
				if (coordinates) {
					addRouteToMap(map, coordinates, route.id, 4, route.color || '#2BCA2B');
					if (route.tooltip) {
						addTooltipToMap(map, route.tooltip, `route-${route.id}`);
					}
				}
			}
		});

		// Update previous selection
		setPreviousSelectedRoutes(new Set(selectedRoutes));
	}, [map, routes, selectedRoutes, loadedRoutes, previousSelectedRoutes]);

	// Legacy support for single route
	useEffect(() => {
		if (!map || !currentPath || !tooltip) return;

		fetchGpxFile(currentPath).then((route) => {
			addRouteToMap(map, route, 'full-route', 4, '#2BCA2B');
			addTooltipToMap(map, tooltip, 'route-full-route');
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

	return (
		<div>
			{routes && routes.length > 0 && (
				<div style={{ padding: '1rem', backgroundColor: '#f5f5f5', marginBottom: '1rem' }}>
					<h3 style={{ marginTop: 0 }}>Select Routes to Display:</h3>
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
