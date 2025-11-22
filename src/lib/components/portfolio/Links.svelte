<script lang="ts">
	import Barbell from 'phosphor-svelte/lib/Barbell';
	import Envelope from 'phosphor-svelte/lib/Envelope';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import LinkedinLogo from 'phosphor-svelte/lib/LinkedinLogo';
	import ExternalLink from './ExternalLink.svelte';
</script>

<section id="links" class="px-6 py-16 md:py-24 flex min-h-screen items-center justify-center">
	<div class="max-w-4xl w-full">
		<div class="mb-12 md:mb-16 text-center">
			<div
				class="px-3 py-1 border-tangerine text-tangerine mb-4 md:mb-6 inline-block rounded-full border-2"
			>
				<p class="text-xs tracking-widest uppercase">Connect</p>
			</div>
			<h2 class="text-tangerine mb-4 text-4xl md:text-5xl lg:text-6xl">Beyond Here…</h2>
			<p class="text-tangerine/70 text-base md:text-lg lg:text-xl">
				Find me across the web or drop me a message
			</p>
		</div>
		<div class="sm:grid-cols-2 gap-4 grid">
			<ExternalLink
				name="GitHub"
				url="https://github.com/rishvic"
				icon={GithubLogo}
				description="Check out my code"
			/>
			<ExternalLink
				name="LinkedIn"
				url="https://www.linkedin.com/in/rishvic-pushpakaran-3ab69a206/"
				icon={LinkedinLogo}
				description="Connect professionally"
			/>
			<ExternalLink
				name="Fitness"
				url="https://www.instagram.com/9to5_wali_body"
				icon={Barbell}
				description="Give my friends a follow!"
			/>
			<ExternalLink
				name="Email"
				url="mailto:hello@rishvic.net"
				icon={Envelope}
				description="Get in touch"
			/>
		</div>

		<div class="mt-12 md:mt-16 text-center">
			<p class="text-tangerine/70 text-xs md:text-sm">
				<span class="text-tangerine/50">Forged by passion and a serious sleep deficit</span> 😴
			</p>
		</div>
	</div>
</section>
