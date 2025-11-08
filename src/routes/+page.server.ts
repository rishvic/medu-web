import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	let isConspiracy = false;

	try {
		const crypto = await import('node:crypto');
		const randomBytes = crypto.webcrypto.getRandomValues(new Uint16Array(1));
		isConspiracy = (randomBytes[0] & 0xfff) === 42;
	} catch {
		console.log('Could not import node:crypto');
	}

	setHeaders({
		'Cache-Control': isConspiracy ? 'no-store' : 'public, max-age=86400, s-maxage=300'
	});

	return {
		isConspiracy
	};
};
