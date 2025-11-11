import type { RequestHandler } from './$types';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'node:stream';
import { DATE_MODIFIED, IS_PROD_DEPLOYMENT } from '$lib/server/constants';

export const GET: RequestHandler = async ({ url }) => {
	const links = [{ url: '/', changefreq: 'daily', priority: 0.8, lastmod: DATE_MODIFIED }];

	const stream = new SitemapStream({ hostname: url.origin });
	const xml = await streamToPromise(Readable.from(links).pipe(stream));

	return new Response(xml.toString(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': IS_PROD_DEPLOYMENT ? 'public, max-age=86400, s-maxage=86400' : 'no-store'
		}
	});
};
