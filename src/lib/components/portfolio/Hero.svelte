<script lang="ts">
	import ArrowDown from 'phosphor-svelte/lib/ArrowDown';

	interface Props {
		motd: string;
	}

	const { motd }: Props = $props();
</script>

<section id="hero" class="px-6 pt-20 pb-16 relative flex min-h-screen items-center justify-center">
	<div class="max-w-5xl w-full">
		<div class="space-y-4 md:space-y-6">
			<div
				class="px-4 py-2 bg-tangerine text-deep-aubergine mb-2 md:mb-4 inline-block rounded-full"
			>
				<p class="text-xs md:text-sm tracking-wider uppercase">{motd}</p>
			</div>
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

	<div
		class="md:bottom-(--offset-bottom-md) -translate x-1/2 animate-bounce absolute bottom-(--offset-bottom) left-1/2"
		style:--offset-bottom="calc(var(--spacing-safe-bottom) + var(--spacing)*8)"
		style:--offset-bottom-md="calc(var(--spacing-safe-bottom) + var(--spacing)*12)"
	>
		<ArrowDown class="w-5 h-5 md:w-6 md:h-6 text-tangerine" />
	</div>
</section>
