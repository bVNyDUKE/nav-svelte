import { env } from '$env/dynamic/private';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const stationId = Number(url.searchParams.get('id') ?? 0);
	if (stationId === 0) {
		return new Response('Invalid station');
	}

	const res = await fetch(
		`${env.API_URL}/publicapi/v1/announcement/announcement.php?station_uid=${stationId}`,
		{
			headers: {
				'X-Api-Authentication': env.API_KEY
			}
		}
	);
	const data = await res.json();
	console.log(data);

	return new Response('Got data');
};
