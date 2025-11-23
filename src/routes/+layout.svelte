<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { PUBLIC_PLAUSIBLE_DOMAIN } from '$env/static/public';

	let { children } = $props();

	onMount(async () => {
		const { init } = await import('@plausible-analytics/tracker');
		init({
			domain: PUBLIC_PLAUSIBLE_DOMAIN
		});
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
</svelte:head>

{@render children()}
