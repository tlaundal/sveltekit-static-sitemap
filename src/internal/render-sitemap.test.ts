import test from 'ava';
import {renderSitemap} from './render-sitemap.js';

test('render-sitemap renders the same xml', t => {
	t.snapshot(renderSitemap([
		{loc: '/', priority: 1, changefreq: 'daily',
			lastmod: new Date('2023-01-01T00:00:00.000Z').toISOString()},
		{loc: '/posts/1', priority: 0.6, changefreq: 'monthly',
			lastmod: new Date('2023-01-10T00:00:00.000Z').toISOString()},
	]));
});
