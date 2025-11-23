import type { Handle } from '@sveltejs/kit';

const isLatinFont = /\/_app\/immutable\/assets\/[^/]*-latin-(?!ext)[^/]*\.[A-Za-z0-9_-]+\.woff2?$/;

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		// Preload latin fonts.
		preload: ({ type, path }) => type === 'font' && isLatinFont.test(path)
	});

	// No cache headers required for nonce-based strict CSP.
	response.headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

	return response;
};
