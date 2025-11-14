<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />

	<!-- Privacy-friendly analytics by Plausible -->
	<script async src="https://plausible.io/js/pa-vnCyH5YgHamgjYmVN_aZy.js"></script>
	<script>
		// prettier-ignore
		window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
		// prettier-ignore
		plausible.init()
	</script>
</svelte:head>

{@render children()}
