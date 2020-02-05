# Using in browsers directly

If you don't want to bundle your assets using a bundler like Webpack (which is recommended because you can save on bytes with [treeshaking](/treeshaking)), you can also use Uppload directly in the browser.

For this, you have to import the `browser.js` file from a CDN, such as Unpkg, along with the required CSS. All exports are available in the `window` object, prefixed with `uppload_` to prevent window property pollution.

So, in a browser:

```ts
import { Uppload, en } from "uppload";
```

are available as:

```js
window.uppload_Uppload
/* and */ window.uppload_en
```

To get started, you can use the `window.uppload_Uppload` class:

```js
const image = new window.uppload_Uppload({
  lang: window.uppload_en
});
image.use(
  new window.uppload_Local(),
  new window.uppload_Instagram()
);
```

A [JSFiddle example](https://jsfiddle.net/anandchowdhary/y3c4wmtg/2/) shows you how to get started. Make sure you look at the "Resources" panel in the sidebar to see the imported JavaScript and CSS files.

You can also view the source code of [`browser.ts`](https://github.com/elninotech/uppload/blob/master/src/browser.ts) to see a list of window properties exposed.
