<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	import type { Component } from 'svelte';

	interface Props {
		name: string;
		url: string;
		icon: Component;
		description: string;
	}

	let { name, url, icon: IconComponent, description }: Props = $props();
</script>

<a
	href={url}
	target="_blank"
	rel="external noreferrer noopener"
	class="group bg-tangerine/5 border-tangerine/20 rounded-2xl p-6 md:p-8 hover:border-tangerine hover:bg-tangerine gap-4 md:gap-6 flex items-center border-2 transition-all duration-300"
>
	<div
		class="p-3 md:p-4 bg-tangerine/10 rounded-xl group-hover:bg-deep-aubergine transition-colors"
	>
		<IconComponent class="w-6 h-6 md:w-8 md:h-8 text-tangerine group-hover:text-tangerine" />
	</div>
	<div class="flex-1 text-left">
		<h4
			class="text-tangerine group-hover:text-deep-aubergine mb-1 text-lg md:text-xl transition-colors"
		>
			{name}
		</h4>
		<p
			class="text-tangerine/70 group-hover:text-deep-aubergine/70 text-xs md:text-sm transition-colors"
		>
			{description}
		</p>
	</div>
</a>
