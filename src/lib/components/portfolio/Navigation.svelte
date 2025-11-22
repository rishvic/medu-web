<script lang="ts">
	import List from 'phosphor-svelte/lib/List';
	import X from 'phosphor-svelte/lib/X';

	let isOpen = $state(false);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			isOpen = false;
		} else {
			console.error(new Error(`could not scroll to section: #${id} not found`));
		}
	};
</script>

<nav
	class="top-0 left-0 right-0 backdrop-blur-lg bg-deep-aubergine/80 border-tangerine/10 fixed z-50 border-b"
>
	<div class="max-w-7xl px-6 py-4 mx-auto">
		<div class="flex items-center justify-between">
			<button
				onclick={() => scrollToSection('hero')}
				class="text-tangerine tracking-widest uppercase">Hello there.</button
			>

			<!-- Desktop Navigation. -->
			<div class="md:flex gap-8 hidden items-center">
				<button
					aria-label="About"
					onclick={() => scrollToSection('about')}
					class="text-tangerine/70 hover:text-tangerine transition-colors"
				>
					About
				</button>
				<button
					aria-label="Projects"
					onclick={() => scrollToSection('projects')}
					class="text-tangerine/70 hover:text-tangerine transition-colors"
				>
					Projects
				</button>
				<button
					aria-label="Links"
					onclick={() => scrollToSection('links')}
					class="text-tangerine/70 hover:text-tangerine transition-colors"
				>
					Links
				</button>
				<button
					aria-label="Contact"
					onclick={() => scrollToSection('links')}
					class="px-6 py-2 bg-tangerine text-deep-aubergine hover:bg-tangerine/90 rounded-full transition-colors"
				>
					Contact
				</button>
			</div>

			<!-- Mobile Menu Button -->
			<button
				aria-label="Toggle Menu"
				onclick={() => (isOpen = !isOpen)}
				class="md:hidden text-tangerine p-2"
			>
				{#if isOpen}
					<X class="w-6 h-6" />
				{:else}
					<List class="w-6 h-6" />
				{/if}
			</button>
		</div>
		{#if isOpen}
			<!-- Mobile Navigation -->
			<div class="md:hidden pt-4 pb-2 space-y-3">
				<button
					aria-label="About"
					onclick={() => scrollToSection('about')}
					class="text-tangerine/70 hover:text-tangerine py-2 block w-full text-left transition-colors"
				>
					About
				</button>
				<button
					aria-label="Projects"
					onclick={() => scrollToSection('projects')}
					class="text-tangerine/70 hover:text-tangerine py-2 block w-full text-left transition-colors"
				>
					Projects
				</button>
				<button
					aria-label="Links"
					onclick={() => scrollToSection('links')}
					class="text-tangerine/70 hover:text-tangerine py-2 block w-full text-left transition-colors"
				>
					Links
				</button>
				<button
					aria-label="Contact"
					onclick={() => scrollToSection('links')}
					class="px-6 py-2 bg-tangerine text-deep-aubergine hover:bg-tangerine/90 transition-colors-mt-2 w-full rounded-full"
				>
					Contact
				</button>
			</div>
		{/if}
	</div>
</nav>
