<script lang="ts">
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import { MediaQuery } from 'svelte/reactivity';
	import { innerHeight } from 'svelte/reactivity/window';
	import type { PageProps } from './$types';

	import HandEye from 'phosphor-svelte/lib/HandEye';
	import HandPeace from 'phosphor-svelte/lib/HandPeace';

	let { data }: PageProps = $props();

	let mainEl: HTMLElement | null = null;

	const medium = new MediaQuery('min-width: 48rem');

	let mainScrollY = $state(0);
	let headerHeight = $derived(medium.current ? 96 : 80);

	function computeOffset(mainHeight: number | undefined, mainScrollY: number) {
		if (mainHeight === undefined) {
			return `calc(50vh - ${mainScrollY}px / 2)`;
		}
		return `calc((50vh - ${headerHeight}px / 2) * ${1 - mainScrollY / mainHeight})`
	}

	function computePercent(mainHeight: number | undefined, mainScrollY: number) {
		if (mainHeight === undefined || Math.abs(mainHeight) < 0.01) {
			return '0%';
		}
		return `${Math.min(100, Math.max((mainScrollY / mainHeight) * 100, 0))}%`;
	}

	const handleMainScroll = () => {
		if (mainEl) {
			mainScrollY = mainEl.scrollTop;
		}
	};

	function measureVariables() {
		if (mainEl) {
			mainScrollY = mainEl.scrollTop;
		}
	}

	onMount(() => {
		measureVariables();
		return on(window, 'resize', measureVariables);
	});
</script>

<main
	bind:this={mainEl}
	onscroll={handleMainScroll}
	class="relative h-screen snap-y snap-proximity overflow-y-scroll scroll-smooth md:snap-mandatory"
	style:--header-height={`${headerHeight}px`}
	style:--header-offset={computeOffset(innerHeight.current, mainScrollY)}
	style:--app-bar-bg-light={`rgb(from var(--color-icy-wisp) r g b / ${computePercent(innerHeight.current, mainScrollY)})`}
	style:--app-bar-bg-dark={`rgb(from var(--color-deep-ocean) r g b / ${computePercent(innerHeight.current, mainScrollY)})`}
>
	<header
		class="fixed top-0 z-10 h-(--header-height) w-screen flex-auto translate-y-(--header-offset)"
	>
		<nav class="flex h-(--header-height) flex-row items-center justify-center">
			{#if data.isConspiracy}
				<HandEye
					color="currentColor"
					weight="fill"
					size={headerHeight - 16}
					class="text-golden-zing"
				/>
			{:else}
				<HandPeace
					color="currentColor"
					weight="fill"
					size={headerHeight - 16}
					class="text-golden-zing"
				/>
			{/if}
		</nav>
	</header>
	<section
		class="h-screen snap-start bg-(--app-bar-bg-light) dark:bg-(--app-bar-bg-dark)"
	></section>
	<section class="h-screen snap-start">
		<div class="h-20 bg-(--app-bar-bg-light) md:h-24 dark:bg-(--app-bar-bg-dark)"></div>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget dignissim magna, et
			eleifend elit. Aenean interdum libero eu nulla tempor ullamcorper. Donec id nibh eget lectus
			lacinia imperdiet. Morbi sodales viverra sapien sed tempor. Nam fermentum, odio non
			sollicitudin tincidunt, dolor nulla congue justo, eu facilisis nulla magna in metus. Nam ipsum
			odio, feugiat vitae condimentum in, euismod ut nibh. Integer ultrices turpis arcu, non egestas
			libero suscipit dignissim. Vestibulum sapien turpis, euismod a porttitor eget, fermentum non
			sapien.
		</p>
	</section>
</main>

<style>
	main {
		scrollbar-width: none;
	}

	main::-webkit-scrollbar {
		display: none;
	}
</style>
