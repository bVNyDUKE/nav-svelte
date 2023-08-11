import { stations } from '$lib/server/stations';

export async function load() {
	return {
		stations
	};
}
