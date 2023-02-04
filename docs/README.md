sveltekit-static-sitemap

# sveltekit-static-sitemap

## Table of contents

### Type Aliases

- [Options](README.md#options)
- [PageDetails](README.md#pagedetails)

### Functions

- [sitemapWrapAdapter](README.md#sitemapwrapadapter)

## Type Aliases

### Options

Ƭ **Options**: `Object`

Configuration options for sitemap generation.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaults` | [`PageDetails`](README.md#pagedetails) | Default options to use for all pages. **`Default Value`** ```ts { lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.5, } ``` **`See`** [PageDetails](README.md#pagedetails) for documentation of the available fields. |
| `origin` | `string` | The origin (eg. `https://your.site`) to use to build urls. **`Default Value`** `kit.prerender.origin` from your SvelteKit config. It will usually be better to configure the origin there instead of here. |
| `pages` | `Record`<`string`, `Partial`<[`PageDetails`](README.md#pagedetails)\>\> | Details for specific pages. Can be used to force extra pages to be included in the sitemap, or to set specific properties on a page. The keys are the paths to the pages. For instance `/` or `/posts/1`. **`Example`** ```ts { pages: { '/': { priority: 1, changefreq: 'daily' }, // Explicitly included since it is not prerendered '/dynamic': {} } } ``` **`See`** [PageDetails](README.md#pagedetails) for documentation of the available fields. |
| `sitemapFile` | `string` | The file to write the sitemap to. **`Default Value`** `sitemap.xml`. |

#### Defined in

[index.ts:47](https://github.com/tlaundal/sveltekit-static-sitemap/blob/a4b9e63/src/index.ts#L47)

___

### PageDetails

Ƭ **PageDetails**: `Object`

Details about a page in the sitemap.

**`See`**

[sitemaps.org](https://www.sitemaps.org) for further details.
Some of the documentation here is copied from there.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `changefreq` | ``"always"`` \| ``"hourly"`` \| ``"daily"`` \| ``"weekly"`` \| ``"monthly"`` \| ``"yearly"`` \| ``"never"`` | How frequently the page is likely to change. This value provides general information to search engines and may not correlate exactly to how often they crawl the page. The value `'always'` should be used to describe documents that change each time they are accessed. The value `'never'` should be used to describe archived URLs. |
| `lastmod` | `string` | When the page was last modified. Should be in [W3C Datetime](https://www.w3.org/TR/NOTE-datetime) format, which is a subset of ISO8601. |
| `priority` | `number` | Priority of this page relative to others on the site. Valid values range from 0.0 to 1.0. This value does not affect how your pages are compared to pages on other sites—it only lets the search engines know which pages you deem most important for the crawlers. |

#### Defined in

[index.ts:13](https://github.com/tlaundal/sveltekit-static-sitemap/blob/a4b9e63/src/index.ts#L13)

## Functions

### sitemapWrapAdapter

▸ **sitemapWrapAdapter**(`adapter`, `options`): `Adapter`

This function is the entry point for sveltekit-static-sitemap. It takes a
SvelteKit adapter and returns a wrapped version which will retrieve a
sitemap together with the static assets.

The sitemap is dynamically generated based on the prerendered pages from
SvelteKit. The `static` part in the name of this package comes from the
fact that the sitemap is only generated at compile-time.

See the `options` argument for how to add more pages.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapter` | `Adapter` | The SvelteKit adapter to wrap with sitemap generation. The sitemap will be provided to the adapter together with other static assets and prerendered pages. |
| `options` | `Partial`<[`Options`](README.md#options)\> | Configuration of the sitemap. The `defaults` key defines the default values for each url in the sitemap. The `pages` key defines values for specific pages, and can be used to include extra urls in the sitemap. To include a new page with default values it is sufficient to let the value be `{}`. See the documentation of [the options object](README.md#options) for complete details. |

#### Returns

`Adapter`

An adapter which generates a sitemap and internally uses the
provided adapter from the first argument. This wrapped adapter will appear
as `<adapter> + sitemap` in SvelteKit, where `<adapter>` is the name of the
original adapter.

#### Defined in

[index.ts:174](https://github.com/tlaundal/sveltekit-static-sitemap/blob/a4b9e63/src/index.ts#L174)
