import {trimMargin} from './utils.js';

type UrlDefinition = {
	loc: string;
	lastmod?: string | undefined;
	priority?: number | undefined;
	changefreq?: string | undefined;
};

export function renderSitemap(pages: UrlDefinition[]) {
	return trimMargin(`
		<?xml version="1.0" encoding="UTF-8"?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
		>
		${pages
		.map(
			({loc, lastmod, priority, changefreq}) => `
			<url>
				<loc>${loc}</loc>
				${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
				${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
				${priority ? `<priority>${priority}</priority>` : ''}
			</url>`,
		)
		.join('\n')}
		</urlset>`);
}
