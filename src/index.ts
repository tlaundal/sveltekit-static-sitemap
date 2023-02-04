import {writeFileSync} from 'node:fs';
import {join} from 'node:path';
import type {Adapter} from '@sveltejs/kit';
import {wrapAdapter} from './internal/wrap-adapter.js';
import {renderSitemap} from './internal/render-sitemap.js';

/**
 * Details about a page in the sitemap.
 *
 * @see {@link https://www.sitemaps.org | sitemaps.org} for further details.
 * Some of the documentation here is copied from there.
 */
export type PageDetails = {
	/**
	 * When the page was last modified.
	 *
	 * Should be in {@link https://www.w3.org/TR/NOTE-datetime | W3C Datetime}
	 * format, which is a subset of ISO8601.
	 */
	lastmod: string;

	/**
	 * Priority of this page relative to others on the site.
	 *
	 * Valid values range from 0.0 to 1.0. This value does not affect how your
	 * pages are compared to pages on other sites—it only lets the search
	 * engines know which pages you deem most important for the crawlers.
	 */
	priority: number;

	/**
	 * How frequently the page is likely to change.
	 *
	 * This value provides general information to search engines and may not
	 * correlate exactly to how often they crawl the page.
	 *
	 * The value `'always'` should be used to describe documents that change
	 * each time they are accessed. The value `'never'` should be used to
	 * describe archived URLs.
	 */
	changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
};

/**
 * Configuration options for sitemap generation.
 */
export type Options = {
	/**
	 * The origin (eg. `https://your.site`) to use to build urls.
	 *
	 * @defaultValue `kit.prerender.origin` from your SvelteKit config.
	 * It will usually be better to configure the origin there instead of here.
	 */
	origin: string;

	/**
	 * The file to write the sitemap to.
	 *
	 * @defaultValue `sitemap.xml`.
	 */
	sitemapFile: string;

	/**
	 * Default options to use for all pages.
	 *
	 * @defaultValue
	 * ```ts
	 * {
	 * 	lastmod: new Date().toISOString(),
	 * 	changefreq: 'monthly',
	 * 	priority: 0.5,
	 * }
	 * ```
	 *
	 * @see {@link PageDetails} for documentation of the available fields.
	 */
	defaults: PageDetails;

	/**
	 * Details for specific pages.
	 *
	 * Can be used to force extra pages to be included in the sitemap, or to
	 * set specific properties on a page.
	 *
	 * The keys are the paths to the pages. For instance `/` or `/posts/1`.
	 *
	 * @example
	 * ```ts
	 * {
	 * 	pages: {
	 * 		'/': {
	 * 			priority: 1,
	 * 			changefreq: 'daily'
	 * 		},
	 * 		// Explicitly included since it is not prerendered
	 * 		'/dynamic': {}
	 * 	}
	 * }
	 * ```
	 *
	 * @see {@link PageDetails} for documentation of the available fields.
	 */
	pages: Record<string, Partial<PageDetails>>;
};

const defaultOptions: Options = {
	// Trickery because this will be overwritten in `adapt`, but we cannot
	// express this with types
	origin: undefined as unknown as string,
	sitemapFile: 'sitemap.xml',
	defaults: {
		lastmod: new Date().toISOString(),
		changefreq: 'monthly',
		priority: 0.5,
	},
	pages: {},
};

const nameTemplate = '%s + sitemap';

function buildPageEntries(
	paths: IterableIterator<string>,
	options: Options,
) {
	const pages: Record<string, Partial<PageDetails>> = {};
	for (const path of paths) {
		if (!(path in pages)) {
			pages[path] = {};
		}
	}

	return Object.entries(pages).map(([path, page]) => ({
		loc: options.origin + path,
		...options.defaults,
		...page,
	}));
}

/**
 * This function is the entry point for sveltekit-static-sitemap. It takes a
 * SvelteKit adapter and returns a wrapped version which will retrieve a
 * sitemap together with the static assets.
 *
 * The sitemap is dynamically generated based on the prerendered pages from
 * SvelteKit. The `static` part in the name of this package comes from the
 * fact that the sitemap is only generated at compile-time.
 *
 * See the `options` argument for how to add more pages.
 *
 *
 * @param adapter - The SvelteKit adapter to wrap with sitemap generation.
 *
 * The sitemap will be provided to the adapter together with other static
 * assets and prerendered pages.
 *
 *
 * @param options - Configuration of the sitemap.
 *
 * The `defaults` key defines the default values for each url in the sitemap.
 *
 * The `pages` key defines values for specific pages, and can be used to
 * include extra urls in the sitemap. To include a new page with default values
 * it is sufficient to let the value be `{}`.
 *
 * See the documentation of {@link Options | the options object} for complete
 * details.
 *
 *
 * @returns An adapter which generates a sitemap and internally uses the
 * provided adapter from the first argument. This wrapped adapter will appear
 * as `<adapter> + sitemap` in SvelteKit, where `<adapter>` is the name of the
 * original adapter.
 */
export function sitemapWrapAdapter(adapter: Adapter, options: Partial<Options>): Adapter {
	const resolvedOptions = {...defaultOptions, ...options};

	return wrapAdapter(adapter, nameTemplate, {
		adapt() {
			resolvedOptions.origin = resolvedOptions.origin ?? this.config.kit.prerender.origin;
		},
		writePrerendered(original, dest) {
			const pages = buildPageEntries(this.prerendered.pages.keys(), resolvedOptions);
			const sitemap = renderSitemap(pages);

			const target = join(dest, resolvedOptions.sitemapFile);
			writeFileSync(target, sitemap);

			// We call the original here in the end, in case the prerendered
			// bundle contains a sitemap which should take priority
			return [...original(dest), resolvedOptions.sitemapFile];
		},
	});
}
