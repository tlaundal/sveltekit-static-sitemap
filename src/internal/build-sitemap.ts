import {writeFileSync, mkdirSync} from 'node:fs';
import {join} from 'node:path';
import type {Builder} from '@sveltejs/kit';
import type {Options, PageDetails} from '../index.js';
import {renderSitemap} from './render-sitemap.js';

export function buildPageEntries(
	paths: Iterable<string>,
	options: Options,
) {
	const pages: Record<string, Partial<PageDetails>> = {...options.pages};
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

export function buildSitemap(builder: Builder, options: Options, dest: string) {
	const pages = buildPageEntries(builder.prerendered.pages.keys(), options);
	const sitemap = renderSitemap(pages);

	mkdirSync(dest, {recursive: true});
	const target = join(dest, options.sitemapFile);
	writeFileSync(target, sitemap);

	return [options.sitemapFile];
}
