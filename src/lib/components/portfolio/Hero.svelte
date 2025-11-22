<script lang="ts">
	import ArrowDown from 'phosphor-svelte/lib/ArrowDown';
	import rollupCounter from '$lib/easter/rollupCounter';

	interface Props {
		motd?: string | undefined;
	}

	let { motd }: Props = $props();
	let showMotd = $state(false);

	let finalMotd = $derived(motd && showMotd ? motd : 'Grinding away…');

	const scrollToAbout = () => {
		const element = document.getElementById('about');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const incrementMotdCounter = rollupCounter(14, 10_000, () => {
		showMotd = true;
		setTimeout(() => {
			showMotd = false;
		}, 5000);
	});

	const handleMotdClick = () => {
		if (showMotd) {
			return;
		}
		incrementMotdCounter();
	};
</script>

<section id="hero" class="px-6 pt-20 pb-16 relative flex min-h-screen items-center justify-center">
	<div class="max-w-5xl w-full">
		<div class="space-y-4 md:space-y-6">
			<button
				aria-label="Message of the day"
				onclick={handleMotdClick}
				class={[
					'px-4 py-2 mb-2 md:mb-4 inline-block rounded-full transition-all',
					showMotd
						? 'bg-tangerine/90 text-deep-aubergine'
						: 'bg-deep-aubergine text-tangerine border-tangerine border-1'
				]}
			>
				<span class="text-xs md:text-sm tracking-wider block uppercase">{finalMotd}</span>
			</button>
			<h1 class="text-tangerine text-5xl md:text-6xl lg:text-7xl">
				A <span class="text-3xl md:text-4xl lg:text-5xl text-tangerine/70">(hopefully)</span>
				<br />
				Rational
				<br />
				Human
			</h1>
			<p class="max-w-2xl text-tangerine/70 text-base md:text-lg lg:text-xl">
				I'm Rishvic. Glad you stopped by!
			</p>
		</div>
	</div>

	<button
		aria-label="About"
		onclick={() => scrollToAbout()}
		class="md:bottom-(--offset-bottom-md) -translate x-1/2 motion-safe:animate-bounce absolute bottom-(--offset-bottom) left-1/2"
		style:--offset-bottom="calc(var(--spacing-safe-bottom) + var(--spacing)*8)"
		style:--offset-bottom-md="calc(var(--spacing-safe-bottom) + var(--spacing)*12)"
	>
		<ArrowDown class="w-5 h-5 md:w-6 md:h-6 text-tangerine" />
	</button>
</section>
