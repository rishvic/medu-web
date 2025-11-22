<script lang="ts">
	import './styles.css';
	import type { PageProps } from './$types';
	import Hero from '$lib/components/portfolio/Hero.svelte';
	import Navigation from '$lib/components/portfolio/Navigation.svelte';
	import Links from '$lib/components/portfolio/Links.svelte';
	import Projects from '$lib/components/portfolio/Projects.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Rishvic | Home</title>
	<meta name="description" content="The digital memory of Rishvic." />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html data.myData}
</svelte:head>

<div class="bg-deep-aubergine text-tangerine min-h-screen">
	<Navigation />
	<Hero motd={data.motd} />
	<Projects />
	<Links />
</div>
