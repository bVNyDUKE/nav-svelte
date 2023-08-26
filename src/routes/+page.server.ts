import { stations } from '$lib/server/stations';

type GeoLayer = {
	type: 'FeatureCollection';
	features: {
		type: 'Feature';
		geometry: {
			type: 'Point';
			coordinates: [number, number];
		};
		properties: {
			name: string;
			description: string;
		};
	}[];
};

export async function load() {
	const stationsLayer: GeoLayer = {
		type: 'FeatureCollection',
		features: []
	};

	for (const station of stations) {
		stationsLayer.features.push({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [
					parseFloat(station.coordinates.longitude),
					parseFloat(station.coordinates.latitude)
				]
			},
			properties: {
				name: station.name,
				description: station.id
			}
		});
	}

	return {
		stations: stationsLayer
	};
}
