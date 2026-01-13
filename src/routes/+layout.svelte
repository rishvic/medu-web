<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<!-- Privacy-friendly analytics by Plausible -->
	<script async src="https://plausible.rishvic.net/js/pa-4Q26e95uwt3vhtWzyWw5J.js"></script>
	<script>
		// prettier-ignore
		window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
		plausible.init();
	</script>
</svelte:head>

{@render children()}
