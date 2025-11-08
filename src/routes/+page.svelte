<script lang="ts">
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import type { PageProps } from './$types';

	import HandEye from 'phosphor-svelte/lib/HandEye';
	import HandPeace from 'phosphor-svelte/lib/HandPeace';

	let { data }: PageProps = $props();

	let mainEl: HTMLElement | null = null;
	let headerEl: HTMLElement | null = null;

	let mainHeight = $state(1);
	let headerHeight = $state(1);
	let mainScrollY = $state(0);

	function computeOffset(mainHeight: number, headerHeight: number, mainScrollY: number) {
		if (Math.abs(mainHeight) < 0.01) {
			return 0;
		}
		return Math.max(0, ((1 - mainScrollY / mainHeight) * (mainHeight - headerHeight)) / 2);
	}

	function computePercent(mainScrollY: number, mainHeight: number) {
		if (Math.abs(mainHeight) < 0.01) {
			return '100%';
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
			mainHeight = mainEl.offsetHeight;
			mainScrollY = mainEl.scrollTop;
		}

		if (headerEl) {
			headerHeight = headerEl.offsetHeight;
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
	style:--main-height={`${mainHeight}px`}
	style:--header-offset={`${computeOffset(mainHeight, headerHeight, mainScrollY)}px`}
	style:--main-scroll-y={`${mainScrollY}px`}
	style:--scroll-percent={computePercent(mainScrollY, mainHeight)}
	style:--app-bar-bg-light="color-mix(in oklab, var(--color-icy-wisp) var(--scroll-percent),
	var(--color-cloud-drift))"
	style:--app-bar-bg-dark="color-mix(in oklab, var(--color-deep-ocean) var(--scroll-percent),
	var(--color-midnight-slate))"
>
	<header
		bind:this={headerEl}
		class="fixed top-0 z-10 w-screen flex-auto translate-y-(--header-offset)"
	>
		<nav
			class="flex h-20 flex-row items-center justify-center bg-(--app-bar-bg-light) md:h-28 dark:bg-(--app-bar-bg-dark)"
		>
			{#if data.isConspiracy}
				<HandEye
					color="currentColor"
					weight="fill"
					class="h-16 w-16 text-golden-zing md:h-24 md:w-24"
				/>
			{:else}
				<HandPeace
					color="currentColor"
					weight="fill"
					class="h-16 w-16 text-golden-zing md:h-24 md:w-24"
				/>
			{/if}
		</nav>
	</header>
	<section
		class="h-screen snap-start bg-(--app-bar-bg-light) dark:bg-(--app-bar-bg-dark)"
	></section>
	<section class="h-screen snap-start pt-(--header-height)">Bye</section>
</main>

<style>
	main {
		scrollbar-width: none;
	}

	main::-webkit-scrollbar {
		display: none;
	}
</style>
