<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader } from '@googlemaps/js-api-loader';
	import Icon from '$lib/assets/bus-icon.png';

	export let data;
	let map: google.maps.Map;
	let container: HTMLElement;

	const getStationData = async (stationId: string) => {
		console.log(stationId);
		// const res = await fetch(`/api/station?id=${stationId}`);
		// const data = await res.json();
	};

	const loader = new Loader({
		apiKey: import.meta.env.VITE_PUBLIC_MAPS_KEY,
		version: 'weekly'
	});
	const mapOptions = {
		zoom: 14,
		center: { lat: 44.811103445619096, lng: 20.46607563240916 },
		styles: [
			{
				featureType: 'transit.station',
				stylers: [{ visibility: 'off' }]
			}
		]
	};

	onMount(async () => {
		const { Map } = await loader.importLibrary('maps');
		map = new Map(container, mapOptions);

		map.data.addGeoJson(data.stations);
		map.data.addListener('click', async (e: { feature: { h: { description: string } } }) => {
			const stationId = e.feature.h.description;
			await getStationData(stationId);
		});
		map.data.setStyle({
			icon: Icon
		});
	});
</script>

<div class="full-screen" bind:this={container} />

<style>
	.full-screen {
		width: 99vw;
		height: 99vh;
	}
</style>
