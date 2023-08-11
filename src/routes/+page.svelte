<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader } from '@googlemaps/js-api-loader';

	export let data;

	let container: HTMLElement;

	const loader = new Loader({
		apiKey: import.meta.env.VITE_PUBLIC_MAPS_KEY,
		version: 'weekly'
	});

	let map: google.maps.Map;
	let zoom = 14;
	let center = { lat: 44.811103445619096, lng: 20.46607563240916 };

	onMount(async () => {
		const { Map } = await loader.importLibrary('maps');
		map = new Map(container, {
			center,
			zoom,
			styles: [
				{
					featureType: 'transit.station',
					stylers: [{ visibility: 'off' }]
				}
			]
		});

		data.stations.map((station, i) => {
			new window.google.maps.Marker({
				map,
				position: {
					lat: parseFloat(station.coordinates.latitude),
					lng: parseFloat(station.coordinates.longitude)
				},
				label: i.toString()
			});
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
