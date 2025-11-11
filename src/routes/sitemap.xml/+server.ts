import type { RequestHandler } from './$types';
import { SitemapStream } from 'sitemap';
import { Readable, type Transform } from 'node:stream';
import { DATE_MODIFIED } from '$lib/server/constants';

export const GET: RequestHandler = async ({ url }) => {
	console.log(url);
	const links = [{ url: '/', changefreq: 'daily', priority: 0.8, lastmod: DATE_MODIFIED }];

	const stream = new SitemapStream({ hostname: url.origin });
	Readable.from(links).pipe(stream);

	return new Response(stream as unknown as ReadableStream, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	});
};
