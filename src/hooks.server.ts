import type { Handle } from '@sveltejs/kit';

const fontPatterns = [
	/\/nunito-latin-wght-normal\.[A-Za-z0-9_-]+\.woff2$/,
	/\/pacifico-latin-400-normal\.[A-Za-z0-9_-]+\.woff2$/,
	/\/pacifico-latin-400-normal\.[A-Za-z0-9_-]+\.woff$/
];

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		preload: ({ type, path }) =>
			type === 'font' && fontPatterns.some((fontPattern) => fontPattern.test(path))
	});
};
