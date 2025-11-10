import type { PageServerLoad } from './$types';
import type { ProfilePage } from 'schema-dts';
import { jsonLd } from '$lib/server/jsonLd';
import { DATE_CREATED, DATE_MODIFIED } from '$lib/server/constants';

export const load: PageServerLoad = async ({ setHeaders }) => {
	let isConspiracy = false;

	try {
		const crypto = await import('node:crypto');
		const randomBytes = crypto.webcrypto.getRandomValues(new Uint16Array(1));
		isConspiracy = (randomBytes[0] & 0xfff) === 42;
	} catch {
		console.log('Could not import node:crypto');
	}

	const myData = jsonLd<ProfilePage>({
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		dateCreated: DATE_CREATED,
		dateModified: DATE_MODIFIED,
		mainEntity: {
			'@type': 'Person',
			name: 'Rishvic Pushpakaran',
			familyName: 'Pushpakaran',
			givenName: 'Rishvic',
			gender: 'https://schema.org/Male',
			url: 'https://www.rishvic.net/',
			description: 'A rational human.',
			jobTitle: 'Software Engineer 2',
			worksFor: {
				'@type': 'Organization',
				name: 'LiveSwitch'
			},
			alumniOf: {
				'@type': 'EducationalOrganization',
				name: 'Indian Institute of Technology Bhubaneswar'
			},
			knowsLanguage: [
				{ '@type': 'Language', alternateName: 'en' },
				{ '@type': 'Language', alternateName: 'hi' },
				{ '@type': 'Language', alternateName: 'ta' }
			],
			sameAs: [
				'https://www.linkedin.com/in/rishvic-pushpakaran-3ab69a206/',
				'https://github.com/rishvic'
			]
		}
	});

	setHeaders({
		'Cache-Control': isConspiracy ? 'no-store' : 'public, max-age=86400, s-maxage=300'
	});

	return {
		isConspiracy,
		myData
	};
};
