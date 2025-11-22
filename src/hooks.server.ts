import type { Handle } from '@sveltejs/kit';

const isLatinFont = /\/_app\/immutable\/assets\/[^/]*-latin-(?!ext)[^/]*\.[A-Za-z0-9_-]+\.woff2?$/;

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		preload: ({ type, path }) => type === 'font' && isLatinFont.test(path)
	});
};
