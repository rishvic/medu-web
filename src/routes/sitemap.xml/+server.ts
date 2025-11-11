import type { RequestHandler } from './$types';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'node:stream';
import { DATE_MODIFIED } from '$lib/server/constants';

export const GET: RequestHandler = async ({ url }) => {
	console.log(url);
	const links = [{ url: '/', changefreq: 'daily', priority: 0.8, lastmod: DATE_MODIFIED }];

	const stream = new SitemapStream({ hostname: url.origin });
	const xml = await streamToPromise(Readable.from(links).pipe(stream));

	return new Response(xml.toString(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	});
};
