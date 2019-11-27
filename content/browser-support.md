# Browser support

Uppload supports the most recent versions of all major browsers, like Chrome, Firefox, Safari, Opera, and Edge. It also supports Internet Explorer 10 and above.

## Plugin support

Most Uppload plugins have near-universal support with modern browsers, just like Uppload. However, some plugins may require specific features, and that's specified in their class. For example, the `supports` function of the [Camera service](/services/camera) looks like this:

```ts
supports = () => !!(window.navigator.mediaDevices && window.navigator.mediaDevices.enumerateDevices);
```

In this case, Uppload will only add the plugins that the browser environment supports, so only users who have support for the Media Devices API will be able to use the camera feature. For the rest, that option will simply not be visible.

## Polyfills

Uppload relies upon ES2015 features like Promise and HTML5 video and canvas. Some Uppload features require polyfills to work in older versions of major browsers.

If you want to support browsers that don't support these features, you will want to import the required polyfills. By default, Uppload only ships with polyfills for features that Internet Explorer does not support. Uppload exposes native modules, not UMD.

Here's a summary of some web features Uppload uses, and their browser support:

- Internet Explorer 9+ support:
  - HTML5 elements: [99%+](https://caniuse.com/#feat=html5semantic)
  - querySelector/querySelectorAll: [99%+](https://caniuse.com/#feat=queryselector)
  - getBoundingClientRect: [99%+](https://caniuse.com/#feat=getboundingclientrect)
  - Inline SVGs: [98%+](https://caniuse.com/#feat=svg-html5)
  - Array features: forEach, isArray, filter, map
  - Dependencies: [Cropper.js](https://github.com/fengyuanchen/cropperjs)
- Internet Explorer 10+ support:
  - classList: [98%+](https://caniuse.com/#feat=classlist)
  - requestAnimationFrame (polyfill included): [96%+](https://caniuse.com/#feat=requestanimationframe)
  - createObjectURL: [91%+](https://caniuse.com/#feat=mdn-api_url_createobjecturl)
  - canvas.toBlob: [88%+](https://caniuse.com/#feat=mdn-api_htmlcanvaselement_toblob)
  - FormData: [81%+](https://caniuse.com/#feat=mdn-api_formdata)
  - Blob API: [81%+](https://caniuse.com/#feat=mdn-api_blob)
- No IE support (polyfills shipped with Uppload by default):
  - Promises: [94%+](https://caniuse.com/#feat=promises)
  - Fetch: [93%+](https://caniuse.com/#feat=fetch)
  - String.includes: [93%+](https://caniuse.com/#feat=es6-string-includes)
  - String.startsWith: [89%+](https://caniuse.com/#feat=mdn-javascript_builtins_string_startswith)
  - NodeList.forEach: [89%+](https://caniuse.com/#feat=mdn-api_nodelist_foreach)
