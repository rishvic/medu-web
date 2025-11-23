import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'nonce',
			directives: {
				'script-src': ['strict-dynamic', 'https:'],
				'object-src': ['none'],
				'base-uri': ['none']
			}
		}
	}
};

export default config;
