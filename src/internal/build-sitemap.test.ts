import test from 'ava';
import {buildPageEntries} from './build-sitemap.js';

const options = {
	origin: 'http://example.com',
	defaults: {
		lastmod: 'lastmod',
		changefreq: 'never',
		priority: 1,
	},
	sitemapFile: 'sitemap.xml',
	pages: {},
} as const;

test('buildPageEntries creates entries for all provided paths', t => {
	t.deepEqual(buildPageEntries(['/', '/page'], options), [
		{
			...options.defaults,
			loc: 'http://example.com/',
		},
		{
			...options.defaults,
			loc: 'http://example.com/page',
		},
	]);
});

test('buildPageEntries allows overriding values per path paths', t => {
	t.deepEqual(buildPageEntries(['/', '/page'], {
		...options,
		pages: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'/page': {
				changefreq: 'always',
			},
		},
	}), [
		{
			...options.defaults,
			loc: 'http://example.com/page',
			changefreq: 'always',
		},
		{
			...options.defaults,
			loc: 'http://example.com/',
		},
	]);
});

test('buildPageEntries allows explicitly including pages', t => {
	t.deepEqual(buildPageEntries(['/', '/page'], {
		...options,
		pages: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'/dynamic': {},
		},
	}), [
		{
			...options.defaults,
			loc: 'http://example.com/dynamic',
		},
		{
			...options.defaults,
			loc: 'http://example.com/',
		},
		{
			...options.defaults,
			loc: 'http://example.com/page',
		},
	]);
});
