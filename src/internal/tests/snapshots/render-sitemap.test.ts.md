# Snapshot report for `src/internal/tests/render-sitemap.test.ts`

The actual snapshot is saved in `render-sitemap.test.ts.snap`.

Generated by [AVA](https://avajs.dev).

## render-sitemap renders the same xml

> Snapshot 1

    `<?xml version="1.0" encoding="UTF-8"?>␊
    <urlset␊
    	xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"␊
    	xmlns:xhtml="https://www.w3.org/1999/xhtml"␊
    >␊
    ␊
    	<url>␊
    		<loc>/</loc>␊
    		<lastmod>2023-01-01T00:00:00.000Z</lastmod>␊
    		<changefreq>daily</changefreq>␊
    		<priority>1</priority>␊
    ␊
    	</url>␊
    ␊
    	<url>␊
    		<loc>/posts/1</loc>␊
    		<lastmod>2023-01-10T00:00:00.000Z</lastmod>␊
    		<changefreq>monthly</changefreq>␊
    		<priority>0.6</priority>␊
    ␊
    	</url>␊
    </urlset>`

## render-sitemap skips undefined priority

> Snapshot 1

    `<?xml version="1.0" encoding="UTF-8"?>␊
    <urlset␊
    	xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"␊
    	xmlns:xhtml="https://www.w3.org/1999/xhtml"␊
    >␊
    ␊
    	<url>␊
    		<loc>/</loc>␊
    		<lastmod>2023-01-01T00:00:00.000Z</lastmod>␊
    		<changefreq>daily</changefreq>␊
    ␊
    ␊
    	</url>␊
    </urlset>`

## render-sitemap skips undefined changefreq

> Snapshot 1

    `<?xml version="1.0" encoding="UTF-8"?>␊
    <urlset␊
    	xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"␊
    	xmlns:xhtml="https://www.w3.org/1999/xhtml"␊
    >␊
    ␊
    	<url>␊
    		<loc>/</loc>␊
    		<lastmod>2023-01-01T00:00:00.000Z</lastmod>␊
    ␊
    		<priority>1</priority>␊
    ␊
    	</url>␊
    </urlset>`

## render-sitemap skips undefined lastmod

> Snapshot 1

    `<?xml version="1.0" encoding="UTF-8"?>␊
    <urlset␊
    	xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"␊
    	xmlns:xhtml="https://www.w3.org/1999/xhtml"␊
    >␊
    ␊
    	<url>␊
    		<loc>/</loc>␊
    ␊
    		<changefreq>daily</changefreq>␊
    		<priority>1</priority>␊
    ␊
    	</url>␊
    </urlset>`

## render-sitemap renders the sitemap with hook output

> Snapshot 1

    `<?xml version="1.0" encoding="UTF-8"?>␊
    <urlset␊
    	xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"␊
    	xmlns:xhtml="https://www.w3.org/1999/xhtml"␊
    >␊
    ␊
    	<url>␊
    		<loc>/</loc>␊
    ␊
    ␊
    ␊
    		<custom>tag</custom>␊
    	</url>␊
    </urlset>`
