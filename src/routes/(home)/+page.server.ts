import type { PageServerLoad } from './$types';
import { DateTime } from 'luxon';
import type { ProfilePage } from 'schema-dts';
import { jsonLd } from '$lib/server/jsonLd';
import { DATE_CREATED, DATE_MODIFIED, IS_PROD_DEPLOYMENT } from '$lib/server/constants';

function getMotd(timestamp: DateTime) {
	const annualMessages: Record<string, string | undefined> = {
		'0430': 'Happy Birthday, Brightest, Boldest Mom! ✨',
		'0705': 'Mere Bhai da Budday hai! 🕺',
		'0731': 'Investing in you. Happy Birthday, Dad! 🚀',
		'1122': 'Happy Anniversary, Mom & Dad! 🪢',
		'1219': 'The Cake is a Lie 🎂'
	};

	return annualMessages[timestamp.setZone('Asia/Kolkata').toFormat('MMdd')];
}

export const load: PageServerLoad = async () => {
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

	const motd = getMotd(DateTime.now());

	return { myData, motd };
};
