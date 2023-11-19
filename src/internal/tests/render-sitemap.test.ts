import test from 'ava';
import {renderSitemap} from '../render-sitemap.js';

test('render-sitemap renders the same xml', t => {
	t.snapshot(renderSitemap([
		{loc: '/', priority: 1, changefreq: 'daily',
			lastmod: new Date('2023-01-01T00:00:00.000Z').toISOString()},
		{loc: '/posts/1', priority: 0.6, changefreq: 'monthly',
			lastmod: new Date('2023-01-10T00:00:00.000Z').toISOString()},
	]));
});

for (const prop of ['priority', 'changefreq', 'lastmod'] as const) {
	const page = {
		loc: '/',
		priority: 1,
		changefreq: 'daily',
		lastmod: new Date('2023-01-01T00:00:00.000Z').toISOString(),
	};
	test(`render-sitemap skips undefined ${prop}`, t => {
		const p = {...page};
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete p[prop];

		const sitemap = renderSitemap([p]);

		t.false(sitemap.includes(prop), `Expected sitemap to skip property ${prop}\n${sitemap}`);
		t.snapshot(sitemap);
	});
}

test('render-sitemap renders the sitemap with hook output', t => {
	t.snapshot(renderSitemap([
		{loc: '/', hook: _ => '<custom>tag</custom>'},
	]));
});
