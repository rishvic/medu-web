<script lang="ts">
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import { innerHeight } from 'svelte/reactivity/window';
	import HandEye from 'phosphor-svelte/lib/HandEye';
	import HandPeace from 'phosphor-svelte/lib/HandPeace';
	import JsSpringEngine from '$lib/spring/js';

	let { data }: PageProps = $props();

	let containerEl: HTMLDivElement | null = null;

	let springEngine: JsSpringEngine | null = null;
	let timeline: number;
	let logoPosition = $state(0);

	function firstFrame(timestamp: number) {
		timeline = timestamp;
		animate(timestamp);
	}
	function animate(timestamp: number) {
		const step = timestamp - timeline;
		if (springEngine !== null) {
			springEngine.step(step / 1000);
			logoPosition = springEngine.position;
		}
		timeline = timestamp;
		requestAnimationFrame((t) => animate(t));
	}

	let mainScrollY = $state(0);

	function computePercent(
		mainHeight: number | undefined,
		mainScrollY: number,
		defaultPercent: string = '0%'
	) {
		if (mainHeight === undefined || Math.abs(mainHeight) < 0.01) {
			return defaultPercent;
		}
		return `${Math.min(100, Math.max((mainScrollY / mainHeight) * 100, 0)).toFixed(2)}%`;
	}

	function springCenterOffset(mainHeight: number | undefined, mainScrollY: number) {
		if (mainHeight === undefined || Math.abs(mainHeight) < 0.01) {
			return 0;
		}
		return Math.min(0.5, mainScrollY / mainHeight);
	}

	function computeOffset(springPosition: number, mainHeight: number | undefined) {
		if (mainHeight === undefined) {
			return `calc(-50vh)`;
		}
		return `calc(-50vh + ${(100 * springPosition).toFixed(4)}vh)`;
	}

	function measureVariables() {
		if (containerEl) {
			mainScrollY = containerEl.scrollTop;
			if (springEngine) {
				springEngine.springPosition = springCenterOffset(window.innerHeight, mainScrollY);
			}
		}
	}

	onMount(() => {
		measureVariables();

		const springX = springCenterOffset(window.innerHeight, mainScrollY);
		springEngine = new JsSpringEngine(
			{ x: 0, v: 0 },
			{ x: springX, m: 1, d: data.isConspiracy ? 20 : 15, k: 100 },
			{ tmax: 0.1 }
		);
		const animationId = requestAnimationFrame(firstFrame);

		const destroyResizeHandler = on(window, 'resize', measureVariables);

		return () => {
			destroyResizeHandler();
			cancelAnimationFrame(animationId);
		};
	});
</script>

<svelte:head>
	<title>{data.isConspiracy ? 'ACCESS GRANTED: Rishvic | UNREDACTED' : 'Rishvic | Home'}</title>
	<meta
		name="description"
		content={data.isConspiracy
			? 'What you were meant to see is a lie. This is the unredacted digital archive of Rishvic. We see you.'
			: 'The digital memory of Rishvic. This is my chosen legacy.'}
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html data.myData}
</svelte:head>

<div
	bind:this={containerEl}
	onscroll={measureVariables}
	id="main-container"
	class="relative h-screen snap-y snap-proximity overflow-y-scroll scroll-smooth md:snap-mandatory"
	style:--logo-offset={computeOffset(logoPosition, innerHeight.current)}
>
	<div
		class="flex h-screen snap-start items-center justify-center bg-(--app-light-bgcolor) dark:bg-(--app-dark-bgcolor)"
		style:--app-light-bgcolor={`rgb(from var(--color-icy-wisp) r g b / ${computePercent(innerHeight.current, mainScrollY)})`}
		style:--app-dark-bgcolor={`rgb(from var(--color-deep-ocean) r g b / ${computePercent(innerHeight.current, mainScrollY)})`}
	>
		<div class="mb-[1em] shrink pb-4 font-display text-5xl md:text-7xl">
			<h1>Hey There!</h1>
		</div>
	</div>
	<div class="flex h-screen w-screen snap-start flex-col">
		<div
			class="flex h-20 min-w-screen bg-(--app-light-bgcolor) md:h-24 dark:bg-(--app-dark-bgcolor)"
			style:--app-light-bgcolor={`rgb(from var(--color-icy-wisp) r g b / ${computePercent(innerHeight.current, mainScrollY, '100%')})`}
			style:--app-dark-bgcolor={`rgb(from var(--color-deep-ocean) r g b / ${computePercent(innerHeight.current, mainScrollY, '100%')})`}
		>
			<header class="flex flex-1">
				<nav class="flex flex-1 justify-center">
					<div
						class="flex max-w-7xl flex-1 flex-row items-center justify-center px-2 sm:px-6 lg:px-8"
					>
						{#if data.isConspiracy}
							<HandEye
								color="currentColor"
								weight="fill"
								class="h-16 w-16 translate-y-(--logo-offset) text-golden-zing md:h-20 md:w-20"
							/>
						{:else}
							<HandPeace
								color="currentColor"
								weight="fill"
								class="h-16 w-16 translate-y-(--logo-offset) text-golden-zing md:h-20 md:w-20"
							/>
						{/if}
					</div>
				</nav>
			</header>
		</div>
		<main>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget dignissim magna,
				et eleifend elit. Aenean interdum libero eu nulla tempor ullamcorper. Donec id nibh eget
				lectus lacinia imperdiet. Morbi sodales viverra sapien sed tempor. Nam fermentum, odio non
				sollicitudin tincidunt, dolor nulla congue justo, eu facilisis nulla magna in metus. Nam
				ipsum odio, feugiat vitae condimentum in, euismod ut nibh. Integer ultrices turpis arcu, non
				egestas libero suscipit dignissim. Vestibulum sapien turpis, euismod a porttitor eget,
				fermentum non sapien.
			</p>
		</main>
	</div>
</div>

<style>
	#main-container {
		scrollbar-width: none;
	}

	#main-container::-webkit-scrollbar {
		display: none;
	}
</style>
