# SvelteKit Static Sitemap

Generates a `sitemap.xml` for your page during build. Works by wrapping your existing adapter and writing the sitemap together with the static assets. Currently only prerendered pages will be discovered be included.

## Features

- Compatible with any SvelteKit adapter. The sitemap is made available to the adapter like any other static asset
- Dynamically generates the sitemap based on pages prerendered by SvelteKit
- Settings can be defined on a per-page basis
- Additional pages can easily be added

## Usage

Install the package:

    npm i -D sveltekit-static-sitemap

Use it in your `svelte.config.js`:

```js
import { sitemapWrapAdapter } from "sveltekit-static-sitemap";

const config = {
  kit: {
    prerender: {
      origin: 'http://www.example.com',
    }
    adapter: sitemapWrapAdapter(adapter()),
  },
};

export default config;
```

You can override the default properties for each page, add new pages and set properties on a per page basis:

```js
sitemapWrapAdapter(adapter(), {
  // These are the default options for every `<url>` in the sitemap
  defaults: {
    lastmod: new Date().toISOString(),
    priority: 0.5,
    chengefreq: "weekly",
  },

  pages: {
    "/": {
      // Other values are inherited from default
      priority: 1,
    },

    // Pages which are prerendred by SvelteKit are automatically included

    // Other pages can be defined as well
    "/dynamic/page": {}, // Will inherit default values

    // Each page can also inject custom XML
    "/custom-sitemap-props": {
      hook: (loc) => `<url-customtag>${loc}</url-customtag>`,
    },
  },
});
```

## Configuration

See the [documentation](docs/README.md#sitemapwrapadapter) for the `sitemapWrapAdapter` function.

The hostname in the sitemap defaults to the hostname that the SvelteKit prerenderer uses, which is `sveltekit-prerender` if not set. To change this, it is recommended you set the `kit.prerender.origin` config value as shown in the example above, but you can also configure it for only the sitemap in either the `defaults` or per page config options, as described in the documentation link in the last paragraph.

## How does it work?

Unlike other sitemap generators for SvelteKit, `sveltekit-static-sitemap`:

- Does not write files among your assets or source files
- Runs only on build time

This is posible by wrapping the existing SvelteKit adapter for you project and patching the `writePrerendered` function of the SvelteKit `Builder` object. This function usually writes static assets and prerendered pages to the correct location for your Adapter. This patched version does the same, but generates the sitemap and pretends it was one of the static assets all along.

Only prerendered pages are included in the sitemap automatically, because these are the only pages we can reliably extract from the `Builder`.
